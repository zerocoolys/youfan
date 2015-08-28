package com.youfan.data.dao;

import com.mongodb.WriteResult;
import com.youfan.controllers.objs.MessageVO;
import com.youfan.data.models.MessageEntity;
import com.youfan.system.mongo.MongoPool;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

/**
 * @author ZhangHuaRong
 * @description TODO
 * @update 2015年8月26日 下午2:46:21
 */
public interface MessageDAO extends MongoBaseDAO<MessageEntity, MessageVO, String> {

    MongoTemplate mongoTemplate = MongoPool.getMongoTemplate(MONGO_YOUFAN);


    public MessageEntity findOne(Query query);

    /**
     * 根据数据ID修改消息查看状态
     *
     * @param message
     */
    WriteResult updateMsg(MessageVO message);

    public List<MessageEntity> find(Query query);

    public MessageEntity findById(String id);

    public void insert(MessageEntity message);

    public long count(Query query);

    /**
     * 通过用户id查询所有消息
     *
     * @param userId   用户ID
     * @param receiver 接受端标识符  2,用户端  3,商家断
     * @return
     */
    List<MessageVO> getMsgList(Long userId, Integer receiver);

    /**
     * 通过用户ID 统计用户未读消息条数
     *
     * @param userId   用户ID
     * @param receiver 接收端标识符  2,用户端  3,商家断
     * @return
     */
    Long countUnreadMsg(Long userId, Integer receiver);
}
