package com.youfan.services.impl;

import java.util.List;

import com.youfan.commons.Pagination;
import com.youfan.controllers.params.MongoParams;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.services.MongoService;
/**
 * 
 * @title MongoServiceImpl.java
 * @package com.youfan.services.impl
 * @description mongo业务层接口实现 基础Mongo CURD操作
 * @author QinghaiDeng   
 * @update 2015年9月11日 上午11:37:51
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public class MongoServiceImpl<E, V> implements MongoService<E, V>{
	
	private MongoBaseDAO<E, V, String> mongoDao;
	public MongoServiceImpl(MongoBaseDAO<E, V, String> mongoDao){
		this.mongoDao=mongoDao;
	}

	protected MongoBaseDAO<E, V, String> getMongoDAO() {
		return mongoDao;
	}
	@Override
	public void save(V t) {
		mongoDao.insert(t);
	}

	@Override
	public long count(MongoParams params) {
		return mongoDao.count(params);
	}

	@Override
	public int updateById(String id, MongoParams params) {
		return mongoDao.updateById(id, params);
	}

	@Override
	public int updateById(String id, V t) {
		return mongoDao.updateById(id, t);
	}
	
	@Override
	public int logicDelete(String id) {
		MongoParams params=new MongoParams();
		params.setDataStatus(MONGO_DELETED_DATA);
		return mongoDao.updateById(id, params);
	}

	@Override
	public V get(String id) {
		return mongoDao.findOne(id);
	}
	@Override
	public V getUniqueOne(String key, Object value) {
		return mongoDao.findUniqueOne(key, value);
	}

	@Override
	public List<V> getPagerByParams(MongoParams params, Pagination pager) {
		params.setDataStatus(MONGO_NORMAL_DATA);
		return mongoDao.findPagerByParams(params, pager);
	}

	@Override
	public List<V> getByParams(MongoParams params) {
		params.setDataStatus(MONGO_NORMAL_DATA);
		return mongoDao.findPagerByParams(params, null);
	}
	
}
