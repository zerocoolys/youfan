package com.youfan.data.dao.server.impl;

import com.mongodb.WriteResult;
import com.youfan.commons.vo.client.MessageVO;
import com.youfan.data.dao.server.MessageDAO;
import com.youfan.data.models.MessageEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository("messageDAO")
public class MessageDAOImpl implements MessageDAO {


    @Override
    public void insert(MessageVO message) {
        mongoTemplate.insert(convertToEntity(message));
    }


    @Override
    public boolean updateMsg(MessageVO message) {
        Query query = Query.query(Criteria.where(MESSAGE_ID).is(message.getId()));
        Update update = Update.update(MESSAGE_STATUS, message.getStatus());
        WriteResult result = mongoTemplate.updateFirst(query, update, getEntityClass());
        return result.isUpdateOfExisting();
    }


    @Override
    public MessageVO findById(String id) {
        MessageEntity entity = mongoTemplate.findById(id, getEntityClass());
        if (entity == null)
            return null;

        return convertToVO(entity);
    }


    @Override
    public List<MessageVO> getMsgList(String userId, Integer receiver) {
        Query query = Query.query(Criteria.where(MESSAGE_RECEIVERID).is(userId).and(MESSAGE_RECEIVERPORT).is(receiver).and(MONGO_DATA_STATUS).is(MONGO_NORMAL_DATA)).with(new Sort(Sort.Direction.DESC, MESSAGE_DATE));
        List<MessageEntity> entities = mongoTemplate.find(query, getEntityClass());

        if (entities == null || entities.isEmpty())
            return Collections.emptyList();

        return convertToVOList(entities);
    }

    @Override
    public Long countUnreadMsg(String userId, Integer receiver) {
        Query query = Query.query(Criteria.where(MESSAGE_RECEIVERID).is(userId).and(MESSAGE_RECEIVERPORT).is(receiver).and(MESSAGE_STATUS).is(0).and(MONGO_DATA_STATUS).is(MONGO_NORMAL_DATA));
        long number = mongoTemplate.count(query, getEntityClass());
        return number;
    }


    //====/
    @Override
    public MessageVO findOne(String id) {
        return null;
    }

    @Override
    public void delete(String s) {
        Query query = Query.query(Criteria.where(MESSAGE_ID).is(s));
        Update update = Update.update(MONGO_DATA_STATUS, 0);
        mongoTemplate.updateFirst(query,update,getEntityClass());
    }

    @Override
    public void update(MessageVO message) {
    }

}
