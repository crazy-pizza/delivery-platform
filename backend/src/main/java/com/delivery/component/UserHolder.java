package com.delivery.component;


import com.alibaba.ttl.TransmittableThreadLocal;
import com.delivery.bean.User;

/**
 * @author YuanChong
 * @create 2019-06-01 13:22
 * @desc
 */
public class UserHolder {

    private static final ThreadLocal<User> CURRENT_USER = new TransmittableThreadLocal<>();


    public static User getUser() {
        return CURRENT_USER.get();
    }

    public static void setUser(User user) {
        CURRENT_USER.set(user);
    }

    public static void clear() {
        CURRENT_USER.remove();
    }




}
