package com.youfan.services.menus.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.youfan.data.dao.MessageDAO;
import com.youfan.data.models.MessageEntity;
import com.youfan.services.menus.MessageService;

@Service("messageService")
public class MessageServiceImpl implements MessageService {

	@Resource
	private MessageDAO messageDAO;
	
	@Override
	public void insert(MessageEntity message) {
		if (message == null)
            return;

		messageDAO.insert(message);
		
	}

	@Override
	public MessageEntity findOne(Query query) {
		return messageDAO.findOne(query);
	}

	@Override
	public void update(MessageEntity message) {
		messageDAO.update(message);
		
	}

	@Override
	public List<MessageEntity> find(Query query) {
		return messageDAO.find(query);
	}

	@Override
	public MessageEntity findById(String id) {
		return messageDAO.findById(id);
	}

	@Override
	public long count(Query query) {
		return messageDAO.count(query);
	}


}
