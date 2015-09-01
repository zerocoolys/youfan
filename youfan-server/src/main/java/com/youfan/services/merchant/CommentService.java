package com.youfan.services.merchant;

import com.youfan.commons.vo.CommentVO;

import java.util.List;

/**
 * Created by xiaowei on 15-8-31.
 */
public interface CommentService {
    Integer createCm(CommentVO cm);

    List<CommentVO> findComment();

    CommentVO findCommentById(String id);
}
