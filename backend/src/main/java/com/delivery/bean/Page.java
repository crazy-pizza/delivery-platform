package com.delivery.bean;

import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author YuanChong
 * @create 2020-05-09 16:37
 * @desc
 */
@Data
public class Page {

    @TableField(exist = false)
    @ApiModelProperty("页码")
    private Long pageNo;

    @TableField(exist = false)
    @ApiModelProperty("每页记录数")
    private Long pageSize;


    
}
