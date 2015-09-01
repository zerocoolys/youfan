package com.youfan.data.dao.server;

import com.mongodb.WriteResult;
import com.youfan.commons.vo.client.MessageVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.MessageEntity;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

/**
 * @author ZhangHuaRong
 * @update 2015年8月26日 下午2:46:21
 */
public interface MessageDAO extends MongoBaseDAO<MessageEntity, MessageVO, String> {


    /**
     * 根据数据ID修改消息查看状态
     *
     * @param message
     */
    boolean updateMsg(MessageVO message);


    MessageVO findById(String id);


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


    @Override
    default Class<MessageEntity> getEntityClass() {
        return MessageEntity.class;
    }

    @Override
    default Class<MessageVO> getVOClass() {
        return MessageVO.class;
    }
}
