package com.youfan.services.menus;

import com.youfan.controllers.objs.MessageVO;
import com.youfan.data.models.MessageEntity;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public interface MessageService {

    public MessageEntity findOne(Query query);

    /**
     * 更新消息查看状态
     *
     * @param id     数据ID
     * @param status 数据查看状态
     * @return
     */
    boolean updateMsg(String id, int status);

    public List<MessageEntity> find(Query query);

    public MessageEntity findById(String id);

    public void insert(MessageEntity message);

    public long count(Query query);

    /**
     * 通过用户id查询所有消息
     *
     * @param userId   用户ID
     * @param receiver 接收端标识符  2,用户端  3,商家断
     * @return
     */
    List<MessageVO> findMsgList(Long userId, Integer receiver);

    /**
     * 通过用户ID 统计用户未读消息条数
     *
     * @param userId   用户ID
     * @param receiver 接收端标识符  2,用户端  3,商家断
     * @return
     */
    Long countUnreadMsg(Long userId, Integer receiver);

}
