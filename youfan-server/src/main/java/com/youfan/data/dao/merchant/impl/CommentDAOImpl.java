package com.youfan.data.dao.merchant.impl;

import com.youfan.commons.Constants;
import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.CommentVO;
import com.youfan.data.dao.merchant.CommentDAO;
import com.youfan.data.models.CommentEntity;
import com.youfan.data.support.IdGenerator;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

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
        commentVO.setCommentTime(new Date());
        mongoTemplate.insert(convertToEntity(commentVO));
    }

    @Override
    public void delete(Long aLong) {

    }

    @Override
    public void update(CommentVO commentVO) {

    }

    @Override
    public CollectionVO<CommentVO> findPager(Pagination p) {
        Query query = new Query();
        Criteria c = Criteria.where(Constants.DATA_STATUS).is(0);
        if (p.getParams() != null && p.getParams().size() > 0) {
            p.getParams().forEach((k, v) -> c.and(k).is(v));
        }
        query.addCriteria(c);
        long totalCount = this.mongoTemplate.count(query, this.getEntityClass());
        query.skip((p.getPageNo() - 1) * p.getPageSize());
        query.limit(p.getPageSize());
        if (!p.getAsc().equals("") && p.getSortBy() != null) {
            Sort sort = new Sort(new Sort.Order(p.getAsc().equals("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC, p.getSortBy()));
            query.with(sort);
        }
        List<CommentEntity> entities = this.mongoTemplate.find(query, getEntityClass());
        List<CommentVO> rows = convertToVOList(entities);
        CollectionVO<CommentVO> collectionVO = new CollectionVO<>(rows, (int) totalCount, p.getPageSize());
        return collectionVO;
    }

    @Override
    public Class<CommentEntity> getEntityClass() {
        return CommentEntity.class;
    }

    @Override
    public Class<CommentVO> getVOClass() {
        return CommentVO.class;
    }

    @Override
    public List<CommentVO> findComment() {
        List<CommentEntity> resultList = mongoTemplate.findAll(getEntityClass());
        return convertToVOList(resultList);
    }

    @Override
    public CommentVO findComment(Integer orderId) {
//        CommentEntity ce = mongoTemplate.findOne(new Query().addCriteria(Criteria.where(Constants.FIELD_ID).is(orderId)), getEntityClass());
//        if(ce!=null)
//        return convertToVO(ce);

        return null;
    }
}
