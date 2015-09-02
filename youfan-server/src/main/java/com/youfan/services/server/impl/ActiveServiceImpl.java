package com.youfan.services.server.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.data.dao.server.ActiveDAO;
import com.youfan.services.server.ActiveService;

@Service("activeService")
public class ActiveServiceImpl implements ActiveService{

	@Resource
	ActiveDAO activeDAO;
	
	@Override
	public void save(ActiveVO activeVo) {
		// TODO Auto-generated method stub
		activeDAO.insert(activeVo);
	}

}
