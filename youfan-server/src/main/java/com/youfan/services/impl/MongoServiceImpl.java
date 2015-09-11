package com.youfan.services.impl;

import java.util.List;

import com.youfan.commons.Pagination;
import com.youfan.controllers.params.MongoParams;
import com.youfan.data.dao.NewMongoBaseDAO;
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
public class MongoServiceImpl<E, T> implements MongoService<E, T>{
	
	private NewMongoBaseDAO<E, T, String> mongoDao;
	public MongoServiceImpl( NewMongoBaseDAO<E, T, String> mongoDao){
		this.mongoDao=mongoDao;
	}

	@Override
	public void save(T t) {
		mongoDao.insert(t);
	}

	@Override
	public long count(MongoParams params) {
		return mongoDao.count(params);
	}

	@Override
	public List<T> getPagerByParams(MongoParams params, Pagination pager) {
		return mongoDao.findPagerByParams(params, pager);
	}

	@Override
	public int updateById(String id, MongoParams params) {
		return mongoDao.updateById(id, params);
	}

	@Override
	public T getUniqueOne(String key, Object value) {
		return mongoDao.findUniqueOne(key, value);
	}

	
}
