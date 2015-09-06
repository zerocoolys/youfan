package com.youfan.exceptions;

public class MenuNameExistsException extends Exception {

    private static final long serialVersionUID = -5102046240329061253L;

    public MenuNameExistsException(String msg) {
        super(msg);
    }

}
