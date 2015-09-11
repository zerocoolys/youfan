package com.youfan.services.server.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youfan.commons.vo.server.PayWayVO;
import com.youfan.data.dao.server.PayWayDAO;
import com.youfan.data.models.PayWayEntity;
import com.youfan.services.impl.MongoServiceImpl;
import com.youfan.services.server.PayWayService;

/**
 * 
 * @title PayWayServiceImpl.java
 * @package com.youfan.services.server.impl
 * @description TODO
 * @author QinghaiDeng   
 * @update 2015年9月6日 上午10:42:33
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
@Service("payWayService")
public class PayWayServiceImpl extends MongoServiceImpl<PayWayEntity, PayWayVO> implements PayWayService {
	@Autowired
	public PayWayServiceImpl(PayWayDAO payWayDAO) {
		super(payWayDAO);
	}

}
