package com.youfan.services.merchant;

import com.youfan.commons.Pager;
import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CommentVO;

import java.util.List;
import java.util.Map;

/**
 * Created by xiaowei on 15-8-31.
 */
public interface CommentService {
    Integer createCm(CommentVO cm);

    List<CommentVO> findComment();

    CommentVO findCommentById(Integer orderId);

    Pager findCommentByPager(Pagination p);
}
