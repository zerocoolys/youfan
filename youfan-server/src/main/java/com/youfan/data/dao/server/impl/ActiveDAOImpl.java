package com.youfan.data.dao.server.impl;

import org.springframework.stereotype.Repository;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.data.dao.impl.MongoBaseDAOImpl;
import com.youfan.data.dao.server.ActiveDAO;
import com.youfan.data.models.ActiveEntity;
import com.youfan.data.models.MerchantUserEntity;
@Repository("activeDAO")
public class ActiveDAOImpl extends MongoBaseDAOImpl<ActiveEntity, ActiveVO, String>implements ActiveDAO{
	

	public Class<ActiveEntity> getEntityClass() {
		return ActiveEntity.class;
	}

	public Class<ActiveVO> getVOClass() {
		return ActiveVO.class;
	}
	
}
