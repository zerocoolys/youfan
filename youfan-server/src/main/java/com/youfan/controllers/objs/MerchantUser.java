package com.youfan.controllers.objs;

/**
 * Created by perfection on 15-8-21.
 */
public class MerchantUser extends User {
    private String id;
    private String userName;
    private String passWord;

    @Override
    public String getId() {
        return id;
    }

    @Override
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

    private String headPortraitUrl; //商家个人头像
    private String realName;    //商家实名
    private String sex; //性别
    private String ageRange;    //年龄范围
    private String address; //地址
    private String idCardPicUrl;    //身份证照片
    private String healthCertificatePicUrl; //健康证照片

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

    public String getIdCardPicUrl() {
        return idCardPicUrl;
    }

    public void setIdCardPicUrl(String idCardPicUrl) {
        this.idCardPicUrl = idCardPicUrl;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getHealthCertificatePicUrl() {
        return healthCertificatePicUrl;
    }

    public void setHealthCertificatePicUrl(String healthCertificatePicUrl) {
        this.healthCertificatePicUrl = healthCertificatePicUrl;
    }
}
