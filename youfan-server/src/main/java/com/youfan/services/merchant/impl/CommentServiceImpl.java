package com.youfan.services.merchant.impl;

import com.youfan.commons.Pager;
import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CommentVO;
import com.youfan.data.dao.merchant.CommentDAO;
import com.youfan.services.merchant.CommentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by xiaowei on 15-8-31.
 */
@Service
public class CommentServiceImpl implements CommentService {

    @Resource
    private CommentDAO commentDAO;

    @Override
    public Integer createCm(CommentVO cm) {
        try {
            commentDAO.insert(cm);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public List<CommentVO> findComment() {
        return commentDAO.findComment();
    }

    @Override
    public CommentVO findCommentById(Integer orderId) {
        return commentDAO.findComment(orderId);
    }

    @Override
    public Pager findCommentByPager(Pagination p) {
        return commentDAO.findPager(p);
    }
}
