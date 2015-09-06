package com.youfan.eventbus.eventlistener;

import org.springframework.stereotype.Component;

import com.google.common.eventbus.Subscribe;
import com.youfan.eventbus.AsyncEventBusListener;
import com.youfan.eventbus.events.CouponEvent;
/**
 * 
 * @description 事件监听总线采用异步的方式
 * @author ZhangHuaRong   
 */
@Component
public class ServerEventListener implements AsyncEventBusListener{
	
	
	@Subscribe
	public void postCoupon(CouponEvent couponEvent){
		couponEvent.domain();
	}
	

	
}
