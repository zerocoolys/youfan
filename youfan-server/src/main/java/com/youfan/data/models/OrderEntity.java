
package com.youfan.data.models;

import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by yousheng on 15/8/13.
 * <p>订单类实体.
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
    private String sellerId;

    // 用户id
    private String buyerId;

    // 下单时间
    private Timestamp orderTime;

    // 就餐时间
    private Timestamp repastTime;

    // 就餐方式
    private String repastMode;

    // 就餐地址
    private String repastAddress;

    // 优惠券
    private BigDecimal coupons;

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

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public String getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }

    public Timestamp getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Timestamp orderTime) {
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

    public BigDecimal getCoupons() {
        return coupons;
    }

    public void setCoupons(BigDecimal coupons) {
        this.coupons = coupons;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

}
