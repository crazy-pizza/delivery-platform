package com.delivery.controller;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.delivery.bean.Comment;
import com.delivery.bean.User;
import com.delivery.common.Result;
import com.delivery.component.UserHolder;
import com.delivery.service.CommentService;
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



    @ApiOperation("添加评论")
    @PostMapping("/add")
    public Result add(@RequestBody Comment comment) {
        Assert.notNull(comment.getFoodID());
        User user = UserHolder.getUser();
        comment.setUserID(user.getUserID());
        String currentTime = DateUtil.format(new Date(), DatePattern.PURE_DATETIME_PATTERN);
        comment.setCreateTime(Long.valueOf(currentTime));
        commentService.save(comment);
        return Result.success();
    }






    @ApiOperation("菜品评论列表")
    @PostMapping("/list")
    public Result<IPage<Comment>> list(@RequestBody Comment comment) {
        Assert.notNull(comment.getFoodID());
        Page<Comment> page = new Page<>(comment.getPageNo(), comment.getPageSize());
        LambdaQueryWrapper<Comment> query = new LambdaQueryWrapper<Comment>()
                .eq(Comment::getFoodID, comment.getFoodID()).orderByDesc(Comment::getCreateTime);
        Optional.ofNullable(comment.getStar()).ifPresent(star -> query.eq(Comment::getStar, star));
        IPage<Comment> pageList = commentService.page(page, query);
        return Result.success(pageList);
    }






}
