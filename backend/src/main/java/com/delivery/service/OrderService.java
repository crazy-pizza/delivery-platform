package com.delivery.service;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Snowflake;
import cn.hutool.core.util.NumberUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.delivery.bean.Food;
import com.delivery.bean.Order;
import com.delivery.bean.OrderDetail;
import com.delivery.bean.User;
import com.delivery.component.UserHolder;
import com.delivery.mapper.FoodMapper;
import com.delivery.mapper.OrderDetailMapper;
import com.delivery.mapper.OrderMapper;
import com.google.common.base.Preconditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author YuanChong
 * @create 2020-05-04 11:56
 * @desc
 */
@Service
public class OrderService extends ServiceImpl<OrderMapper, Order> {


    @Autowired
    private OrderDetailMapper orderDetailMapper;

    @Autowired
    private FoodMapper foodMapper;

    @Autowired
    private Snowflake snowflake;

    /**
     * 用户下单
     *
     * @param order
     */
    @Transactional(rollbackFor = Exception.class)
    public void addOrder(Order order) {
        String currentTime = DateUtil.format(new Date(), DatePattern.PURE_DATETIME_PATTERN);
        order.setCreateTime(Long.valueOf(currentTime));
        List<Long> foodIDList = order.getDetailList().stream().map(OrderDetail::getFoodID).collect(Collectors.toList());
        List<Food> foodList = foodMapper.selectBatchIds(foodIDList);
        Map<Long, Food> foodMap = foodList.stream().collect(Collectors.toMap(Food::getFoodID, Function.identity()));
        //计算订单总价格
        BigDecimal totalAmount = order.getDetailList().stream().map(detail -> NumberUtil.mul(detail.getFoodNum(), foodMap.get(detail.getDetailID()).getFoodPrice())).reduce(NumberUtil::add).get();
        User user = UserHolder.getUser();
        order.setOrderNo(String.valueOf(snowflake.nextId()));
        order.setOrderStatus(1);
        order.setUserID(user.getUserID());
        order.setTotalAmount(totalAmount);
        order.setMerchantID(foodList.get(0).getMerchantID());
        baseMapper.insert(order);
        for(OrderDetail detail : order.getDetailList()) {
            detail.setOrderID(order.getOrderID());
            Food food = foodMap.get(detail.getFoodID());
            detail.setFoodDesc(food.getFoodDesc());
            detail.setFoodName(food.getFoodName());
            detail.setFoodPrice(food.getFoodPrice());
            orderDetailMapper.insert(detail);
        }

    }

    /**
     * 商家发货
     *
     * @param orderID
     */
    @Transactional(rollbackFor = Exception.class)
    public synchronized void send(Long orderID) {
        Order order = baseMapper.selectById(orderID);
        Preconditions.checkArgument(order.getOrderStatus() == 1, "订单状态不符");
        order.setOrderStatus(2);
        baseMapper.updateById(order);
        LambdaQueryWrapper<OrderDetail> queryWrapper = new LambdaQueryWrapper<OrderDetail>().eq(OrderDetail::getOrderID,orderID);
        List<OrderDetail> detailList = orderDetailMapper.selectList(queryWrapper);
        for(OrderDetail detail: detailList) {
            //库存扣减
            Food food = foodMapper.selectById(detail.getFoodID());
            BigDecimal sub = NumberUtil.sub(food.getBalance(), detail.getFoodNum());
            Preconditions.checkArgument(sub.doubleValue() > 0, "菜品%s库存不足，请及时补充库存", food.getFoodName());
            food.setBalance(sub);
            foodMapper.updateById(food);
        }
    }



}
