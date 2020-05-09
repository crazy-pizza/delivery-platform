package com.delivery.bean;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


@Data
@TableName("order")
public class Order extends Page {


    @TableId("orderID")
    @ApiModelProperty("订单ID")
    private Long orderID;

    @TableField("orderNo")
    @ApiModelProperty("订货号")
    private String orderNo;

    @TableField("orderStatus")
    @ApiModelProperty("订单状态 1-新增 2-商家已发货 3-用户确认收货")
    private Integer orderStatus;

    @TableField("userID")
    @ApiModelProperty("用户ID")
    private Long userID;

    @ApiModelProperty("订单备注")
    private String remark;

    @TableField("foodID")
    @ApiModelProperty("菜品ID")
    private Long foodID;

    @TableField("foodName")
    @ApiModelProperty("菜品名称")
    private String foodName;


}
