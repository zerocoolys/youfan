package com.youfan.rest.support;

/**
 * Created by yousheng on 15/8/13.
 */
public class Response {
    private int code;

    private Object payload;

    private String msg;

    public Response(int code, Object payload, String msg) {
        this.code = code;
        this.payload = payload;
        this.msg = msg;
    }

    public Response(int i) {
        this.code = i;
    }


    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getPayload() {
        return payload;
    }

    public void setPayload(Object payload) {
        this.payload = payload;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
