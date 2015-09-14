package com.youfan.services.active;

import java.util.Map;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.data.dao.server.CouponDAO;

public interface ActiveDetail {

	public Object active(ActiveVO active,Map<String,Object> pramsMap,CouponDAO couponsDAO);
}
