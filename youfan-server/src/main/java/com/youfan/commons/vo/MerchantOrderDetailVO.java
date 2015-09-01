package com.youfan.commons.vo;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * @author TomDing
 */
public class MerchantOrderDetailVO {

	private String orderNo;
	private String buyerId;
	private int orderStatus;
	private double price;
	private Timestamp repastTime;
	private Timestamp orderTime;

	private String repastAddress;
	private String paymentMethod;
	private String buyerName;
	private String phone;
	/**
	 * 菜单ID集合逗号分隔
	 */
	private String dishesId;
	/**
	 * 菜单集合
	 */
	private List<MechantMenuVO> dishes;

	public List<MechantMenuVO> getDishes() {
		return dishes;
	}

	public void setDishes(List<MechantMenuVO> dishes) {
		this.dishes = dishes;
	}

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

	public Timestamp getRepastTime() {
		return repastTime;
	}

	public void setRepastTime(Timestamp repastTime) {
		this.repastTime = repastTime;
	}

	public String getRepastAddress() {
		return repastAddress;
	}

	public void setRepastAddress(String repastAddress) {
		this.repastAddress = repastAddress;
	}

	public String getDishesId() {
		return dishesId;
	}

	public void setDishesId(String dishesId) {
		this.dishesId = dishesId;
	}

	public List<String> longDishesId() {
		List<String> menuIds = new ArrayList<String>();
		String[] ids = dishesId.split(",");

		if (ids != null) {
			for (String id : ids) {
				menuIds.add(id);
			}
		}

		return menuIds;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getBuyerName() {
		return buyerName;
	}

	public void setBuyerName(String buyerName) {
		this.buyerName = buyerName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Timestamp getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(Timestamp orderTime) {
		this.orderTime = orderTime;
	}

}
