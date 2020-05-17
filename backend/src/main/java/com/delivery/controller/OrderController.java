package com.delivery.controller;

import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.delivery.bean.*;
import com.delivery.common.Result;
import com.delivery.component.UserHolder;
import com.delivery.service.FoodService;
import com.delivery.service.OrderDetailService;
import com.delivery.service.OrderService;
import com.delivery.service.UserService;
import com.google.common.base.Preconditions;
import com.sun.tools.corba.se.idl.constExpr.Or;
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

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;



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
        Preconditions.checkArgument(entry.getOrderStatus() == 2 ,"订单状态不符");
        entry.setOrderStatus(3);
        orderService.updateById(entry);
        return Result.success();
    }


    @ApiOperation("订单列表")
    @PostMapping("/orderList")
    public Result<IPage<Order>> orderList(@RequestBody Order order) {
        Page<Order> page = new Page<>(order.getPageNo(), order.getPageSize());
        LambdaQueryWrapper<Order> query = new LambdaQueryWrapper<Order>().orderByDesc(Order::getCreateTime);
        Optional.ofNullable(order.getOrderNo()).ifPresent(orderNo -> query.eq(Order::getOrderNo, orderNo));
        Optional.ofNullable(order.getOrderStatus()).ifPresent(orderStatus -> query.eq(Order::getOrderStatus, orderStatus));
        Optional.ofNullable(order.getUserID()).ifPresent(userID -> query.eq(Order::getUserID, userID));
        Optional.ofNullable(order.getMerchantID()).ifPresent(merchantID -> query.eq(Order::getMerchantID, merchantID));
        IPage<Order> pageList = orderService.page(page, query);
        for(Order data : pageList.getRecords()) {
            User merchant = userService.getById(data.getMerchantID());
            data.setMerchantName(merchant.getShopName());
        }
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


    @ApiOperation("订单报表")
    @PostMapping("/report")
    public Result<List<OrderReport>> report(@RequestBody OrderReport orderReport) {
        Assert.notNull(orderReport.getMerchantID());
        Assert.notNull(orderReport.getTimeDigit());
        List<OrderReport> list = orderService.report(orderReport);
        for (OrderReport report : list) {
            Food food = foodService.getById(report.getFoodID());
            report.setFood(food);
        }
        return Result.success(list);
    }

}
