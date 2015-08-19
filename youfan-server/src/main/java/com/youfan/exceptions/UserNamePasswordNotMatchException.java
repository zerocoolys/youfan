package com.youfan.exceptions;

/**
 * Created by yousheng on 15/8/18.
 */
public class UserNamePasswordNotMatchException extends UserException {
    public UserNamePasswordNotMatchException(String userName) {
        super(userName + " 或者密码错误！");
    }
}
