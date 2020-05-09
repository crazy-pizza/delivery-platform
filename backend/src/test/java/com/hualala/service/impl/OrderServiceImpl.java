package com.hualala.service.impl;

import com.hualala.domain.Order;
import com.hualala.mapper.OrderMapper;
import com.hualala.service.IOrderService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author ~
 * @since 2020-05-09
 */
@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements IOrderService {

}
