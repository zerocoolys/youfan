package com.youfan.data.dao.merchant;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.youfan.commons.vo.merchant.CardVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.CardEntity;

public interface CardDAO extends MongoBaseDAO<CardEntity, CardVO, String> {

    List<CardVO> findBySellerId(String sellerId);

    void update(CardVO card, Map<String, Object> map);

    @Override
    default Class<CardEntity> getEntityClass() {
        return CardEntity.class;
    }

    @Override
    default Class<CardVO> getVOClass() {
        return CardVO.class;
    }

    default Update buildUpdate(Map<String, Object> map) {
        Update update = Update.update("u_date", new Date());
        for (String key : map.keySet()) {
            update.set(key, map.get(key));
        }
        return update;
    }

    default Query buildQuery(String sellerId, boolean isValid) {
        Criteria criteria = Criteria.where(DATA_STATUS).is(isValid ? 1 : 0);

        if (sellerId != null) {
            criteria.and(SELLER_ID).is(sellerId);
        }

        return Query.query(criteria);
    }

    default Query buildQuery(String id) {
        Criteria criteria = new Criteria();

        if (id != null) {
            criteria.and(MONGO_ID).is(id);
        }

        return Query.query(criteria);
    }

}
