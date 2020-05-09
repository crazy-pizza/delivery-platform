package com.delivery.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.delivery.bean.Order;
import com.delivery.mapper.OrderMapper;
import org.springframework.stereotype.Service;

/**
 * @author YuanChong
 * @create 2020-05-04 11:56
 * @desc
 */
@Service
public class OrderService extends ServiceImpl<OrderMapper, Order> {
}
