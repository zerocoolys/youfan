package com.youfan.data.dao.server.impl;

import org.springframework.stereotype.Repository;

import com.youfan.commons.vo.server.PayWayVO;
import com.youfan.data.dao.server.PayWayDAO;
import com.youfan.data.models.PayWayEntity;

/**
 * 
 * @title PayWayDAOImpl.java
 * @package com.youfan.data.dao.server.impl
 * @description TODO
 * @author QinghaiDeng   
 * @update 2015年9月6日 上午10:58:04
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
@Repository("payWayDAO")
public class PayWayDAOImpl  implements PayWayDAO{



	@Override
	public Class<PayWayEntity> getEntityClass() {
		return PayWayEntity.class;
	}

	@Override
	public Class<PayWayVO> getVOClass() {
		return PayWayVO.class;
	}

	@Override
	@Deprecated
	public void update(PayWayVO v) {
		// TODO Auto-generated method stub
		
	}

//	@Override
//	public List<PayWayVO> getAll() {
//		return convertToVOList(mongoTemplate.findAll(PayWayEntity.class));
//	}
//
//	@Override
//	public void updateStatus(String id, Integer status) {
//		Update update = new Update();
//		update.set("status", status);
//		mongoTemplate.updateFirst(query(where("id").is(id)), update, PayWayEntity.class);
//		
//	}


}
