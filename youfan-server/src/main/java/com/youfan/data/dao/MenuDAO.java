package com.youfan.data.dao;

import com.youfan.data.models.MenuEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MenuDAO extends MongoBaseDAO<MenuEntity, Long> {

    List<MenuEntity> list(Long sellerId);

    int minusRestNum(Long menuId);

    int plusTasteNum(Long menuId);

    void resetRestNumBySellerId(Long sellerId, int restNum);

    void resetRestNumByMenuId(Long menuId, int restNum);


    default Query buildQuery(Long sellerId, Long menuId, boolean isValid) {
        Criteria criteria = Criteria.where(DATA_STATUS).is(isValid ? 1 : 0);

        if (sellerId != null)
            criteria.and(SELLER_ID).is(sellerId);
        else if (menuId != null)
            criteria.and(MENU_ID).is(menuId);

        return Query.query(criteria);
    }

}
