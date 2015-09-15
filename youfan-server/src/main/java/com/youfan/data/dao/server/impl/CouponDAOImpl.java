package com.youfan.data.dao.server.impl;

import org.springframework.stereotype.Repository;

import com.youfan.commons.vo.server.CouponVO;
import com.youfan.data.dao.server.CouponDAO;
import com.youfan.data.models.CouponEntity;

@Repository("couponDAO")
public class CouponDAOImpl  implements CouponDAO{

	@Override
	public Class<CouponEntity> getEntityClass() {
		return CouponEntity.class;
	}

	@Override
	public Class<CouponVO> getVOClass() {
		return CouponVO.class;
	}

	@Override
	public void update(CouponVO v) {
		// TODO Auto-generated method stub
		
	}
}