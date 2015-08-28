package com.youfan.controllers.objs;

import java.util.ArrayList;
import java.util.List;

/**
 * Created on 2015-08-21.
 * <p>
 * 菜单VO.
 *
 * @author dolphineor
 */
public class MenuVO {

    private String id;

    private Long sellerId;  // 商家id

    private Long menuId;    // 菜品id

    private String name;    // 菜品名称

    private List<String> picUrls = new ArrayList<>();   // 菜品图片

    private String description; // 描述

    private double price;   // 价格

    private Integer dataStatus = 1;

    private Integer restNum;    // 剩余份数

    private Integer tasteNum;   // 品尝人数

    private String type;    // 菜品类型

    private Integer xfzNum; // 用于小饭桌

    private boolean staple = false; // 是否主食

    private boolean sale = false;   // 是否上架

    private Integer stock;  // 菜品库存

    private String taste;   // 菜品口味

    private List<String> features = new ArrayList<>();  // 菜品特色

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Integer getDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(Integer dataStatus) {
        this.dataStatus = dataStatus;
    }

    public Integer getRestNum() {
        return restNum;
    }

    public void setRestNum(Integer restNum) {
        this.restNum = restNum;
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
