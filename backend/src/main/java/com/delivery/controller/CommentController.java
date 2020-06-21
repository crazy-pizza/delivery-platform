package com.delivery.controller;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.delivery.bean.Comment;
import com.delivery.bean.Order;
import com.delivery.bean.User;
import com.delivery.component.UserHolder;
import com.delivery.service.CommentService;
import com.delivery.service.OrderService;
import com.delivery.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Optional;


@RestController
@Api(tags = "评价服务")
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;



    @ApiOperation("添加评论")
    @PostMapping("/add")
    public void add(@RequestBody Comment comment) {
        Assert.notNull(comment.getOrderID());
        Order order = orderService.getById(comment.getOrderID());
        comment.setMerchantID(order.getMerchantID());
        User user = UserHolder.getUser();
        comment.setUserID(user.getUserID());
        String currentTime = DateUtil.format(new Date(), DatePattern.PURE_DATETIME_PATTERN);
        comment.setCreateTime(Long.valueOf(currentTime));
        commentService.save(comment);
    }






    @ApiOperation("店铺评论列表")
    @PostMapping("/list")
    public IPage<Comment> list(@RequestBody Comment comment) {
        Page<Comment> page = new Page<>(comment.getPageNo(), comment.getPageSize());
        LambdaQueryWrapper<Comment> query = new LambdaQueryWrapper<Comment>()
                .eq(Comment::getMerchantID, comment.getMerchantID()).orderByDesc(Comment::getCreateTime);
        Optional.ofNullable(comment.getStar()).ifPresent(star -> query.eq(Comment::getStar, star));
        IPage<Comment> pageList = commentService.page(page, query);
        for(Comment detail : pageList.getRecords()) {
            User user = userService.getById(detail.getUserID());
            detail.setUser(user);
        }
        return pageList;
    }






}
