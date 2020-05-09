package com.delivery.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.delivery.bean.Food;
import com.delivery.mapper.FoodMapper;
import org.springframework.stereotype.Service;

/**
 * @author YuanChong
 * @create 2020-05-04 11:56
 * @desc
 */
@Service
public class FoodService extends ServiceImpl<FoodMapper, Food> {
}
