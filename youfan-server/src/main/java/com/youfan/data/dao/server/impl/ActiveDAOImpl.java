package com.youfan.data.dao.server.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.controllers.params.ActiveParams;
import com.youfan.data.dao.server.ActiveDAO;
import com.youfan.data.models.ActiveEntity;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
@Repository("activeDAO")
public class ActiveDAOImpl implements ActiveDAO{

	@Override
	public ActiveVO findOne(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insert(ActiveVO t) {
		// TODO Auto-generated method stub
		 mongoTemplate.insert(convertToEntity(t));
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(ActiveVO t) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insert(CouponsTypeVO couponsTypeVO) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Long count(ActiveParams activeParams) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ActiveVO> getByCondition(ActiveParams activeParams) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ActiveVO getByEvent(String event) {
		return convertToVO(mongoTemplate.findOne(query(where("event").is(event)), ActiveEntity.class));
	}


}
