package com.delivery.component;

import cn.hutool.core.lang.Assert;
import com.delivery.common.Result;
import com.delivery.common.ResultEnum;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Objects;


@Log4j2
@ControllerAdvice
public class DefaultExceptionHandler {

    /**
     * 全局异常捕捉处理
     * @param ex
     * @return
     */
    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    public Object errorHandler(Exception ex) {
        log.error("全局异常捕捉处理",ex);
        return ex.getStackTrace()[0].getClass().equals(Assert.class) ?
                Result.error(ex.getMessage()) : Result.handle(ResultEnum.SYSTEM_ERROR);
    }

    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result handleValidException(MethodArgumentNotValidException e){
        //将错误信息返回给前台
        return Result.error(Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage());
    }

}
