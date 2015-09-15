package com.youfan.data.models;

import java.io.Serializable;
import java.util.List;

import com.youfan.commons.vo.ConditionVO;

public class CouponContentEntity implements Serializable{
	
	 /**serialVersionUID TODO*/ 
	
	private static final long serialVersionUID = 8718458989430755518L;
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
	private List<ConditionVO> conditions;
	
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
	public List<ConditionVO> getConditions() {
		return conditions;
	}
	public void setConditions(List<ConditionVO> conditions) {
		this.conditions = conditions;
	}
}
