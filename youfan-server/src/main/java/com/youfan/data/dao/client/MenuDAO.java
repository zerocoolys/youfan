package com.youfan.data.dao.client;

import com.youfan.commons.vo.MechantMenuVO;
import com.youfan.commons.vo.MenuVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.MenuEntity;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MenuDAO extends MongoBaseDAO<MenuEntity, MenuVO, Long> {

    List<MenuVO> findBySellerId(Long sellerId);

    List<MechantMenuVO> findByMenuIds(List<Long> menuIds);

    int minusRestNum(Long menuId);

    int plusTasteNum(Long menuId);

    void resetRestNumBySellerId(Long sellerId, int restNum);

    void resetRestNumByMenuId(Long menuId, int restNum);

    List<MenuVO> findBySellerIdAndType(Long sellerId, String type);

    MenuVO findOne(Query query);

    void update(MenuVO menu, Map<String, Object> map);

    @Override
    default Class<MenuEntity> getEntityClass() {
        return MenuEntity.class;
    }

    @Override
    default Class<MenuVO> getVOClass() {
        return MenuVO.class;
    }

    default Query buildQuery(Long sellerId, Long menuId, boolean isValid) {
        Criteria criteria = Criteria.where(DATA_STATUS).is(isValid ? 1 : 0)
                .and(IS_SALE).is(true);

        if (sellerId != null)
            criteria.and(SELLER_ID).is(sellerId);
        else if (menuId != null)
            criteria.and(MENU_ID).is(menuId);

        return Query.query(criteria);
    }

    default Query buildQuery(List<Long> menuIds, boolean isValid) {
        Criteria criteria = Criteria.where(DATA_STATUS).is(isValid ? 1 : 0);

        if (menuIds != null && menuIds.size() > 0)
            criteria.and(MENU_ID).in(menuIds);

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

    default Update buildUpdate(Map<String, Object> map) {
        Update update = Update.update("u_date", new Date());
        for (String key : map.keySet()) {
            update.set(key, map.get(key));
        }
        return update;
    }

    int conversion(Long menuId, boolean sale);

    void conversionStock(List<MenuVO> menus);

    void conversionRestNum(List<MenuVO> menus);

    MenuVO findByMenuId(long menuId);

}
