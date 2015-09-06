package com.youfan.data.dao.merchant.impl;

import java.util.List;
import java.util.Map;

import com.youfan.commons.Pager;
import com.youfan.commons.Pagination;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.youfan.commons.vo.merchant.CardVO;
import com.youfan.data.dao.merchant.CardDAO;

@Repository("cardDAO")
public class CardDAOImpl implements CardDAO {

    @Override
    public List<CardVO> findBySellerId(String sellerId) {
        return convertToVOList(mongoTemplate.find(buildQuery(sellerId, true),
                getEntityClass(), COLLECTION_CARD));
    }

    @Override
    public CardVO findOne(String id) {
        return convertToVO(mongoTemplate.findOne(buildQuery(id),
                getEntityClass(), COLLECTION_CARD));
    }

    @Override
    public void insert(CardVO card) {
        mongoTemplate.insert(convertToEntity(card));
    }

    @Override
    public void delete(String id) {
        // TODO Auto-generated method stub

    }

    @Override
    public void update(CardVO t) {
        // TODO Auto-generated method stub

    }

    @Override
    public Pager findPager(Pagination p) {
        return null;
    }

    @Override
    public void update(CardVO card, Map<String, Object> map) {
        Criteria criteria = Criteria.where(DATA_STATUS).is(1).and(MONGO_ID)
                .is(card.getId());
        mongoTemplate.updateFirst(Query.query(criteria), buildUpdate(map),
                getEntityClass());
    }

}
