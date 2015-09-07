package com.youfan.eventbus;

import java.util.Set;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.eventbus.AsyncEventBus;
import com.google.common.eventbus.EventBus;

/**
 * 
 * @description guava 事件处理采用同步的方式
 * @author ZhangHuaRong
 */
@Component("asyncEventBus")
public class ServerAsyncEventBus implements InitializingBean, DisposableBean {

	private AsyncEventBus eventBus;
	@Autowired
	private Set<AsyncEventBusListener> listeners;

	public ServerAsyncEventBus() {
		eventBus = EventBusFactory.getAsyncEventBus();
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
		for (AsyncEventBusListener listerer : listeners) {
			eventBus.register(listerer);
		}
	}

}
