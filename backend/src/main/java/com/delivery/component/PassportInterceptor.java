package com.delivery.component;

import com.alibaba.fastjson.JSON;
import com.delivery.bean.user.UserDto;
import com.delivery.common.Constant;
import com.delivery.common.Result;
import com.delivery.common.ResultEnum;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


@Component
public class PassportInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        if(request.getSession() != null && request.getSession().getAttribute(Constant.ACCESS_TOKEN) != null) {
            UserDto user = (UserDto)request.getSession().getAttribute(Constant.ACCESS_TOKEN);
            UserHolder.setUser(user);
            return true;
        }
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        String error = JSON.toJSONString(Result.handle(ResultEnum.LOGIN_LOST));
        PrintWriter writer = response.getWriter();
        writer.append(error);
        writer.flush();
        writer.close();
        return false;
    }


    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        UserHolder.clear();
    }
}
