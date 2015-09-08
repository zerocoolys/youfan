package com.youfan.services.merchant;

import java.util.List;
import java.util.Map;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.CommentVO;

/**
 * Created by xiaowei on 15-8-31.
 */
public interface CommentService {
    Integer createCm(CommentVO cm);

    List<CommentVO> findComment();

    CommentVO findCommentById(Integer orderId);

    CollectionVO<CommentVO> findCommentByPager(Pagination p);

	long count(Map<String,Object> paramMap);
	public List<CommentVO> getPagerByCondition(Pagination pager);
	
	int deleteById(String id);
}
