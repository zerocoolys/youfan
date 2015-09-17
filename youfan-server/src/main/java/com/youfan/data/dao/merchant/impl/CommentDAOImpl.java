package com.youfan.data.dao.merchant.impl;

import com.mongodb.WriteResult;
import com.youfan.commons.Constants;
import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.CommentVO;
import com.youfan.controllers.params.CommentParams;
import com.youfan.controllers.params.MongoParams;
import com.youfan.data.dao.merchant.CommentDAO;
import com.youfan.data.models.CommentEntity;
import com.youfan.data.support.IdGenerator;

import org.apache.ibatis.scripting.xmltags.WhereSqlNode;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Date;
import java.util.List;
import java.util.Map;

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

    //    @Override
    public CollectionVO<CommentVO> findPager(Pagination p) {
        Query query = new Query();
        Criteria c = Criteria.where(Constants.DATA_STATUS).is(1);
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
    public long commentCount(String sellerId) {
        Query q = new Query();
        q.addCriteria(Criteria.where(DATA_STATUS).is(1).and(Constants.COMMENT_MERCHANT_ID).is(sellerId));
        long count = mongoTemplate.count(q, getEntityClass());
        return count;
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
    public CommentVO findComment(long orderId) {
//        CommentEntity ce = mongoTemplate.findOne(new Query().addCriteria(Criteria.where(Constants.FIELD_ID).is(orderId)), getEntityClass());
//        if(ce!=null)
//        return convertToVO(ce);

        return null;
    }


    @Override
    public List<CommentVO> getComments(Pagination pager) {
        Query query = buildAndEqualQuery(pager.getParams());
        query.addCriteria(where("dataStatus").ne(-1));
        // TODO 组合查询条件
        query.skip((pager.getPageNo() - 1) * pager.getPageSize());
        query.limit(pager.getPageSize());
//        if (pager.getAsc() != null && !pager.getAsc().equals("")&& pager.getSortBy() != null) {
//            Sort sort = new Sort(new Sort.Order(pager.getAsc().equals("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC, pager.getSortBy()));
//            query.with(sort);
//        }
        System.out.println(query);
        return convertToVOList(mongoTemplate.find(query, getEntityClass()));
    }

    @Override
    public long count(Map<String, Object> paramMap) {
        Query query = buildAndEqualQuery(paramMap);
        query.addCriteria(where("dataStatus").ne(-1));
        return mongoTemplate.count(query, this.getEntityClass());
    }

    @Override
    public int updateStatus(String id, Integer status) {
        Update update = new Update();
        update.set("dataStatus", -1);
        WriteResult res = mongoTemplate.updateFirst(query(where("id").is(id)), update, getEntityClass());
        return res.getN();

    }

    @Override
    public int update(String cid, String content) {
        Update update = new Update();
        update.set(COMMENT_REPLAY_COMMENT, content);
        update.set("replayed", true);
        update.set(COMMENT_REPLAY_DATE, new Date());
        WriteResult res = mongoTemplate.updateFirst(query(where(ID).is(cid)), update, getEntityClass());
        return res.getN();
    }

}
