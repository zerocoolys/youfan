package com.youfan.commons.vo;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

/**
 * Created by yousheng on 15/8/13.
 */
public class OrderVO {

    private Long id;
    private String orderNo;
    private Long sellerId;
    private Long buyerId;
    private int orderStatus;
    private double price;
    private Date orderTime;
    private Timestamp repastTime;
    private String repastMode;
    private String repastAddress;
    private double coupons;
    private List<Long> cart;
    private String comments;

    /**
     * 购买者头像
     */
    private String img;

    /**
     * 菜单ID集合逗号分隔
     */
    private String dishesId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public Long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Long buyerId) {
        this.buyerId = buyerId;
    }

    public int getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(int orderStatus) {
        this.orderStatus = orderStatus;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public Timestamp getRepastTime() {
        return repastTime;
    }

    public void setRepastTime(Timestamp repastTime) {
        this.repastTime = repastTime;
    }

    public String getRepastMode() {
        return repastMode;
    }

    public void setRepastMode(String repastMode) {
        this.repastMode = repastMode;
    }

    public String getRepastAddress() {
        return repastAddress;
    }

    public void setRepastAddress(String repastAddress) {
        this.repastAddress = repastAddress;
    }

    public double getCoupons() {
        return coupons;
    }

    public void setCoupons(double coupons) {
        this.coupons = coupons;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public List<Long> getCart() {
        return cart;
    }

    public void setCart(List<Long> cart) {
        this.cart = cart;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getDishesId() {
        return dishesId;
    }

    public void setDishesId(String dishesId) {
        this.dishesId = dishesId;
    }


}
