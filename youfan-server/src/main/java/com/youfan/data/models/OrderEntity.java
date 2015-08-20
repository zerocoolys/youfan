package com.youfan.data.models;

import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * Created by yousheng on 15/8/13.
 */
public class OrderEntity {

    @Id
    private Long id;

    // 订单号
    private String orderNo;

    // 数据状态
    private int dataStatus = 1;

    // 订单状态
    private int orderStatus;

    // 价格
    private BigDecimal price;

    // 商家id
    private Long sellerId;

    // 用户id
    private Long buyerId;

    // 下单时间
    private Date orderTime;

    // 就餐时间
    private Date repastTime;

    // 就餐方式
    private String repastMode;

    // 就餐地址
    private String repastAddress;

    // 优惠券
    private BigDecimal coupons;

    // 菜品条目的id集合
    private List<Long> cart;

    // 备注
    private String comments;


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

    public int getDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(int dataStatus) {
        this.dataStatus = dataStatus;
    }

    public int getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(int orderStatus) {
        this.orderStatus = orderStatus;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
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

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public Date getRepastTime() {
        return repastTime;
    }

    public void setRepastTime(Date repastTime) {
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

    public BigDecimal getCoupons() {
        return coupons;
    }

    public void setCoupons(BigDecimal coupons) {
        this.coupons = coupons;
    }

    public List<Long> getCart() {
        return cart;
    }

    public void setCart(List<Long> cart) {
        this.cart = cart;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

}
