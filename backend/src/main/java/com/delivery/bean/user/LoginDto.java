package com.delivery.bean.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author YuanChong
 * @create 2020-05-04 14:46
 * @desc
 */
@Data
public class LoginDto {


    @NotNull(message = "用户名不能为空")
    @ApiModelProperty("用户名")
    private String userName;

    @NotNull(message = "密码不能为空")
    @ApiModelProperty("密码")
    private String password;

}
