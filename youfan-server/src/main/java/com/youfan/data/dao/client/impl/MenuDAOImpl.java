package com.youfan.data.dao.client.impl;

import com.youfan.commons.vo.MechantMenuVO;
import com.youfan.commons.vo.client.MenuVO;
import com.youfan.data.dao.client.MenuDAO;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
@Repository("menuDAO")
public class MenuDAOImpl implements MenuDAO {

    @Override
    public List<MenuVO> findBySellerId(String sellerId) {
        return convertToVOList(mongoTemplate.find(
                buildQuery(sellerId, null, true), getEntityClass(),
                COLLECTION_MENU));
    }

    @Override
    public List<MenuVO> findBySellerIdAndType(String sellerId, String type) {
        return convertToVOList(mongoTemplate.find(
                buildMerchantQuery(sellerId, type, true), getEntityClass(),
                COLLECTION_MENU));
    }

    @Override
    public MenuVO findOne(String menuId) {
        return convertToVO(mongoTemplate.findOne(
                buildQuery(null, menuId, true), getEntityClass(),
                COLLECTION_MENU));
    }

    @Override
    public void insert(MenuVO menu) {
        if (mongoTemplate.findOne(
                Query.query(Criteria.where(SELLER_ID).is(menu.getSellerId()).and(NAME).is(menu.getName())),
                getEntityClass(), COLLECTION_MENU) == null) {
            mongoTemplate.insert(convertToEntity(menu));
        }
    }

    @Override
    public void update(MenuVO menu) {

    }

    @Override
    public void update(MenuVO menu, Map<String, Object> map) {
        Criteria criteria = Criteria.where(DATA_STATUS).is(1).and(MENU_ID).is(menu.getMenuId());
        mongoTemplate.updateFirst(Query.query(criteria), buildUpdate(map), getEntityClass());

    }

    @Override
    public void delete(String menuId) {
        Criteria criteria = Criteria.where(DATA_STATUS).is(1).and(MENU_ID).is(menuId);
        mongoTemplate.updateFirst(Query.query(criteria), Update.update(DATA_STATUS, 0), getEntityClass());
    }

    @Override
    public int minusRestNum(String menuId) {
        MenuVO menu = findOne(menuId);
        if (menu == null || menu.getRestNum() == 0)
            return -1;

        int restNum = menu.getRestNum() - 1;
        mongoTemplate.updateFirst(buildQuery(null, menuId, true),
                Update.update(REST_NUM, restNum), getEntityClass());

        return restNum;
    }

    @Override
    public int plusTasteNum(String menuId) {
        MenuVO menu = findOne(menuId);
        if (menu == null)
            return -1;

        int tasteNum = menu.getTasteNum() + 1;
        mongoTemplate.updateFirst(buildQuery(null, menuId, true),
                Update.update(TASTE_NUM, tasteNum), getEntityClass());

        return tasteNum;
    }

    @Override
    public int conversion(String menuId, boolean sale) {
        Criteria criteria = Criteria.where(DATA_STATUS).is(1).and(MENU_ID)
                .is(menuId);
        MenuVO menu = findOne(Query.query(criteria));
        if (menu == null)
            return -1;

        return mongoTemplate.updateFirst(Query.query(criteria),
                Update.update(SALE, sale), getEntityClass()).getN();
    }

    @Override
    public void resetRestNumBySellerId(String sellerId, int restNum) {
        mongoTemplate.updateMulti(buildQuery(sellerId, null, true),
                Update.update(REST_NUM, restNum), getEntityClass());
    }

    @Override
    public void resetRestNumByMenuId(String menuId, int restNum) {
        mongoTemplate.updateFirst(buildQuery(null, menuId, true),
                Update.update(REST_NUM, restNum), getEntityClass());
    }

    @Override
    public MenuVO findOne(Query query) {
        return convertToVO(mongoTemplate.findOne(query, getEntityClass(),
                COLLECTION_MENU));
    }

    @Override
    public void conversionStock(List<MenuVO> menus) {
        for (int i = 0, l = menus.size(); i < l; i++) {
            Criteria criteria = Criteria.where(DATA_STATUS).is(1).and(MENU_ID)
                    .is(menus.get(i).getMenuId());
            MenuVO menu = findOne(Query.query(criteria));
            if (menu != null) {
                mongoTemplate.updateFirst(Query.query(criteria),
                        Update.update(STOCK, menus.get(i).getStock()),
                        getEntityClass());
            }

        }
    }

    @Override
    public void conversionRestNum(List<MenuVO> menus) {
        for (int i = 0, l = menus.size(); i < l; i++) {
            Criteria criteria = Criteria.where(DATA_STATUS).is(1).and(MENU_ID)
                    .is(menus.get(i).getMenuId());
            MenuVO menu = findOne(Query.query(criteria));
            if (menu != null) {
                mongoTemplate.updateFirst(Query.query(criteria),
                        Update.update(REST_NUM, menus.get(i).getRestNum()),
                        getEntityClass());
            }

        }
    }

    @Override
    public List<MechantMenuVO> findByMenuIds(List<String> menuIds) {

        List<MechantMenuVO> list = mongoTemplate.find(buildQuery(menuIds, true),
                MechantMenuVO.class, COLLECTION_MENU);

        return list;
    }

}
