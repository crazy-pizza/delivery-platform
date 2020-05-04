package com.delivery.component;


import com.delivery.bean.user.UserDto;

/**
 * @author YuanChong
 * @create 2019-06-01 13:22
 * @desc
 */
public class UserHolder {
    private static ThreadLocal<UserDto> currentUser = new ThreadLocal();


    public static UserDto getUser() {
        return currentUser.get();
    }

    public static void setUser(UserDto user) {
        currentUser.set(user);
    }

    public static void clear() {
        currentUser.remove();
    }




}
