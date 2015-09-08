package com.youfan.data.dao.merchant;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.CommentVO;
import com.youfan.controllers.params.CommentParams;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.CommentEntity;
import redis.clients.jedis.Jedis;

import java.time.Instant;
import java.util.List;
import java.util.Map;


/**
 * Created by xiaowei on 15-8-31.
 */
public interface CommentDAO extends MongoBaseDAO<CommentEntity, CommentVO, Long> {
    List<CommentVO> findComment();

    CommentVO findComment(Integer orderId);

    CollectionVO<CommentVO> findPager(Pagination p);

    default long getGenerator(long no) {

        return Instant.now().getEpochSecond() + no;
    }

	long count(Map<String, Object> paramMap);
	
	List<CommentVO> getComments(Pagination pager);
	
	int updateStatus(String id,Integer status);

}
