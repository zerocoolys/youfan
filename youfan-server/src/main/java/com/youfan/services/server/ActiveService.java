package com.youfan.services.server;

import java.util.List;
import java.util.Map;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.controllers.params.ActiveParams;

/**
 * 
 * @title Cong   
 * @update 2015年8月31日 下午5:22:52
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public interface ActiveService {
	public void save(ActiveVO activeVo);

	public long count(ActiveParams activeParams);

	public List<ActiveVO> getByCondition(ActiveParams activeParams);

	public void updateById(String id, Map<String, Object> updateMap);

}
