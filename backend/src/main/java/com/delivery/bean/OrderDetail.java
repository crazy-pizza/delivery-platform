package com.delivery.bean;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

/**
 * <p>
 * 
 * </p>
 *
 * @author ~
 * @since 2020-05-09
 */
@Data
@ApiModel("订单明细")
@TableName("order_detail")
public class OrderDetail {


    @ApiModelProperty("明细ID")
    @TableId(value = "detailID")
    private Long detailID;

    @ApiModelProperty("订单ID")
    @TableField("orderID")
    private Long orderID;

    @ApiModelProperty("菜品ID")
    @TableField("foodID")
    private Long foodID;

    @ApiModelProperty("菜品数量")
    @TableField("foodNum")
    private Long foodNum;

    @TableField("foodName")
    @ApiModelProperty("菜品名称")
    private String foodName;

    @ApiModelProperty("菜品名称")
    @TableField("foodDesc")
    private String foodDesc;

    @TableField("foodPrice")
    @ApiModelProperty("菜品价格")
    private BigDecimal foodPrice;

    @TableField("foodImagePath")
    @ApiModelProperty("菜品图片")
    private String foodImagePath;


}
