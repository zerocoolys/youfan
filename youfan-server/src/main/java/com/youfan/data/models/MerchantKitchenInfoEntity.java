package com.youfan.data.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

import static com.youfan.commons.Constants.COLLECTION_KITCHENINFO;
import static com.youfan.commons.Constants.COLLECTION_MERCHANTKITCHENINFOID;

/**
 * Created by perfection on 15-8-25.
 */
@Document(collection = COLLECTION_KITCHENINFO)
public class MerchantKitchenInfoEntity {
    private Integer status = 0; //审核状态 0为未审核，1为审核，-1为删除
    @Id
    private String id; //厨房id与商家用户id匹配
    private String kitchenName; //厨房名称
    private String phoneNumber; //手机号码
    private List<String> cuisine = new ArrayList<>();   //厨房特色，菜系
    private String kitchenAddress;  //厨房地址
    private String hobby;   //厨房用户兴趣爱好
    private String kitchenStoryName;    //厨房故事标题
    private String kitchenStoryContent; //厨房故事内容
    private List<String> kitchenPicUrl = new ArrayList<>(); //厨房照片路径
    private boolean isTakeSelf; //是否支持自取
    private boolean isCanteen;  //是否支持食堂
    private Integer galleryFul; //如果支持厨房，该字段不为空，容纳人数
    private boolean isDelivery; //是否支持配送
    private Double disPrice;    //配送费用
    private Double disRange;    //配送范围
    private String deliveryExplain;    //如果配送，配送说明
    private String startTime; //开店时间
    private String endTime;   //关店时间
    private String desc;    //厨房备注
    private List<Double> location = new ArrayList<>();  //经纬度

    public List<Double> getLocation() {
        return location;
    }

    public void setLocation(List<Double> location) {
        this.location = location;
    }

    public boolean isDelivery() {
        return isDelivery;
    }

    public void setIsDelivery(boolean isDelivery) {
        this.isDelivery = isDelivery;
    }

    public String getDeliveryExplain() {
        return deliveryExplain;
    }

    public void setDeliveryExplain(String deliveryExplain) {
        this.deliveryExplain = deliveryExplain;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getKitchenName() {
        return kitchenName;
    }

    public void setKitchenName(String kitchenName) {
        this.kitchenName = kitchenName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getKitchenAddress() {
        return kitchenAddress;
    }

    public void setKitchenAddress(String kitchenAddress) {
        this.kitchenAddress = kitchenAddress;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }

    public String getKitchenStoryName() {
        return kitchenStoryName;
    }

    public void setKitchenStoryName(String kitchenStoryName) {
        this.kitchenStoryName = kitchenStoryName;
    }

    public String getKitchenStoryContent() {
        return kitchenStoryContent;
    }

    public void setKitchenStoryContent(String kitchenStoryContent) {
        this.kitchenStoryContent = kitchenStoryContent;
    }

    public List<String> getCuisine() {
        return cuisine;
    }

    public void setCuisine(List<String> cuisine) {
        this.cuisine = cuisine;
    }

    public List<String> getKitchenPicUrl() {
        return kitchenPicUrl;
    }

    public void setKitchenPicUrl(List<String> kitchenPicUrl) {
        this.kitchenPicUrl = kitchenPicUrl;
    }

    public boolean isTakeSelf() {
        return isTakeSelf;
    }

    public void setIsTakeSelf(boolean isTakeSelf) {
        this.isTakeSelf = isTakeSelf;
    }

    public Integer getGalleryFul() {
        return galleryFul;
    }

    public void setGalleryFul(Integer galleryFul) {
        this.galleryFul = galleryFul;
    }

    public boolean isCanteen() {
        return isCanteen;
    }

    public void setIsCanteen(boolean isCanteen) {
        this.isCanteen = isCanteen;
    }

    public Double getDisPrice() {
        return disPrice;
    }

    public void setDisPrice(Double disPrice) {
        this.disPrice = disPrice;
    }

    public Double getDisRange() {
        return disRange;
    }

    public void setDisRange(Double disRange) {
        this.disRange = disRange;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
