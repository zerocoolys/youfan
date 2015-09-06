package com.youfan.eventbus;

import java.util.concurrent.Executors;

import com.google.common.eventbus.AsyncEventBus;
import com.google.common.eventbus.EventBus;
/**
 * 
 * @description TODO
 * @update 2015年9月6日 上午11:08:31
 */

public class EventBusFactory {
	
	private static AsyncEventBus asyncEventBus = new AsyncEventBus(Executors.newFixedThreadPool(1));
	
	private final static EventBus eventBus = new EventBus();
	
	public static AsyncEventBus getAsyncEventBus(){
		return asyncEventBus;
	}

	public static EventBus getEventBus(){
		return eventBus;
	}

}
