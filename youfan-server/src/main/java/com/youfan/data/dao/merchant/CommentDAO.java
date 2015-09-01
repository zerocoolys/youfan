package com.youfan.data.dao.merchant;

import com.youfan.commons.vo.CommentVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.CommentEntity;
import redis.clients.jedis.Jedis;

import java.time.Instant;
import java.util.List;


/**
 * Created by xiaowei on 15-8-31.
 */
public interface CommentDAO extends MongoBaseDAO<CommentEntity, CommentVO, Long> {
    List<CommentVO> findComment();

    CommentVO findComment(String id);

    default long getGenerator(long no) {

        return Instant.now().getEpochSecond() + no;
    }

}
