package com.youfan.data.dao.impl;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.query.Query;

import com.mongodb.WriteResult;
import com.youfan.commons.Pagination;
import com.youfan.controllers.params.MongoParams;
import com.youfan.data.dao.NewMongoBaseDAO;
import com.youfan.utils.JSONUtils;

public abstract class MongoBaseDAOImpl<E, T, ID extends Serializable> implements NewMongoBaseDAO<E, T, ID> {

	@Override
	public T findOne(Serializable id) {
		return convertToVO(mongoTemplate.findOne(query(where(ID).is(id)), getEntityClass()));
	}

	@Override
	public void insert(T t) {
		mongoTemplate.insert(convertToEntity(t));
	}

//	@Override
//	public void delete(Serializable id) {
//	}

	@Override
	public void update(T t) {
	}

	@Override
	public int logicDelete(ID id) {
		MongoParams params=new MongoParams();
		params.setDataStatus(MONGO_DELETED_DATA);
		return updateById(id, params);
	}
	
	@Override
	public Class<E> getEntityClass() {
		return null;
	}

	@Override
	public Class<T> getVOClass() {
		return null;
	}

	@Override
	public List<T> findPagerByParams(MongoParams params, Pagination pager) {
		Query query = buildAndEqualQuery(params);
		if (pager != null) {
			query.skip((pager.getPageNo() - 1) * pager.getPageSize());
			query.limit(pager.getPageSize());
			if (pager.getSortBy() != null && !pager.getSortBy().isEmpty()) {
				query.with(new Sort(pager.getIsAsc()?Direction.ASC:Direction.DESC,pager.getSortBy()));

			}
		}
		return convertToVOList(mongoTemplate.find(query, getEntityClass()));
	}

	
	@Override
	public List<T> findByParams(MongoParams params) {
		return convertToVOList(mongoTemplate.find(buildAndEqualQuery(params), getEntityClass()));
	}
	@Override
	public List<T> findAll() {
		return findByParams(new MongoParams());
	}

	@Override
	public long count(MongoParams params) {
		Query query = buildAndEqualQuery(params);
		return mongoTemplate.count(query, getEntityClass());
	}
	@Override
	public int updateById(ID id, MongoParams params) {
		try {
			Map<String, Object> paramsMap = JSONUtils.obj2map(params);
			if (paramsMap != null && !paramsMap.isEmpty()) {
				WriteResult re = mongoTemplate.updateFirst(
						query(where(ID).is(id)).addCriteria(where(MONGO_DATA_STATUS).is(1)), buildUpdate(paramsMap), getEntityClass());
				return re.getN();
			}
		} catch (Exception e) {
		}
		return 0;
	}

	@Override
	public T findUniqueOne(String key, Object value) {
		return (T) mongoTemplate.findOne(query(where(key).is(value)).addCriteria(where(MONGO_DATA_STATUS).is(1)),
				getEntityClass());
	}

	@Override
	public int updateById(ID id, T t) {
		try {
			Map<String, Object> paramsMap = JSONUtils.obj2map(t);
			if (paramsMap != null && !paramsMap.isEmpty()) {
				WriteResult re = mongoTemplate.updateFirst(
						query(where(ID).is(id)).addCriteria(where(MONGO_DATA_STATUS).is(1)), buildUpdate(paramsMap), getEntityClass());
				return re.getN();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	


}
