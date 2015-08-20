package com.youfan.data.models;

/**
 * Created by perfection on 15-8-19.
 */
public class UserEntity {

    private String id;  //商家个人信息id
    private String headPortraitUrl; //商家个人头像
    private String realName;    //商家实名
    private String sex; //性别
    private String ageRange;    //年龄范围
    private String address; //地址
    private String idCardPicUrl;    //身份证照片
    private String healthCertificatePicUrl; //健康证照片

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHeadPortraitUrl() {
        return headPortraitUrl;
    }

    public void setHeadPortraitUrl(String headPortraitUrl) {
        this.headPortraitUrl = headPortraitUrl;
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
