package com.youfan.data.dao.server.impl;

import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
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
		Query query= new Query();
		buildConditionQuery(query, activeParams);
		return mongoTemplate.count(query, ActiveEntity.class);
	}

	@Override
	public List<ActiveVO> getByCondition(ActiveParams activeParams) {
		Query query = new Query();
		
		buildConditionQuery(query, activeParams);
		query .skip((activeParams.getPageNo() - 1) * activeParams.getPageSize());
		query.limit(activeParams.getPageSize());
		return convertToVOList(mongoTemplate.find(query, getEntityClass()));
	}

	@Override
	public ActiveVO getByEvent(String event) {
		return convertToVO(mongoTemplate.findOne(query(where("event").is(event)), ActiveEntity.class));
	}

	private void buildConditionQuery(Query query,ActiveParams activeParams){
		if(activeParams.getEvent()!=null&&activeParams.getEvent().trim()!=""){
			query.addCriteria(where("event").is(activeParams.getEvent()));
		}
		if(activeParams.getStatus()!=null){
			query.addCriteria(where("status").is(activeParams.getStatus()));
		}
		if(activeParams.getTitle()!=null){
			query.addCriteria(where("title").is(activeParams.getTitle()));
		}
		
	}

	@Override
	public void updateById(String id, Map<String, Object> updateMap) {
		Update update = buildUpdate(updateMap);
		mongoTemplate.updateFirst(query(where("id").is(id)), update, getEntityClass());
		
	}
}
