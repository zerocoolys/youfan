package com.youfan.data.dao.server.impl;

import static org.springframework.data.mongodb.core.query.Criteria.where;
//import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.List;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.controllers.params.CouponsParams;
import com.youfan.data.dao.server.CouponsTypeDAO;

@Repository("couponsTypeDAO")
public class CouponsTypeDAOImpl implements CouponsTypeDAO{

	@Override
	public CouponsTypeVO findOne(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(CouponsTypeVO t) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insert(CouponsTypeVO couponsTypeVO) {
		// TODO Auto-generated method stub
		 mongoTemplate.insert(convertToEntity(couponsTypeVO));
	}

	/**
	 * 条件记录条数查询
	 */
	@Override
	public Long count(CouponsParams couponsParams) {
		Query query= new Query();
		if(couponsParams.getPort()!=null){
			query.addCriteria(where(COUPONS_TYPE_PORT).is(couponsParams.getPort()));
		}
		if(couponsParams.getTimeLine()!=null){
			query.addCriteria(where(COUPONS_TYPE_TIMELINE).is(couponsParams.getTimeLine()));
		}
		if(couponsParams.getKitchenId()!=null){
			query.addCriteria(where(COUPONS_TYPE_KITCHEN_ID).is(couponsParams.getKitchenId()));
		}
		if(couponsParams.getStatus()!=null){
			query.addCriteria(where(COUPONS_TYPE_STATUS).is(couponsParams.getStatus()));
		}
		return mongoTemplate.count(query, getEntityClass());
	}

	@Override
	public List<CouponsTypeVO> getByCondition(CouponsParams couponsParams) {
		Query query= new Query();
		if(couponsParams.getPort()!=null){
			query.addCriteria(where(COUPONS_TYPE_PORT).is(couponsParams.getPort()));
		}
		if(couponsParams.getTimeLine()!=null){
			query.addCriteria(where(COUPONS_TYPE_TIMELINE).is(couponsParams.getTimeLine()));
		}
		if(couponsParams.getKitchenId()!=null){
			query.addCriteria(where(COUPONS_TYPE_KITCHEN_ID).is(couponsParams.getKitchenId()));
		}
		if(couponsParams.getStatus()!=null){
			query.addCriteria(where(COUPONS_TYPE_STATUS).is(couponsParams.getStatus()));
		}
//		
		query.skip((couponsParams.getPageNo() - 1) * couponsParams.getPageSize());
		query.limit(couponsParams.getPageSize());
		
		return convertToVOList(mongoTemplate.find(query, getEntityClass()));
	}

}
