package com.youfan.services.active.impl;

import java.util.Map;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.data.dao.server.CouponDAO;
import com.youfan.services.active.ActiveDetail;

public class AfterOrderActiveDetail implements ActiveDetail{

	@Override
	public Object active(ActiveVO active, Map<String, Object> pramsMap, CouponDAO couponsDAO) {
		System.out.println("AfterOrderActiveDetail");
		return null;
	}

}
