package com.youfan.controllers.support;

/**
 * Created by yousheng on 15/8/13.
 */
public class Responses {
    public static Response SUCCESS() {
        return new Response(0);
    }

    public static Response FAILED() {
        return new Response(1);
    }
}
