package com.youfan.data.dao;

import com.youfan.data.models.MenuEntity;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MenuDAO extends MongoBaseDAO<MenuEntity> {

    List<MenuEntity> list(Long sellerId);

    int minusRestNum(Long sellerId, Long menuId);

    int plusTasteNum(Long sellerId, Long menuId);

    void resetRestNum(Long sellerId, int restNum);

    void resetRestNum(Long sellerId, int restNum, Long menuId);


    default Query buildQuery(Long sellerId, Long menuId, Boolean isValid) {
        Query query = new BasicQuery("{}", "{}");
        Criteria criteria = Criteria.where("_id").not().and(DATA_STATUS).is(isValid ? 1 : 0);

        if (sellerId != null)
            criteria.and(SELLER_ID).is(sellerId);
        else if (menuId != null)
            criteria.and(MENU_ID).is(menuId);

        query.addCriteria(criteria);

        return query;
    }

}
