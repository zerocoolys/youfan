package com.youfan.controllers.support;

import com.youfan.commons.ResponseConstants;

/**
 * Created by yousheng on 15/8/13.
 */
public class Responses {
    public static Response SUCCESS() {
        return new Response(ResponseConstants.CODE_OK);
    }

    public static Response FAILED() {
        return new Response(ResponseConstants.CODE_FAILED);
    }
}
