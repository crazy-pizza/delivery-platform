package com.delivery.controller;

import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.delivery.bean.User;
import com.delivery.common.Constant;
import com.delivery.common.Result;
import com.delivery.component.UserHolder;
import com.delivery.service.UserService;
import com.google.common.base.Preconditions;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Optional;


@RestController
@Api(tags = "用户服务")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @ApiOperation("新建用户")
    @PostMapping("/add")
    public Result add(@RequestBody User user) {
        LambdaQueryWrapper<User> query = new LambdaQueryWrapper<User>().eq(User::getUserName, user.getUserName());
        User one = userService.getOne(query);
        Assert.isNull(one, "用户名已存在");
        String encryptPassword = DigestUtils.md5Hex(user.getPassword());
        user.setPassword(encryptPassword);
        userService.save(user);
        return Result.success();
    }

    @ApiOperation("删除用户")
    @PostMapping("/delete")
    public Result delete(@RequestBody User user) {
        Assert.notNull(user.getUserID());
        userService.removeById(user.getUserID());
        return Result.success();
    }


    @ApiOperation("修改用户")
    @PostMapping("/update")
    public Result update(@RequestBody User user) {
        Assert.notNull(user.getUserID());
        Optional.ofNullable(user.getPassword()).ifPresent(password -> user.setPassword(DigestUtils.md5Hex(password)));
        userService.updateById(user);
        return Result.success();
    }


    @ApiOperation("查询用户")
    @PostMapping("/select")
    public Result<IPage<User>> select(@RequestBody User user) {
        Page<User> page = new Page<>(user.getPageNo(), user.getPageSize());
        LambdaQueryWrapper<User> query = new LambdaQueryWrapper<User>();
        Optional.ofNullable(user.getRole()).ifPresent(role -> query.eq(User::getRole, role));
        Optional.ofNullable(user.getUserID()).ifPresent(userID -> query.eq(User::getUserID, userID));
        IPage<User> pageList = userService.page(page, query);
        return Result.success(pageList);
    }


    @ApiOperation("登陆")
    @PostMapping("/login")
    public Result<User> login(@Valid @RequestBody User user, @ApiIgnore HttpSession session) {
        Assert.notNull(user.getUserName());
        Assert.notNull(user.getPassword());
        user.setPassword(DigestUtils.md5Hex(user.getPassword()));
        LambdaQueryWrapper<User> query = new LambdaQueryWrapper<User>()
                .eq(User::getUserName, user.getUserName()).eq(User::getPassword, user.getPassword());
        User one = userService.getOne(query);
        Assert.notNull(one,"用户名或密码错误");
        Preconditions.checkArgument(one.getIsActive() == 1, "账户已被封停，请联系管理员解封");
        session.setAttribute(Constant.ACCESS_TOKEN, one);
        return Result.success(one);
    }


    @ApiOperation("登出")
    @PostMapping("/logout")
    public Result logoff(@ApiIgnore HttpSession session) {
        session.removeAttribute(Constant.ACCESS_TOKEN);
        return Result.success();
    }


    @ApiOperation("检查登录状态")
    @PostMapping("/checkStatus")
    public Result<User> checkStatus() {
        User user = userService.getById(UserHolder.getUser().getUserID());
        return Result.success(user);
    }


}
