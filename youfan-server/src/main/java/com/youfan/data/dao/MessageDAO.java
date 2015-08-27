package com.youfan.data.dao;

import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import com.youfan.commons.Constants;
import com.youfan.data.models.MessageEntity;
import com.youfan.system.mongo.MongoPool;
/**
 * 
 * @description TODO
 * @author ZhangHuaRong   
 * @update 2015年8月26日 下午2:46:21
 */
public interface MessageDAO   extends Constants{
	
	  MongoTemplate mongoTemplate = MongoPool.getMongoTemplate(MONGO_YOUFAN);

	
	  public MessageEntity findOne(Query query) ;  
		
	  public void update(MessageEntity message);
	  
	  public List<MessageEntity> find(Query query) ;  

	  public MessageEntity findById(String id) ; 
	  
	  public void insert(MessageEntity message);
	  
	  public long count(Query query);
	  
}
