package com.delivery.bean;import com.baomidou.mybatisplus.annotation.TableField;import com.baomidou.mybatisplus.annotation.TableId;import com.baomidou.mybatisplus.annotation.TableName;import io.swagger.annotations.ApiModel;import io.swagger.annotations.ApiModelProperty;import lombok.Data;@Data@ApiModel("用户")@TableName("`user`")public class User extends Page {	@ApiModelProperty("用户ID")	@TableId("userID")	private Long userID;	@TableField("userName")	@ApiModelProperty("用户名")	private String userName;	@ApiModelProperty("密码")	private String password;	@ApiModelProperty("用户类型 1-admin 2-商家 3-用户")	private String role;	@TableField("headImage")	@ApiModelProperty("用户头像")	private String headImage;	@TableField("isActive")	@ApiModelProperty("启用状态 1-启用 2-禁用")	private Long isActive;	@TableField("shopName")	@ApiModelProperty("店铺名称")	private String shopName;	@TableField("shopDesc")	@ApiModelProperty("店铺描述")	private String shopDesc;}