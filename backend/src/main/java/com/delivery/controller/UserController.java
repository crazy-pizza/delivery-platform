package com.delivery.controller;

import com.delivery.bean.user.LoginDto;
import com.delivery.bean.user.UserDto;
import com.delivery.common.Constant;
import com.delivery.common.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;


@RestController
@Api(tags = "用户服务")
@RequestMapping("/user")
public class UserController {


    @ApiOperation("新建用户")
    @PostMapping("/add")
    public Result add(@RequestBody UserDto user) {

        return Result.success();
    }

    @ApiOperation("删除用户")
    @DeleteMapping("/delete")
    public Result delete(Long userID) {

        return Result.success();
    }


    @ApiOperation("修改用户")
    @PutMapping("/update")
    public Result update(@RequestBody UserDto user) {

        return Result.success();
    }


    @ApiOperation("查询用户")
    @GetMapping("/select")
    public Result<List<UserDto>> select() {
        List<UserDto> list = new ArrayList<>();
        return Result.success(list);
    }


    @ApiOperation("登陆")
    @PostMapping("/login")
    public Result login(@Valid @RequestBody LoginDto user, @ApiIgnore HttpSession session) {
        //TODO
        session.setAttribute(Constant.ACCESS_TOKEN, user);
        return Result.success();
    }


    @ApiOperation("登出")
    @DeleteMapping("/logout")
    public Result logoff(@ApiIgnore HttpSession session) {
        session.removeAttribute(Constant.ACCESS_TOKEN);
        return Result.success();
    }


    @ApiOperation("检查登录状态")
    @GetMapping("/checkStatus")
    public Result checkStatus() {
        return Result.success();
    }


}
