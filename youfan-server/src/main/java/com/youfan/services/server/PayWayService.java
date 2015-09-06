package com.youfan.services.server;

import java.util.List;

import com.youfan.commons.vo.server.PayWayVO;

/**
 * 
 * @title PayWayService.java
 * @package com.youfan.services.server
 * @description TODO
 * @author QinghaiDeng   
 * @update 2015年9月6日 上午10:41:59
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public interface PayWayService {

	void save(PayWayVO payWayVo);

	List<PayWayVO> getAll();

	void updatePayWayStatus(String valueOf, Integer valueOf2);

	PayWayVO getById(String parameter);

}
