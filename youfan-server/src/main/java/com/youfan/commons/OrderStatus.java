package com.youfan.commons;

/**
 * Created by yousheng on 15/8/13.
 */
public enum OrderStatus {

	/**
	 * 已生成订单
	 */
	ORDER_WAIT_FOR_PAY(1, "1"),

	/**
	 * 订单已支付
	 */
	ORDER_PAYED(2, "2"),

	/**
	 * 商家端已确认
	 */
	ORDER_MERCHANT_CONFIRM(3, "3"),

	/**
	 * 订单菜品已做完
	 */
	ORDER_DISH_FINISHED(4, "4"),

	/**
	 * 已发货
	 */
	ORDER_DELIVERY(5, "5"),

	/**
	 * 正常收货, 订单完成
	 */
	ORDER_RECEIVED(100, "100"),

	/**
	 * 完成退款
	 */
	ORDER__COMPELETE_WITHDRAW(-2, "-2"),

	/**
	 * 在线支付订单的退款完成标识
	 */
	ORDER_WITHDRAW_PAYED(99, "99"),

	/**
	 * 货到付款订单的退款完成标识
	 */
	ORDER_WITHDRAW_COD(98, "98"),

	/**
	 * 退款中
	 */
	ORDER__WITHDRAW(-1, "-1"),

	/**
	 * 买家在已支付状态下的退款审核标识
	 */
	ORDER_STEP2_CLIENT_WITHDRAW_PAYED(201, "201"),

	/**
	 * 卖家在已支付状态下的退款审核标识
	 */
	ORDER_STEP2_MERCHANT_WITHDRAW_PAYED(202, "202"),

	/**
	 * 买家在订单已确认状态下的退款审核标识
	 */
	ORDER_STEP3_CLIENT_WITHDRAW_PAYED(301, "301"),

	/**
	 * 卖家在订单已确认状态下的退款审核标识
	 */
	ORDER_STEP3_MERCHANT_WITHDRAW_PAYED(302, "302");

	// ORDER_WAIT_FOR_TRANS(2, "2"),
	// ORDER_WAIT_FOR_RECEIVE(3, "3"),
	//
	// ORDER_WITHDRAW_SELLER_CONFIRM(31, "31"),
	// ORDER_WITHDRAW_FINISHED(39, "39"),
	// ORDER_WITHDRAW_BUTER_APPLY(32, "32");

	private int code;
	private String codeStr;

	OrderStatus(int status, String codeStr) {
		this.code = status;
		this.codeStr = codeStr;
	}

	public int value() {
		return code;
	}

	public String toString() {
		return codeStr;
	}
}
