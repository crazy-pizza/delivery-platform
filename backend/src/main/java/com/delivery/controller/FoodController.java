package com.delivery.controller;

import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.delivery.bean.Food;
import com.delivery.bean.User;
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
    public void add(@RequestBody Food food) {
        User user = UserHolder.getUser();
        food.setMerchantID(user.getUserID());
        foodService.save(food);
    }

    @ApiOperation("删除菜品")
    @PostMapping("/delete")
    public void delete(@RequestBody Food food) {
        Assert.notNull(food.getFoodID());
        foodService.removeById(food.getFoodID());
    }


    @ApiOperation("修改菜品")
    @PostMapping("/update")
    public void update(@RequestBody Food food) {
        Assert.notNull(food.getFoodID());
        foodService.updateById(food);
    }


    @ApiOperation("查询菜品")
    @PostMapping("/select")
    public IPage<Food> select(@RequestBody Food food) {
        Page<Food> page = new Page<>(food.getPageNo(), food.getPageSize());
        LambdaQueryWrapper<Food> query = new LambdaQueryWrapper<Food>();
        Optional.ofNullable(food.getFoodName()).ifPresent(foodName -> query.eq(Food::getFoodName, foodName));
        Optional.ofNullable(food.getFoodID()).ifPresent(foodID -> query.eq(Food::getFoodID, foodID));
        Optional.ofNullable(food.getMerchantID()).ifPresent(merchantID -> query.eq(Food::getMerchantID, merchantID));
        IPage<Food> pageList = foodService.page(page, query);
        return pageList;
    }




}
