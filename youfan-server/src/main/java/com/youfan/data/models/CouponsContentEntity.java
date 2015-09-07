package com.youfan.data.models;

import com.youfan.commons.vo.ConditionVO;

public class CouponsContentEntity {
	/**
	 * 优惠券使用方式
	 * *折扣 -满减 +返现
	 */
	private String type;
	/**
	 * 优惠量
	 * type=*时:value=[0,10]表示折扣
	 * type=-时:value表示减免金额
	 * type=+时:value表示返现金额
	 */
	private Double value;
	/**
	 * 描述享受折扣条件
	 */
	private ConditionVO condition;
	
//	@Field("oc")
//	private List<ConditionVO> orderCondition;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Double getValue() {
		return value;
	}
	public void setValue(Double value) {
		this.value = value;
	}
	public ConditionVO getCondition() {
		return condition;
	}
	public void setCondition(ConditionVO condition) {
		this.condition = condition;
	}
}
