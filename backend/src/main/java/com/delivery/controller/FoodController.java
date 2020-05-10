package com.delivery.controller;

import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.delivery.bean.Food;
import com.delivery.bean.User;
import com.delivery.common.Result;
import com.delivery.component.UserHolder;
import com.delivery.service.FoodService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
@Api(tags = "菜品服务")
@RequestMapping("/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @ApiOperation("新建菜品")
    @PostMapping("/add")
    public Result add(@RequestBody Food food) {
        User user = UserHolder.getUser();
        food.setMerchantID(user.getUserID());
        foodService.save(food);
        return Result.success();
    }

    @ApiOperation("删除菜品")
    @PostMapping("/delete")
    public Result delete(@RequestBody Food food) {
        Assert.notNull(food.getFoodID());
        foodService.removeById(food.getFoodID());
        return Result.success();
    }


    @ApiOperation("修改菜品")
    @PostMapping("/update")
    public Result update(@RequestBody Food food) {
        Assert.notNull(food.getFoodID());
        foodService.updateById(food);
        return Result.success();
    }


    @ApiOperation("查询菜品")
    @PostMapping("/select")
    public Result<IPage<Food>> select(@RequestBody Food food) {
        Page<Food> page = new Page<>(food.getPageNo(), food.getPageSize());
        LambdaQueryWrapper<Food> query = new LambdaQueryWrapper<Food>();
        Optional.ofNullable(food.getFoodName()).ifPresent(foodName -> query.eq(Food::getFoodName, foodName));
        Optional.ofNullable(food.getFoodID()).ifPresent(foodID -> query.eq(Food::getFoodID, foodID));
        IPage<Food> pageList = foodService.page(page, query);
        return Result.success(pageList);
    }




}
