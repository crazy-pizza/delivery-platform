package com.delivery.bean;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;


@Data
@ApiModel("订单")
@TableName("`order`")
public class Order extends Page {


    @TableId("orderID")
    @ApiModelProperty("订单ID")
    private Long orderID;

    @TableField("orderNo")
    @ApiModelProperty("订单号")
    private String orderNo;

    @TableField("orderStatus")
    @ApiModelProperty("订单状态 1-新增 2-商家已发货 3-用户确认收货")
    private Integer orderStatus;

    @TableField("userID")
    @ApiModelProperty("用户ID")
    private Long userID;

    @ApiModelProperty("订单备注")
    private String remark;

    @TableField("merchantID")
    @ApiModelProperty("商家ID")
    private Long merchantID;

    @TableField("totalAmount")
    @ApiModelProperty("总金额")
    private BigDecimal totalAmount;

    @ApiModelProperty("下单时间")
    @TableField("createTime")
    private Long createTime;

    @ApiModelProperty("订单明细")
    @TableField(exist = false)
    private List<OrderDetail> detailList;

    @ApiModelProperty("收货地址")
    @TableField("userAddress")
    private String userAddress;

    @ApiModelProperty("商家地址")
    @TableField("merchantAddress")
    private String merchantAddress;

    @ApiModelProperty("商家名称")
    @TableField(exist = false)
    private String merchantName;
}
