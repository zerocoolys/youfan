package com.youfan.services.active.impl;

import java.util.Map;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.data.dao.server.CouponDAO;
import com.youfan.services.active.ActiveDetail;

public class LoginActiveDetail implements ActiveDetail{

	@Override
	public Object active(ActiveVO active, Map<String, Object> pramsMap,CouponDAO couponsDAO) {
		// TODO Auto-generated method stub
		System.out.println("LoginActiveDetail");
		return null;
	}

}
