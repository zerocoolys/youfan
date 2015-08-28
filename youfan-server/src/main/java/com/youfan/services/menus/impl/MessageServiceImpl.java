package com.youfan.services.menus.impl;

import com.mongodb.WriteResult;
import com.youfan.controllers.objs.MessageVO;
import com.youfan.data.dao.MessageDAO;
import com.youfan.data.models.MessageEntity;
import com.youfan.services.menus.MessageService;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

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
    public boolean updateMsg(String id, int status) {

        MessageVO message = new MessageVO();
        message.setId(id);
        message.setStatus(status);
        WriteResult result = messageDAO.updateMsg(message);
        System.out.println();
        return result.isUpdateOfExisting();
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

    @Override
    public List<MessageVO> findMsgList(Long userId, Integer receiver) {
        return messageDAO.getMsgList(userId, receiver);
    }

    @Override
    public Long countUnreadMsg(Long userId, Integer receiver) {
        return messageDAO.countUnreadMsg(userId, receiver);
    }


}
