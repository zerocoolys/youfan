package com.youfan.data.dao.merchant.impl;

import org.springframework.stereotype.Repository;

import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.data.dao.merchant.MerchantDAO;
import com.youfan.data.models.MerchantUserEntity;

@Repository("merchantDAO")
public class MerchantDAOImpl implements MerchantDAO {

	public Class<MerchantUserEntity> getEntityClass() {
		return MerchantUserEntity.class;
	}

	public Class<MerchantUserVO> getVOClass() {
		return MerchantUserVO.class;
	}

	@Override
	public void update(MerchantUserVO v) {
		// TODO Auto-generated method stub

	}

}
