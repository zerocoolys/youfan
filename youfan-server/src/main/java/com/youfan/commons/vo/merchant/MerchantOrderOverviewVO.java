package com.youfan.commons.vo.merchant;

/**
 * @author TomDing
 */
public class MerchantOrderOverviewVO {

	public int todayOrder;

	public int tomorrowOrder;

	public int dishes;

	public int getTodayOrder() {
		return todayOrder;
	}

	public void setTodayOrder(int todayOrder) {
		this.todayOrder = todayOrder;
	}

	public int getTomorrowOrder() {
		return tomorrowOrder;
	}

	public void setTomorrowOrder(int tomorrowOrder) {
		this.tomorrowOrder = tomorrowOrder;
	}

	public int getDishes() {
		return dishes;
	}

	public void setDishes(int dishes) {
		this.dishes = dishes;
	}

}
