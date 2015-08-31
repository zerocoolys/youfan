package com.youfan.data.dao.server.impl;

import org.springframework.stereotype.Repository;

import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.data.dao.server.CouponsTypeDAO;

@Repository("couponsTypeDAO")
public class CouponsTypeDAOImpl implements CouponsTypeDAO{

	@Override
	public CouponsTypeVO findOne(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(CouponsTypeVO t) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insert(CouponsTypeVO couponsTypeVO) {
		// TODO Auto-generated method stub
		 mongoTemplate.insert(convertToEntity(couponsTypeVO));
	}

}
