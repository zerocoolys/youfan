package com.youfan.controllers.params.server;

import com.youfan.controllers.params.MongoParams;

public class CouponParams extends MongoParams {

    private String userId;

    private Integer status;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
