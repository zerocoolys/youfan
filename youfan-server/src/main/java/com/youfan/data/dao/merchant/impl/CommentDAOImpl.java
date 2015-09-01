package com.youfan.data.dao.merchant.impl;

import com.youfan.commons.Constants;
import com.youfan.commons.vo.CommentVO;
import com.youfan.data.dao.merchant.CommentDAO;
import com.youfan.data.models.CommentEntity;
import com.youfan.data.support.IdGenerator;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by xiaowei on 15-8-31.
 */
@Repository("commentDAO")
public class CommentDAOImpl implements CommentDAO {

    @Resource
    private IdGenerator idGenerator;

    @Override
    public CommentVO findOne(Long aLong) {
        return null;
    }

    @Override
    public void insert(CommentVO commentVO) {
        long no = idGenerator.next(Constants.COLLECTION_COMMENT);
        commentVO.setCoId(no);
        mongoTemplate.insert(convertToEntity(commentVO));
    }

    @Override
    public void delete(Long aLong) {

    }

    @Override
    public void update(CommentVO commentVO) {

    }

    @Override
    public Class<CommentEntity> getEntityClass() {
        return CommentEntity.class;
    }

    @Override
    public Class<CommentVO> getVOClass() {
        return CommentVO.class;
    }
}
