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

    public Response setCode(int code) {
        this.code = code;
        return this;
    }

    public Object getPayload() {
        return payload;
    }

    public Response setPayload(Object payload) {
        this.payload = payload;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public Response setMsg(String msg) {
        this.msg = msg;
        return this;
    }
}
