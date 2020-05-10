package com.delivery.bean;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("会话")
@TableName("memcon")
public class Memcon {


    @ApiModelProperty("主键ID")
    @TableId("memconID")
    private Long memconID;

    @ApiModelProperty("来源")
    private Long from;

    @ApiModelProperty("谈话人")
    private Long to;

    @ApiModelProperty("内容")
    private String content;

    @ApiModelProperty("谈话时间")
    @TableField("createTime")
    private Long createTime;

    @ApiModelProperty("会话标识")
    @TableField("sessionKey")
    private String sessionKey;


}
