package com.delivery.bean;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
@ApiModel("订单评价")
@TableName("comment")
public class Comment extends Page {


    @ApiModelProperty("评论ID")
    @TableId("commentID")
    private Long commentID;

    @ApiModelProperty("用户ID")
    @TableField("userID")
    private Long userID;

    @ApiModelProperty("订单ID")
    @TableField("orderID")
    private Long orderID;

    @TableField("merchantID")
    @ApiModelProperty("商家ID")
    private Long merchantID;

    @ApiModelProperty("评论图片")
    @TableField("imagePath")
    private String imagePath;

    @ApiModelProperty("评论时间")
    @TableField("createTime")
    private Long createTime;

    @ApiModelProperty("评论内容")
    private String content;

    @ApiModelProperty("评论星级")
    private BigDecimal star;

    @ApiModelProperty("评论人")
    @TableField(exist = false)
    private User user;

}
