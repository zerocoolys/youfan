package com.youfan.data.dao.merchant.impl;

import org.springframework.stereotype.Repository;

import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.data.dao.impl.MongoBaseDAOImpl;
import com.youfan.data.dao.merchant.MerchantDAO;
import com.youfan.data.models.MerchantUserEntity;

@Repository("merchantDAO")
public class MerchantDAOImpl extends MongoBaseDAOImpl<MerchantUserEntity, MerchantUserVO, Long> implements MerchantDAO{

	public Class<MerchantUserEntity> getEntityClass() {
		// TODO Auto-generated method stub
		return MerchantUserEntity.class;
	}

	public Class<MerchantUserVO> getVOClass() {
		// TODO Auto-generated method stub
		return MerchantUserVO.class;
	}
	
}
