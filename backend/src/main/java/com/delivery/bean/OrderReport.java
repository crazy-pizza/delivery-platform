package com.delivery.bean;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

/**
 * @author YuanChong
 * @create 2020-05-10 14:17
 * @desc
 */
@Data
@ApiModel("订单报表")
public class OrderReport {

    @ApiModelProperty("开始时间")
    private Long beginTime;

    @ApiModelProperty("结束时间")
    private Long endTime;

    @ApiModelProperty("商家ID")
    private Long merchantID;

    @ApiModelProperty("时间维度 天:8 月:6")
    private Long timeDigit;


    @ApiModelProperty("菜品ID")
    private Long foodID;

    @ApiModelProperty("总销量")
    private BigDecimal sumNum;

    @ApiModelProperty("时间")
    private Long time;



}
