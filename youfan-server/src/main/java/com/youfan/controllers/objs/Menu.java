package com.youfan.controllers.objs;

/**
 * Created on 2015-08-21.
 * <p>菜单VO.
 *
 * @author dolphineor
 */
public class Menu {

    private String id;

    private Long sellerId;

    private Long menuId;

    private String name;

    private String picUrl;

    private String description;

    private double price;

    private int restNum;

    private int tasteNum;


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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getRestNum() {
        return restNum;
    }

    public void setRestNum(int restNum) {
        this.restNum = restNum;
    }

    public int getTasteNum() {
        return tasteNum;
    }

    public void setTasteNum(int tasteNum) {
        this.tasteNum = tasteNum;
    }
}
