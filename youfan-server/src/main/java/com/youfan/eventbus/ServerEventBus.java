package com.youfan.eventbus;

import java.util.Set;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.eventbus.EventBus;

/**
 * 
 * @description guava 事件处理采用同步的方式
 * @author ZhangHuaRong
 */
@Component("eventBus")
public class ServerEventBus implements InitializingBean, DisposableBean {

	private EventBus eventBus;
	@Autowired
	private Set<EventBusListener> listeners;

	public ServerEventBus() {
		eventBus = EventBusFactory.getEventBus();
	}

	public void register(Object object) {
		eventBus.register(object);
	}

	public void post(Object event) {
		eventBus.post(event);
	}

	@Override
	public void destroy() throws Exception {

	}
	
	

	@Override
	public void afterPropertiesSet() throws Exception {
		for (EventBusListener listerer : listeners) {
			eventBus.register(listerer);
		}
	}

}
