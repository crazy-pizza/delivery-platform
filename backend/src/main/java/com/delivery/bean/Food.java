package com.delivery.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
@ApiModel("菜品")
@TableName("food")
public class Food extends Page {


    @ApiModelProperty("菜品ID")
    @TableId("foodID")
    private Long foodID;

    @ApiModelProperty("菜品名称")
    @TableField("foodName")
    private String foodName;

    @ApiModelProperty("菜品图片")
    @TableField("imagePath")
    private String imagePath;

    @ApiModelProperty("菜品描述")
    @TableField("foodDesc")
    private String foodDesc;

    @ApiModelProperty("菜品价格")
    @TableField("foodPrice")
    private BigDecimal foodPrice;

    @ApiModelProperty("菜品库存")
    private BigDecimal balance;

    @TableField("merchantID")
    @ApiModelProperty("商家ID")
    private Long merchant;
}
