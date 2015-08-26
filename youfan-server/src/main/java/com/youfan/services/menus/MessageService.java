package com.youfan.services.menus;

import java.util.List;

import org.springframework.data.mongodb.core.query.Query;

import com.youfan.data.models.MessageEntity;

public interface MessageService {
	
	  public MessageEntity findOne(Query query) ;  
		
	  public void update(MessageEntity message);
	  
	  public List<MessageEntity> find(Query query) ;  

	  public MessageEntity findById(String id) ; 
	  
	  public void insert(MessageEntity message);
	  
	  public long count(Query query);

}
