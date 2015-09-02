package com.youfan.services.active;

import java.util.Map;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.data.dao.server.CouponsDAO;

public interface ActiveDetail {

	public Object active(ActiveVO active,Map<String,Object> pramsMap,CouponsDAO couponsDAO);
}
