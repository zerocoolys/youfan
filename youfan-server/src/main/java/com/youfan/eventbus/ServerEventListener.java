package com.youfan.eventbus;

import com.google.common.eventbus.Subscribe;
import com.youfan.eventbus.events.CouponEvent;
/**
 * 
 * @description 事件监听总线
 * @author ZhangHuaRong   
 */
public class ServerEventListener {
	
	
	@Subscribe
	public void postCoupon(CouponEvent couponEvent){
		couponEvent.domain();
	}
	

	
}
