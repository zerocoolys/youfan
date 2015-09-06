package com.youfan.services.server;

import java.util.List;
import java.util.Map;

import com.youfan.commons.vo.ConditionVO;
import com.youfan.commons.vo.client.UserVO;
import com.youfan.commons.vo.server.OrderVO;
import com.youfan.exceptions.ServerNoActiveDetailClazzException;
import com.youfan.exceptions.ServerNoActiveEventException;

/**
 * 活动支撑接口
 * 
 * @title ActiveSupportService.java
 * @package com.youfan.services
 * @description TODO
 * @author QinghaiDeng
 * @update 2015年9月1日 下午3:36:30
 * @version V1.0 Copyright (c)2012 chantsoft-版权所有
 */
public interface ActiveSupportService {

	/**
	 * 参加活动类型下所有活动 不涉及订单
	 * 
	 * @param activeType
	 * @param userVo
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月6日 下午6:17:23
	 */
	public Object joinActive(Integer activeType, UserVO userVo);

	/**
	 * 参加活动类型下指定活动 不涉及订单
	 * 
	 * @param event
	 * @param userVo
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月6日 下午6:17:35
	 */
	public Object joinActive(String event, UserVO userVo);

	/**
	 * 参加活动类型下所有活动
	 * @param activeType
	 * @param event
	 * @param userVo
	 * @param orderVo
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月6日 下午6:18:41
	 */
	public Object joinActive(Integer activeType, UserVO userVo, OrderVO orderVo);
	/**
	 * 参加活动类型下指定活动
	 * @param activeType
	 * @param event
	 * @param userVo
	 * @param orderVo
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月6日 下午6:18:41
	 */
	public Object joinActive(String event, UserVO userVo, OrderVO orderVo);
}
