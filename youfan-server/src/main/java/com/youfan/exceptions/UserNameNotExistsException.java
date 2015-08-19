package com.youfan.exceptions;

/**
 * Created by yousheng on 15/8/18.
 */
public class UserNameNotExistsException extends UserException {
    public UserNameNotExistsException(String username) {
        super(username + " 不存在！");
    }
}
