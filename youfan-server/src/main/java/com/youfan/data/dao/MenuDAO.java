package com.youfan.data.dao;

import com.youfan.controllers.objs.Menu;
import com.youfan.data.models.MenuEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MenuDAO extends MongoBaseDAO<MenuEntity, Menu, Long> {

    List<Menu> findBySellerId(Long sellerId);

    int minusRestNum(Long menuId);

    int plusTasteNum(Long menuId);

    void resetRestNumBySellerId(Long sellerId, int restNum);

    void resetRestNumByMenuId(Long menuId, int restNum);

    List<Menu> findBySellerIdAndType(Long sellerId, String type);


    @Override
    default Class<MenuEntity> getEntityClass() {
        return MenuEntity.class;
    }

    @Override
    default Class<Menu> getVOClass() {
        return Menu.class;
    }

    default Query buildQuery(Long sellerId, Long menuId, boolean isValid) {
        Criteria criteria = Criteria.where(DATA_STATUS).is(isValid ? 1 : 0).and(IS_SALE).is(true);

        if (sellerId != null)
            criteria.and(SELLER_ID).is(sellerId);
        else if (menuId != null)
            criteria.and(MENU_ID).is(menuId);

        return Query.query(criteria);
    }

    default Query buildMerchantQuery(Long sellerId, String type, boolean isValid) {
        Criteria criteria = Criteria.where(DATA_STATUS).is(isValid ? 1 : 0);

        if (sellerId != null) {
            criteria.and(SELLER_ID).is(sellerId);
        }

        if (type != null) {
            criteria.and(TYPE).is(type);
        }

        return Query.query(criteria);
    }

}
