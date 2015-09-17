package com.youfan.services.server.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.data.dao.server.ActiveDAO;
import com.youfan.data.models.ActiveEntity;
import com.youfan.services.impl.MongoServiceImpl;
import com.youfan.services.server.ActiveService;

@Service("activeService")
public class ActiveServiceImpl extends MongoServiceImpl<ActiveEntity, ActiveVO>implements ActiveService{


//	@Resource
//	ActiveDAO activeDAO;
	
	@Autowired
	public ActiveServiceImpl(ActiveDAO mongoDao) {
		super(mongoDao);
	}

	
	@Override
	public void saveActive(ActiveVO activeVo) {
		activeVo.setStatus(1);// 状态默认为1 表示开启使用状态
		
		save(activeVo);
	}

//	@Override
//	public long count(ActiveParams activeParams) {
//		return activeDAO.count(activeParams) ;
//	}
//
//	@Override
//	public List<ActiveVO> getByCondition(ActiveParams activeParams) {
//		return activeDAO.getByCondition(activeParams);
//	}
//
//	@Override
//	public void updateById(String id, Map<String, Object> updateMap) {
//		activeDAO.updateById(id,updateMap);
//	}

}
