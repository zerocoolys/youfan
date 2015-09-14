package com.youfan.services.server.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youfan.commons.vo.server.CouponVO;
import com.youfan.data.dao.server.CouponDAO;
import com.youfan.data.models.CouponEntity;
import com.youfan.services.impl.MongoServiceImpl;
import com.youfan.services.server.CouponService;

@Service("couponService")
public class CouponServiceImpl extends MongoServiceImpl<CouponEntity, CouponVO> implements CouponService {

	@Autowired
	public CouponServiceImpl(CouponDAO couponDAO) {
		super(couponDAO);
	}

}
