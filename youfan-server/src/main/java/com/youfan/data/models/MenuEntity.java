package com.youfan.data.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;

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

    private Long sellerId;  // 商家id

    @Indexed(unique = true)
    private Long menuId;    // 菜品id

    private String name;    // 菜品名称

    private String picUrl;  // 图片

    @Field(DESCRIPTION)
    private String description; // 描述

    private BigDecimal price;   // 价格

    private Integer dataStatus = 1;

    private Integer restNum;    // 剩余份数

    private Integer tasteNum;   // 品尝人数


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

    public String getPicUrl() {
        return picUrl;
    }

    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl;
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
}
