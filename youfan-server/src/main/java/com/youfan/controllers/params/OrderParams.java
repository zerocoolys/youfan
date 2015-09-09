package com.youfan.controllers.params;

import com.youfan.commons.Pagination;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yousheng on 15/8/14.
 */
public class OrderParams extends Pagination {

	String orderNo;

	String buyerId;

	String sellerId;

	/**
	 * KEY: 菜品ID VALUE[0]: 订购的菜品份数 VALUE[1]: 菜品今日余量
	 */
	Map<String, Integer[]> itemMap = new HashMap<>();

	String comments;

	double originalPrice;

	double discountPrice;

	Integer orderStatus;

	String repastMode;


	String repastAddress;

    Date repastTime;



	private String couponId;

	private List<Integer> orderStatusList;

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	public String getSellerId() {
		return sellerId;
	}

	public void setSellerId(String sellerId) {
		this.sellerId = sellerId;
	}

	public Map<String, Integer[]> getItemMap() {
		return itemMap;
	}

	public void setItemMap(Map<String, Integer[]> itemMap) {
		this.itemMap = itemMap;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public double getOriginalPrice() {
		return originalPrice;
	}

	public void setOriginalPrice(double originalPrice) {
		this.originalPrice = originalPrice;
	}

	public double getDiscountPrice() {
		return discountPrice;
	}

	public void setDiscountPrice(double discountPrice) {
		this.discountPrice = discountPrice;
	}

	public String getRepastMode() {
		return repastMode;
	}

	public void setRepastMode(String repastMode) {
		this.repastMode = repastMode;
	}




    public Date getRepastTime() {
        return repastTime;
    }

    public void setRepastTime(Date repastTime) {
        this.repastTime = repastTime;
    }

    public Integer getOrderStatus() {
        return orderStatus;
    }


	public void setOrderStatus(Integer orderStatus) {
		this.orderStatus = orderStatus;
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

	public List<Integer> getOrderStatusList() {
		return orderStatusList;
	}

	public void setOrderStatusList(List<Integer> orderStatusList) {
		this.orderStatusList = orderStatusList;
	}
}
