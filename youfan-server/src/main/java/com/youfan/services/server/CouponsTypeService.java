package com.youfan.services.server;

import java.util.List;

import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.controllers.params.CouponsParams;

/**
 * 
 * @title CouponsTypeService.java
 * @package com.youfan.services.server
 * @description TODO
 * @author QinghaiDeng   
 * @update 2015年8月31日 下午5:22:52
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public interface CouponsTypeService {
	public void save(CouponsTypeVO coupons);

	public Long count(CouponsParams couponsParams);

	public List<CouponsTypeVO> getByCondition(CouponsParams couponsParams);
}
