package com.youfan.eventbus;

import org.springframework.stereotype.Component;

import com.google.common.eventbus.AsyncEventBus;
/**
 * 
 * @description guava 事件处理
 * @author ZhangHuaRong   
 */
@Component("eventBus")
public class ServerEventBus  {

	private AsyncEventBus asyncEventBus;
	

	public ServerEventBus() {
		asyncEventBus = EventBusFactory.getEventBusInstanll();
		register(new ServerEventListener());
	}

	 public void register(Object object) {
		 asyncEventBus.register(object);
	 }
     
	 public void post(Object event) {
		 asyncEventBus.post(event);
	 }
	
	

}
