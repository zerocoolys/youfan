package com.youfan.data.models;

import org.springframework.data.annotation.Id;

/**
 * Created by icepros on 15-8-25.
 * <p>用户端用户-我的地址</p>
 */
public class UcMyAddressEntity {

    @Id
    private String id;
    //地址id
    private Long addressId;
    //省份
    private String province;
    //城市
    private String city;
    //区域
    private String area;
    //地址
    private String address;
}

