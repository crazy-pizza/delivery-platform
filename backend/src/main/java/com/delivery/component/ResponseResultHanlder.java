package com.delivery.component;

import com.delivery.common.Constant;
import com.delivery.common.Result;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

/**
 * @author YuanChong
 * @create 2020-06-21 19:21
 * @desc
 */
@ControllerAdvice
public class ResponseResultHanlder implements ResponseBodyAdvice {

    @Override
    public boolean supports(MethodParameter methodParameter, Class aClass) {
        ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = sra.getRequest();
        Object attribute = request.getAttribute(Constant.RESPONSE_RESULT_ANN);
        return Optional.ofNullable(attribute).map(data -> (Boolean)data).orElse(false);
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter methodParameter, MediaType mediaType, Class aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        return body instanceof Result ? body : Result.success(body);
    }
}
