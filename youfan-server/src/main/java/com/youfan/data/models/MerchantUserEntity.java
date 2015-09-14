package com.youfan.data.models;

import static com.youfan.commons.Constants.COLLECTION_HEADPORTRAITPICURL;
import static com.youfan.commons.Constants.COLLECTION_HEALTHCERTIFICATEPICURL;
import static com.youfan.commons.Constants.COLLECTION_IDCARDPICURL;
import static com.youfan.commons.Constants.COLLECTION_USER;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by perfection on 15-8-24.
 */
@Document(collection = COLLECTION_USER)
public class MerchantUserEntity {

    private Integer status = 0; //审核状态 0为未审核，1为审核，-1为删除
    @Id
    private String id;    //商家个人信息id
    private String userName;    //商家用户名
    private String passWord;    //商家密码
    @Field(COLLECTION_HEADPORTRAITPICURL)
    private String headPortraitPicUrl; //商家个人头像
    private String realName;    //商家实名
    private String sex; //性别
    private String ageRange;    //年龄范围
    private String address; //地址
    @Field(COLLECTION_IDCARDPICURL)
    private String idCardPicUrl;    //身份证照片
    @Field(COLLECTION_HEALTHCERTIFICATEPICURL)
    private String healthCertificatePicUrl; //健康证照片

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

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

    public String getHeadPortraitPicUrl() {
        return headPortraitPicUrl;
    }

    public void setHeadPortraitPicUrl(String headPortraitPicUrl) {
        this.headPortraitPicUrl = headPortraitPicUrl;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAgeRange() {
        return ageRange;
    }

    public void setAgeRange(String ageRange) {
        this.ageRange = ageRange;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIdCardPicUrl() {
        return idCardPicUrl;
    }

    public void setIdCardPicUrl(String idCardPicUrl) {
        this.idCardPicUrl = idCardPicUrl;
    }

    public String getHealthCertificatePicUrl() {
        return healthCertificatePicUrl;
    }

    public void setHealthCertificatePicUrl(String healthCertificatePicUrl) {
        this.healthCertificatePicUrl = healthCertificatePicUrl;
    }

}
