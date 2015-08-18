package com.youfan.data.dao.impl;

import com.youfan.data.dao.MenuDAO;
import com.youfan.data.models.MenuEntity;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
@Repository("menuDAO")
public class MenuDAOImpl implements MenuDAO {

    @Override
    public List<MenuEntity> list(Long sellerId) {
        return mongoTemplate.find(
                buildQuery(sellerId, null, true),
                getEntityClass(),
                COLLECTION_MENU);
    }

    @Override
    public List<MenuEntity> findAll() {
        return Collections.emptyList();
    }

    @Override
    public MenuEntity findOne(Long menuId) {
        return mongoTemplate.findOne(
                buildQuery(null, menuId, true),
                getEntityClass(),
                COLLECTION_MENU);
    }

    @Override
    public void insert(MenuEntity menu) {
        mongoTemplate.insert(menu);
    }

    @Override
    public void insert(List<MenuEntity> menuEntities) {
        mongoTemplate.insert(menuEntities, COLLECTION_MENU);
    }

    @Override
    public void update(MenuEntity menu) {

    }

    @Override
    public void delete(Long menuId) {
        Query query = buildQuery(null, menuId, true);
        mongoTemplate.updateFirst(query, Update.update(DATA_STATUS, 0), getEntityClass());
    }

    @Override
    public Class<MenuEntity> getEntityClass() {
        return MenuEntity.class;
    }

    @Override
    public int minusRestNum(Long menuId) {
        MenuEntity menuEntity = findOne(menuId);
        if (menuEntity == null || menuEntity.getRestNum() == 0)
            return -1;

        int restNum = menuEntity.getRestNum() - 1;
        mongoTemplate.updateFirst(
                buildQuery(null, menuId, true),
                Update.update(REST_NUM, restNum),
                getEntityClass());

        return restNum;
    }

    @Override
    public int plusTasteNum(Long menuId) {
        MenuEntity menuEntity = findOne(menuId);
        if (menuEntity == null)
            return -1;

        int tasteNum = menuEntity.getTasteNum() + 1;
        mongoTemplate.updateFirst(
                buildQuery(null, menuId, true),
                Update.update(TASTE_NUM, tasteNum),
                getEntityClass());

        return tasteNum;
    }

    @Override
    public void resetRestNumBySellerId(Long sellerId, int restNum) {
        mongoTemplate.updateMulti(
                buildQuery(sellerId, null, true),
                Update.update(REST_NUM, restNum),
                getEntityClass());
    }

    @Override
    public void resetRestNumByMenuId(Long menuId, int restNum) {
        mongoTemplate.updateFirst(
                buildQuery(null, menuId, true),
                Update.update(REST_NUM, restNum),
                getEntityClass());
    }
}
