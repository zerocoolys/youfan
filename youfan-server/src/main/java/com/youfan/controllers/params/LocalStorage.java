package com.youfan.controllers.params;

import com.youfan.commons.vo.client.ClientUserVO;

/**
 * Created by icepros on 15-9-10.
 */
public class LocalStorage {
    private String token;
    private ClientUserVO clientUserVO;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public ClientUserVO getClientUserVO() {
        return clientUserVO;
    }

    public void setClientUserVO(ClientUserVO clientUserVO) {
        this.clientUserVO = clientUserVO;
    }
}
