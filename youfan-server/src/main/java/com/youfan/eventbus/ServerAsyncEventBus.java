package com.youfan.eventbus;

import com.google.common.eventbus.AsyncEventBus;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * @author ZhangHuaRong
 * @description guava 事件处理采用同步的方式
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
        listeners.forEach((listener) -> {
            eventBus.unregister(listener);
        });

    }


    @Override
    public void afterPropertiesSet() throws Exception {
        for (AsyncEventBusListener listerer : listeners) {
            eventBus.register(listerer);
        }
    }

}
