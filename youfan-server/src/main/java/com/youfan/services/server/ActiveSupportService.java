package com.youfan.services.server;

import java.util.Map;

import com.youfan.exceptions.ServerNoActiveDetailClazzException;
import com.youfan.exceptions.ServerNoActiveEventException;

/**
 * 活动支撑接口
 * @title ActiveSupportService.java
 * @package com.youfan.services
 * @description TODO
 * @author QinghaiDeng   
 * @update 2015年9月1日 下午3:36:30
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public interface ActiveSupportService {

	/**
	 * 参加活动
	 * @param activeType
	 * @param pramasMap
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月1日 下午3:39:55
	 */
	public Object joinActive(Integer activeType,String event,Map<String,Object>paramsMap)throws ServerNoActiveDetailClazzException,ServerNoActiveEventException;
}
