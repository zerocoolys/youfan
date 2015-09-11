package com.youfan.services.merchant.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.controllers.params.MongoParams;
import com.youfan.data.dao.merchant.MerchantDAO;
import com.youfan.services.merchant.MerchantService;

@Service("merchantService")
public class MerchantServiceImpl implements MerchantService{

	@Resource
	MerchantDAO merchantDAO;

	@Override
	public List<MerchantUserVO> getPagerByParams(MongoParams params, Pagination pager) {
		// TODO Auto-generated method stub
		return merchantDAO.findPagerByParams(params, pager);
	}
	
	
}
