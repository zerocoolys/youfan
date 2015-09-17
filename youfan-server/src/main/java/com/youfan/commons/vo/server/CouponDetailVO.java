package com.youfan.commons.vo.server;

import java.util.List;

import com.youfan.commons.vo.ConditionVO;

/**
 * 
 * @title CouponDetailVO.java
 * @package com.youfan.commons.vo.server
 * @description 活动优惠详情VO
 * @author QinghaiDeng   
 * @update 2015年9月17日 上午9:35:16
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public class CouponDetailVO {

	private Double value;
	private List<ConditionVO> uc;
	private List<ConditionVO> oc;
	public List<ConditionVO> getUc() {
		return uc;
	}
	public void setUc(List<ConditionVO> uc) {
		this.uc = uc;
	}
	public List<ConditionVO> getOc() {
		return oc;
	}
	/**
	 * 
	 * @param oc
	 * @description 订单条件
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月17日 上午11:02:54
	 */
	public void setVc(List<ConditionVO> oc) {
		this.oc = oc;
	}
	/**
	 * 
	 * @return
	 * @description 获取详情订单条件
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月17日 上午11:03:12
	 */
	public Double getValue() {
		return value;
	}
	public void setValue(Double value) {
		this.value = value;
	}
}
