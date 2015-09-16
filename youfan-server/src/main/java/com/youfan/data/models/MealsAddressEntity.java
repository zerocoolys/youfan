package com.youfan.data.models;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import static com.youfan.commons.Constants.COLLECTION_CLIENT_MEALS_ADDRESS;

/**
 * Created by icepros on 15-9-14.
 */
@Document(collection = COLLECTION_CLIENT_MEALS_ADDRESS)
public class MealsAddressEntity {
    //用户id
    private String uid;
    @Id
    private String id;
    //联系人
    private String contact;
    //手机号码
    private String tel;
    //地址
    private String address;
    //楼号门牌号
    private String houseNumber;
    //标签 家or公司
    private String label;
    //数据状态 0：已删 1：未删
    private Integer dataStatus = 1;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Integer getDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(Integer dataStatus) {
        this.dataStatus = dataStatus;
    }
}
