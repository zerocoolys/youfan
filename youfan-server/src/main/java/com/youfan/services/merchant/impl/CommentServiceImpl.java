package com.youfan.services.merchant.impl;

import com.youfan.commons.vo.CommentVO;
import com.youfan.data.dao.merchant.CommentDAO;
import com.youfan.services.merchant.CommentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

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
}
