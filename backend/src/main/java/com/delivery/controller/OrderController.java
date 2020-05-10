package com.delivery.controller;

import cn.hutool.core.lang.Assert;
import cn.hutool.core.lang.Snowflake;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.delivery.bean.Order;
import com.delivery.bean.OrderDetail;
import com.delivery.bean.User;
import com.delivery.common.Result;
import com.delivery.component.UserHolder;
import com.delivery.service.OrderDetailService;
import com.delivery.service.OrderService;
import com.google.common.base.Preconditions;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@RestController
@Api(tags = "订单服务")
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;



    @ApiOperation("用户下单")
    @PostMapping("/add")
    public Result add(@RequestBody Order order) {
        orderService.addOrder(order);
        return Result.success();
    }

    @ApiOperation("商家发货")
    @PostMapping("/send")
    public Result send(@RequestBody Order order) {
        Assert.notNull(order.getOrderID());
        orderService.send(order.getOrderID());
        return Result.success();
    }

    @ApiOperation("用户确认收货")
    @PostMapping("/affirm")
    public synchronized Result affirm(@RequestBody Order order) {
        Assert.notNull(order.getOrderID());
        Order entry = orderService.getById(order.getOrderID());
        Preconditions.checkArgument(order.getOrderStatus() == 2 ,"订单状态不符");
        entry.setOrderStatus(3);
        orderService.updateById(entry);
        return Result.success();
    }


    @ApiOperation("我的订单")
    @PostMapping("/historyOrder")
    public Result<IPage<Order>> historyOrder(@RequestBody Order order) {
        User user = UserHolder.getUser();
        Page<Order> page = new Page<>(order.getPageNo(), order.getPageSize());
        LambdaQueryWrapper<Order> query = new LambdaQueryWrapper<>();
        query.eq(Order::getUserID, user.getUserID());
        Optional.ofNullable(order.getOrderNo()).ifPresent(orderNo -> query.eq(Order::getOrderNo, orderNo));
        Optional.ofNullable(order.getOrderStatus()).ifPresent(orderStatus -> query.eq(Order::getOrderStatus, orderStatus));
        IPage<Order> pageList = orderService.page(page, query);
        return Result.success(pageList);
    }


    @ApiOperation("查看订单详情")
    @PostMapping("/showDetail")
    public Result<List<OrderDetail>> showDetail(@RequestBody Order order) {
        Assert.notNull(order.getOrderID());
        LambdaQueryWrapper<OrderDetail> query = new LambdaQueryWrapper<>();
        query.eq(OrderDetail::getOrderID, order.getOrderID());
        List<OrderDetail> list = orderDetailService.list(query);
        return Result.success(list);
    }


}
