package com.youfan.services.merchant.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.data.dao.merchant.MerchantDAO;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.services.impl.MongoServiceImpl;
import com.youfan.services.merchant.MerchantService;

@Service("merchantService")
public class MerchantServiceImpl extends MongoServiceImpl<MerchantUserEntity, MerchantUserVO>implements MerchantService{

	@Autowired
	public MerchantServiceImpl(MerchantDAO merchantDAO) {
		super(merchantDAO);
	}
}
