package com.delivery.controller;

import cn.hutool.core.lang.Assert;
import cn.hutool.core.lang.Snowflake;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.delivery.bean.Order;
import com.delivery.bean.User;
import com.delivery.common.Result;
import com.delivery.component.UserHolder;
import com.delivery.service.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
@Api(tags = "订单服务")
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private Snowflake snowflake;

    @ApiOperation("用户下单")
    @PostMapping("/add")
    public Result add(@RequestBody Order order) {
        User user = UserHolder.getUser();
        long orderNo = snowflake.nextId();
        order.setOrderNo(String.valueOf(orderNo));
        order.setOrderStatus(1);
        order.setUserID(user.getUserID());
        orderService.save(order);
        return Result.success();
    }

    @ApiOperation("修改订单状态")
    @PostMapping("/checkStatus")
    public Result delete(@RequestBody Order order) {
        Assert.notNull(order.getOrderID());
        Assert.notNull(order.getOrderStatus());
        orderService.updateById(order);
        return Result.success();
    }


    @ApiOperation("我的订单")
    @PostMapping("/historyOrder")
    public Result historyOrder(@RequestBody Order order) {
        User user = UserHolder.getUser();
        Page<Order> page = new Page<>(order.getPageNo(), order.getPageSize());
        LambdaQueryWrapper<Order> query = new LambdaQueryWrapper<>();
        query.eq(Order::getUserID, user.getUserID());
        Optional.ofNullable(order.getOrderNo()).ifPresent(orderNo -> query.eq(Order::getOrderNo, orderNo));
        Optional.ofNullable(order.getOrderStatus()).ifPresent(orderStatus -> query.eq(Order::getOrderStatus, orderStatus));
        Optional.ofNullable(order.getFoodID()).ifPresent(foodID -> query.eq(Order::getFoodID, foodID));
        Optional.ofNullable(order.getFoodName()).ifPresent(foodName -> query.eq(Order::getFoodName, foodName));
        IPage<Order> pageList = orderService.page(page, query);
        return Result.success(pageList);

    }






}
