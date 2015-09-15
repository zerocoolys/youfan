package com.youfan.commons.vo.merchant;

/**
 * @author TomDing
 */
public class MerchantOrderOverviewVO {

	public double todayOrder;

	public double tomorrowOrder;

	public double dishes;

	public double turnover;

	public double getTodayOrder() {
		return todayOrder;
	}

	public void setTodayOrder(double todayOrder) {
		this.todayOrder = todayOrder;
	}

	public double getTomorrowOrder() {
		return tomorrowOrder;
	}

	public void setTomorrowOrder(double tomorrowOrder) {
		this.tomorrowOrder = tomorrowOrder;
	}

	public double getDishes() {
		return dishes;
	}

	public void setDishes(double dishes) {
		this.dishes = dishes;
	}

	public double getTurnover() {
		return turnover;
	}

	public void setTurnover(double turnover) {
		this.turnover = turnover;
	}

}
