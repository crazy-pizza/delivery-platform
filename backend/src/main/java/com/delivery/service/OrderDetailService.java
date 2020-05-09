package com.delivery.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.delivery.bean.Comment;
import com.delivery.bean.OrderDetail;
import com.delivery.mapper.CommentMapper;
import com.delivery.mapper.OrderDetailMapper;
import org.springframework.stereotype.Service;

/**
 * @author YuanChong
 * @create 2020-05-04 11:56
 * @desc
 */
@Service
public class OrderDetailService extends ServiceImpl<OrderDetailMapper, OrderDetail> {
}
