
package com.youfan.data.models;

import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

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
    private int dataStatus;

    // 订单状态
    private int orderStatus;

    /**
     * 订单类型
     * 0 -> 当日订单
     * 1 -> 明日预订
     */
    private int orderType;

    // 订单原始价格
    private BigDecimal orgPrice;

    // 使用折扣后的价格
    private BigDecimal discountPrice;

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
    private String couponId;

    // 备注
    private String comments;

    // 支付方式
    private String paymentWay;

    // 支付id
    private String chargeId;

    // 活动id
    private String activeId;

    private List<Integer> orderStatusList;

    // 订单的评论状态(0 -> 待评论, 1 -> 已评论)
    private int commentStatus;


    public List<Integer> getOrderStatusList() {
        return orderStatusList;
    }

    public void setOrderStatusList(List<Integer> orderStatusList) {
        this.orderStatusList = orderStatusList;
    }

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

    public int getOrderType() {
        return orderType;
    }

    public void setOrderType(int orderType) {
        this.orderType = orderType;
    }

    public BigDecimal getOrgPrice() {
        return orgPrice;
    }

    public void setOrgPrice(BigDecimal orgPrice) {
        this.orgPrice = orgPrice;
    }

    public BigDecimal getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(BigDecimal discountPrice) {
        this.discountPrice = discountPrice;
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

    public String getCouponId() {
        return couponId;
    }

    public void setCouponId(String couponId) {
        this.couponId = couponId;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getPaymentWay() {
        return paymentWay;
    }

    public void setPaymentWay(String paymentWay) {
        this.paymentWay = paymentWay;
    }

    public String getChargeId() {
        return chargeId;
    }

    public void setChargeId(String chargeId) {
        this.chargeId = chargeId;
    }

    public String getActiveId() {
        return activeId;
    }

    public void setActiveId(String activeId) {
        this.activeId = activeId;
    }

    public int getCommentStatus() {
        return commentStatus;
    }

    public void setCommentStatus(int commentStatus) {
        this.commentStatus = commentStatus;
    }
}
