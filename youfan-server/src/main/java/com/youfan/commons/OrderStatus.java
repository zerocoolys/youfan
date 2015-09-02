package com.youfan.commons;

/**
 * Created by yousheng on 15/8/13.
 */
public enum OrderStatus {
    ODR_WAIT_FOR_PAY(1, "1"),
    ODR_WAIT_FOR_TRANS(2, "2"),
    ODR_WAIT_FOR_RECEIVE(3, "3"),

    ODR_WITHDRAW_SELLER_CONFIRM(31, "31"),
    ODR_WITHDRAW_FINISHED(39, "39"),
    ODR_WITHDRAW_BUTER_APPLY(32, "32"),
    
    
    ORD_MERCHANT_CONFIRM(4,"4"),


    ODR_FINISHED(100, "100");


    private int code;
    private String codestr;

    OrderStatus(int status, String codestr) {
        this.code = status;
        this.codestr = codestr;
    }

    public int value() {
        return code;
    }

    public String toString() {
        return codestr;
    }
}
