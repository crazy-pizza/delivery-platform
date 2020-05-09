package com.hualala.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author ~
 * @since 2020-05-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("order")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "orderID", type = IdType.ID_WORKER)
    private Long orderID;

    @TableField("orderNo")
    private String orderNo;

    @TableField("orderStatus")
    private Integer orderStatus;

    @TableField("userID")
    private Long userID;

    private String remark;

    @TableField("foodID")
    private Long foodID;

    @TableField("foodName")
    private String foodName;


}
