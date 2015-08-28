package com.youfan.services.client;

import com.youfan.commons.vo.MessageVO;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public interface MessageService {

    MessageVO findOne(Query query);

    /**
     * 更新消息查看状态
     *
     * @param id     数据ID
     * @param status 数据查看状态
     * @return
     */
    boolean updateMsg(String id, int status);

    List<MessageVO> find(Query query);

    MessageVO findById(String id);

    void insert(MessageVO message);

    long count(Query query);

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
