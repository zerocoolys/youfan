package com.youfan.data.dao.server.impl;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.List;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.WriteResult;
import com.youfan.commons.Pager;
import com.youfan.commons.Pagination;
import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.controllers.params.CouponsParams;
import com.youfan.data.dao.server.CouponsTypeDAO;

@Repository("couponsTypeDAO")
public class CouponsTypeDAOImpl implements CouponsTypeDAO{

	@Override
	public CouponsTypeVO findOne(String id) {
		// TODO Auto-generated method stub
		return convertToVO( mongoTemplate.findOne(query(where("id").is(id)), getEntityClass()));
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
		 mongoTemplate.insert(convertToEntity(couponsTypeVO));
	}

	/**
	 * 条件记录条数查询
	 */
	@Override
	public Long count(CouponsParams couponsParams) {
		Query squery= new Query();
		if(couponsParams.getPort()!=null){
			squery.addCriteria(where(COUPONS_TYPE_PORT).is(couponsParams.getPort()));
		}
		if(couponsParams.getTimeLine()!=null){
			squery.addCriteria(where(COUPONS_TYPE_TIMELINE).is(couponsParams.getTimeLine()));
		}
		if(couponsParams.getKitchenId()!=null){
			squery.addCriteria(where(COUPONS_TYPE_KITCHEN_ID).is(couponsParams.getKitchenId()));
		}
		if(couponsParams.getStatus()!=null){
			squery.addCriteria(where(COUPONS_TYPE_STATUS).is(couponsParams.getStatus()));
		}
		return mongoTemplate.count(squery, getEntityClass());
	}

	@Override
	public List<CouponsTypeVO> getByCondition(CouponsParams couponsParams) {
		Query squery= new Query();
		if(couponsParams.getPort()!=null){
			squery.addCriteria(where(COUPONS_TYPE_PORT).is(couponsParams.getPort()));
		}
		if(couponsParams.getTimeLine()!=null){
			squery.addCriteria(where(COUPONS_TYPE_TIMELINE).is(couponsParams.getTimeLine()));
		}
		if(couponsParams.getKitchenId()!=null){
			squery.addCriteria(where(COUPONS_TYPE_KITCHEN_ID).is(couponsParams.getKitchenId()));
		}
		if(couponsParams.getStatus()!=null){
			squery.addCriteria(where(COUPONS_TYPE_STATUS).is(couponsParams.getStatus()));
		}
//		
		squery.skip((couponsParams.getPageNo() - 1) * couponsParams.getPageSize());
		squery.limit(couponsParams.getPageSize());
		
		return convertToVOList(mongoTemplate.find(squery, getEntityClass()));
	}

//	@Override
//	public Class<CouponsTypeEntity> getEntityClass() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public Class<CouponsTypeVO> getVOClass() {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Override
	public int updateById(String id, Map<String, Object> updateMap) {
		Update update = buildUpdate(updateMap);
		WriteResult re = mongoTemplate.updateFirst(query(where("id").is(id)), update, getEntityClass());
		System.out.println(re.toString());
		return re.getN();
	}

}
