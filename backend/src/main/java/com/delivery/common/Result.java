package com.delivery.common;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


@Data
@ApiModel("统一结果")
public class Result<T> {


    @ApiModelProperty("返回状态码")
    private Integer code;

    @ApiModelProperty("返回消息描述")
    private String msg;

    @ApiModelProperty("返回实体数据")
    private T data;


    public static <T> Result<T> success() {
        return success(null);
    }


    public static <T> Result<T> success(T t) {
        return handle(ResultEnum.SUCCESS, t);
    }

    public static <T> Result<T> error(String msg) {
        Result<T> result = handle(ResultEnum.BUSINESS_ERROR);
        result.setMsg(msg);
        return result;
    }

    public static <T> Result<T> handle(ResultEnum resultEnum) {
        return handle(resultEnum, null);
    }


    private static <T> Result<T> handle(ResultEnum resultEnum, T t) {
        Result<T> result = new Result<>();
        result.setCode(resultEnum.getCode());
        result.setMsg(resultEnum.getMsg());
        result.setData(t);
        return result;
    }

}
