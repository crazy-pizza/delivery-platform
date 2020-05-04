package com.delivery.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultEnum {

    SUCCESS(200,"执行成功"),
    LOGIN_LOST(300,"登陆失效"),
    BUSINESS_ERROR(400,"业务异常"),
    SYSTEM_ERROR(500,"系统异常,请稍后重试");




    private Integer code;
    private String msg;




}
