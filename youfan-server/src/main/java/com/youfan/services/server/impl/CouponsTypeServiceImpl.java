package com.youfan.services.server.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.controllers.params.CouponsParams;
import com.youfan.data.dao.server.CouponsTypeDAO;
import com.youfan.services.server.CouponsTypeService;

/**
 * 
 * @title CouponsTypeServiceImpl.java
 * @package com.youfan.services.server.impl
 * @description TODO
 * @author QinghaiDeng   
 * @update 2015年8月31日 下午5:24:50
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
@Service("couponsTypeService")
public class CouponsTypeServiceImpl implements CouponsTypeService{

	@Resource
	CouponsTypeDAO couponsTypeDAO;
	@Override
	public void save(CouponsTypeVO couponsTypeVO) {
		// TODO Auto-generated method stub
		couponsTypeDAO.insert(couponsTypeVO);
	}
	@Override
	public Long count(CouponsParams couponsParams) {
		// TODO Auto-generated method stub
		return couponsTypeDAO.count(couponsParams);
	}
	@Override
	public List<CouponsTypeVO> getByCondition(CouponsParams couponsParams) {
		// TODO Auto-generated method stub
		return couponsTypeDAO.getByCondition(couponsParams);
	}
	@Override
	public int updateById(String id, Map<String, Object> updateMap) {
		// TODO Auto-generated method stub
		return couponsTypeDAO.updateById(id, updateMap);
	}

}
