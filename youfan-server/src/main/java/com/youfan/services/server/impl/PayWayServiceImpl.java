package com.youfan.services.server.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youfan.commons.vo.server.PayWayVO;
import com.youfan.data.dao.server.PayWayDAO;
import com.youfan.services.server.PayWayService;

/**
 * 
 * @title PayWayServiceImpl.java
 * @package com.youfan.services.server.impl
 * @description TODO
 * @author QinghaiDeng   
 * @update 2015年9月6日 上午10:42:33
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
@Service("payWayService")
public class PayWayServiceImpl implements PayWayService {

	@Resource
	PayWayDAO payWayDAO;
	@Override
	public void save(PayWayVO payWayVo) {
		payWayDAO.insert(payWayVo);		
	}
	@Override
	public List<PayWayVO> getAll() {
		return payWayDAO.getAll();
	}
	@Override
	public void updatePayWayStatus(String id, Integer status) {
		payWayDAO.updateStatus(id, status);		
	}
	@Override
	public PayWayVO getById(String id) {
		// TODO Auto-generated method stub
		return payWayDAO.findOne(id);
	}

}
