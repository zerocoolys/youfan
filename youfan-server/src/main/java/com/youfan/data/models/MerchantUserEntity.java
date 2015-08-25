package com.youfan.data.models;

/**
 * Created by perfection on 15-8-24.
 */
public class MerchantUserEntity {
    private String id;  //用户id
    private String userName;    //商家用户名
    private String passWord;    //商家密码

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
}
