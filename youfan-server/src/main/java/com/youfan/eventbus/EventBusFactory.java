package com.youfan.eventbus;

import java.util.concurrent.Executors;

import com.google.common.eventbus.AsyncEventBus;
/**
 * 
 * @description TODO
 * @update 2015年9月6日 上午11:08:31
 */

public class EventBusFactory {
	
	private static AsyncEventBus eventBus = new AsyncEventBus(Executors.newFixedThreadPool(1));
	
	public static AsyncEventBus getEventBusInstanll(){
		return eventBus;
	}

}
