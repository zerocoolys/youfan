package com.youfan.data.dao.impl;

import java.util.List;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.youfan.data.dao.MessageDAO;
import com.youfan.data.models.MessageEntity;

@Repository("messageDAO")
public class MessageDAOImpl implements MessageDAO {


	@Override
	public void insert(MessageEntity message) {
		mongoTemplate.insert(message);
		
	}

	@Override
	public MessageEntity findOne(Query query) {
		return mongoTemplate.findOne(query, MessageEntity.class);
	}

	@Override
	public void update(MessageEntity message) {
		 Criteria criteria = Criteria.where("id").is(message.getId());  
		 Query query = new Query(criteria);  
		 Update update = Update.update("status", message.getStatus());
		mongoTemplate.updateFirst(query, update, MessageEntity.class);
		
	}

	@Override
	public List<MessageEntity> find(Query query) {
		return mongoTemplate.find(query, MessageEntity.class);
	}

	@Override
	public MessageEntity findById(String id) {
		return mongoTemplate.findById(id, MessageEntity.class);
	}

	@Override
	public long count(Query query) {
		return mongoTemplate.count(query, MessageEntity.class);
	}







}
