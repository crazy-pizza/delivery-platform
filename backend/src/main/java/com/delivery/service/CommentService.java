package com.delivery.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.delivery.bean.Comment;
import com.delivery.mapper.CommentMapper;
import org.springframework.stereotype.Service;

/**
 * @author YuanChong
 * @create 2020-05-04 11:56
 * @desc
 */
@Service
public class CommentService extends ServiceImpl<CommentMapper, Comment> {
}
