package com.delivery.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.delivery.bean.Order;
import com.delivery.bean.OrderDetail;
import com.delivery.mapper.OrderDetailMapper;
import com.delivery.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author YuanChong
 * @create 2020-05-04 11:56
 * @desc
 */
@Service
public class OrderService extends ServiceImpl<OrderMapper, Order> {


    @Autowired
    private OrderDetailMapper orderDetailMapper;

    @Transactional(rollbackFor = Exception.class)
    public void addOrder(Order order) {
        baseMapper.insert(order);
        for(OrderDetail detail : order.getDetailList()) {
            detail.setOrderID(order.getOrderID());
            orderDetailMapper.insert(detail);
        }

    }
}
