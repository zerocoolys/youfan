package com.youfan.services.active.impl;

import java.util.Map;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.data.dao.server.CouponsDAO;
import com.youfan.services.active.ActiveDetail;

public class LoginActiveDetail implements ActiveDetail{

	@Override
	public Object active(ActiveVO active, Map<String, Object> pramsMap,CouponsDAO couponsDAO) {
		// TODO Auto-generated method stub
		System.out.println("LoginActiveDetail");
		System.out.println("参数：buyerId"+pramsMap.get("buyerId"));
		System.out.println("参数：clientUser"+pramsMap.get("clientUser"));
		return null;
	}

}
