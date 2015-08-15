package com.youfan.exceptions;

/**
 * Created by yousheng on 15/8/14.
 */
public class AuthenticationFailedException extends Exception {
    public AuthenticationFailedException(String msg) {
        super(msg);
    }
}
