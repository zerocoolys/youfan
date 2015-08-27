package com.youfan.data.dao.impl;

import java.util.ArrayList;
import java.util.List;

import com.mongodb.WriteResult;
import com.youfan.controllers.objs.Message;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.youfan.data.dao.MessageDAO;
import com.youfan.data.models.MessageEntity;
import com.youfan.commons.Constants;

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
    public WriteResult updateMsg(Message message) {
        Criteria criteria = Criteria.where(MESSAGE_ID).is(message.getId());
        Query query = new Query(criteria);
        Update update = Update.update(MESSAGE_STATUS, message.getStatus());
        WriteResult result = mongoTemplate.updateFirst(query, update, MessageEntity.class);
        return result;
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

    @Override
    public List<Message> getMsgList(Long userId, Integer receiver) {
        Query query = Query.query(Criteria.where(MESSAGE_RECEIVERID).is(userId).and(MESSAGE_RECEIVERPORT).is(receiver)).with(new Sort(Sort.Direction.DESC, MESSAGE_DATE));
        List<MessageEntity> entities = new ArrayList<>(mongoTemplate.find(query, MessageEntity.class));
        List<Message> messages = convertToVOList(entities);
        return messages;
    }

    @Override
    public Long countUnreadMsg(Long userId, Integer receiver) {
        Query query = Query.query(Criteria.where(MESSAGE_RECEIVERID).is(userId).and(MESSAGE_RECEIVERPORT).is(receiver).and(MESSAGE_STATUS).is(0));
        long number = mongoTemplate.count(query, MessageEntity.class);
        return number;
    }


    //====/
    @Override
    public List<Message> findAll() {
        return null;
    }

    @Override
    public Message findOne(String s) {
        return null;
    }

    @Override
    public void insert(Message message) {
    }

    @Override
    public void insert(List<Message> list) {
    }

    @Override
    public void delete(String s) {
    }

    @Override
    public void update(Message message) {
    }

    @Override
    public Class<MessageEntity> getEntityClass() {
        return MessageEntity.class;
    }

    @Override
    public Class<Message> getVOClass() {
        return Message.class;
    }
}
