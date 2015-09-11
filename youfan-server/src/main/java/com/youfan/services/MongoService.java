package com.youfan.services;

import java.util.List;

import com.youfan.commons.Pagination;
import com.youfan.controllers.params.MongoParams;

/**
 * 
 * @title MongoService.java
 * @package com.youfan.services
 * @description mongo业务层接口
 * @author QinghaiDeng   
 * @update 2015年9月11日 上午11:37:29
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public interface MongoService<E,T> {
	/**
	 * 
	 * @param id
	 * @return
	 * @description 通过ID做逻辑删除
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 下午3:49:44
	 */
	public int logicDelete(String id);

	/**
	 * 
	 * @param t
	 * @description 保存
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 下午3:49:16
	 */
	public void save(T t);

	/**
	 * 
	 * @param muParams
	 * @return
	 * @description 使用条件 获取记录条数
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 上午10:30:31
	 */
	long count(MongoParams params);

	/**
	 * 
	 * @param id
	 * @param muParams
	 * @return
	 * @description ID查询更新记录
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 上午10:30:46
	 */
	int updateById(String id, MongoParams params);
	
	int updateById(String id, T t);
	
	/**
	 * 
	 * @param id
	 * @return
	 * @description 根据ID查询
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 下午2:35:23
	 */
	T get(String id );
	/**
	 * 
	 * @param key
	 * @param value
	 * @return
	 * @description 通过Unique字段查询
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 上午11:05:50
	 */
	T getUniqueOne(String key,Object value);
	/**
	 * 
	 * @param params
	 * @param pager
	 * @return
	 * @description 条件分页查询
	 * 				
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 上午10:29:56
	 */
	List<T> getPagerByParams(MongoParams params,Pagination pager);
}
