package com.youfan.data.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static com.youfan.commons.Constants.COLLECTION_MENU;
import static com.youfan.commons.Constants.DESCRIPTION;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
@Document(collection = COLLECTION_MENU)
public class MenuEntity {

    @Id
    private String id;

    private String sellerId; // 商家id

    private String name; // 菜品名称

    private List<String> picUrls = new ArrayList<>(); // 菜品图片

    @Field(DESCRIPTION)
    private String description; // 描述

    private BigDecimal price; // 价格

    private Integer dataStatus = 1;// 标记删除

    private Integer reviewStatus = 0;// 评审状态。0未评审。1评审成功。2评审失败

    private Integer restNum = 20; // 今日余量

    private Integer nRestNum = 20; // 明日剩余份数

    private Integer tasteNum = 0; // 品尝人数

    private String type; // 菜品类型

    private Integer xfzNum; // 用于小饭桌

    private boolean staple = false; // 是否主食

    private boolean sale = false; // 是否上架

    private Integer stock; // 菜品库存

    private String taste; // 菜品口味

    private List<String> features = new ArrayList<>(); // 菜品特色

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getPicUrls() {
        return picUrls;
    }

    public void setPicUrls(List<String> picUrls) {
        this.picUrls = picUrls;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(Integer dataStatus) {
        this.dataStatus = dataStatus;
    }

    public Integer getReviewStatus() {
        return reviewStatus;
    }

    public void setReviewStatus(Integer reviewStatus) {
        this.reviewStatus = reviewStatus;
    }

    public Integer getRestNum() {
        return restNum;
    }

    public void setRestNum(Integer restNum) {
        this.restNum = restNum;
    }

    public Integer getnRestNum() {
        return nRestNum;
    }

    public void setnRestNum(Integer nRestNum) {
        this.nRestNum = nRestNum;
    }

    public Integer getTasteNum() {
        return tasteNum;
    }

    public void setTasteNum(Integer tasteNum) {
        this.tasteNum = tasteNum;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getXfzNum() {
        return xfzNum;
    }

    public void setXfzNum(Integer xfzNum) {
        this.xfzNum = xfzNum;
    }

    public boolean isStaple() {
        return staple;
    }

    public void setStaple(boolean staple) {
        this.staple = staple;
    }

    public boolean isSale() {
        return sale;
    }

    public void setSale(boolean sale) {
        this.sale = sale;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getTaste() {
        return taste;
    }

    public void setTaste(String taste) {
        this.taste = taste;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

}
