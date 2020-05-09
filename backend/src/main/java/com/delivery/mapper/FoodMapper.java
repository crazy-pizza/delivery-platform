package com.delivery.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.delivery.bean.Food;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface FoodMapper extends BaseMapper<Food> {

}
