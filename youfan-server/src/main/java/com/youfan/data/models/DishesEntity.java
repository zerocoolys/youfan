package com.youfan.data.models;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hydm on 2015-8-21.
 */
public class DishesEntity {
	private String dishesId;// 菜品id
	private String merchantId; // 商家个人信息id
	private String type; // 菜品类型
	private boolean staple = false;// 是否主食
	private boolean sale = false;// 是否上架
	private String dishesName; // 菜品名称
	private String dishesPrice; // 菜品价格
	private String dishesStock; // 菜品库存
	private String dishesKw; // 菜品口味
	private String dishesTs; // 菜品特色
	private String description; // 菜品描述
	private List<String> picUrls = new ArrayList<>();// 菜品图片
	private Integer dataStatus = 1;

	public String getDishesId() {
		return dishesId;
	}

	public void setDishesId(String dishesId) {
		this.dishesId = dishesId;
	}

	public String getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(String merchantId) {
		this.merchantId = merchantId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public String getDishesName() {
		return dishesName;
	}

	public void setDishesName(String dishesName) {
		this.dishesName = dishesName;
	}

	public String getDishesPrice() {
		return dishesPrice;
	}

	public void setDishesPrice(String dishesPrice) {
		this.dishesPrice = dishesPrice;
	}

	public String getDishesStock() {
		return dishesStock;
	}

	public void setDishesStock(String dishesStock) {
		this.dishesStock = dishesStock;
	}

	public String getDishesKw() {
		return dishesKw;
	}

	public void setDishesKw(String dishesKw) {
		this.dishesKw = dishesKw;
	}

	public String getDishesTs() {
		return dishesTs;
	}

	public void setDishesTs(String dishesTs) {
		this.dishesTs = dishesTs;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getPicUrls() {
		return picUrls;
	}

	public void setPicUrls(List<String> picUrls) {
		this.picUrls = picUrls;
	}

	public Integer getDataStatus() {
		return dataStatus;
	}

	public void setDataStatus(Integer dataStatus) {
		this.dataStatus = dataStatus;
	}

}
