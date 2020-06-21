package com.delivery.component;

import com.delivery.common.Constant;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author YuanChong
 * @create 2020-06-21 19:04
 * @desc
 */
@Component
public class ResponseResultInterceptor implements HandlerInterceptor {



    private static final Map<HandlerMethod, Boolean> HANDLER_CACHE = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            if (needAnn(handlerMethod)) {
                request.setAttribute(Constant.RESPONSE_RESULT_ANN, true);
            }
        }
        return true;
    }

    private boolean needAnn(HandlerMethod handlerMethod) {
        Boolean result = HANDLER_CACHE.get(handlerMethod);
        if (result == null) {
            synchronized (this) {
                result = HANDLER_CACHE.get(handlerMethod);
                if (result == null) {
                    Class<?> beanType = handlerMethod.getBeanType();
                    Method method = handlerMethod.getMethod();
                    if (beanType.isAnnotationPresent(RestController.class)
                            || beanType.isAnnotationPresent(ResponseBody.class)
                            || method.isAnnotationPresent(ResponseBody.class)) {
                        result = true;
                    } else {
                        result = false;
                    }
                    HANDLER_CACHE.put(handlerMethod, result);
                }
            }
        }
        return result;
    }
}
