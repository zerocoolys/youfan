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

	private AsyncEventBus eventBus;

	public ServerEventBus() {
		eventBus = EventBusFactory.getEventBusInstanll();
		register(new ServerEventListener());
	}

	 public void register(Object object) {
		 eventBus.register(object);
	 }
     
	 public void post(Object event) {
		eventBus.post(event);
	 }
	
	

}
