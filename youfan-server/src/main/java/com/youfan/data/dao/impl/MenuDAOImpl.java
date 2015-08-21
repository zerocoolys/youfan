package com.youfan.data.dao.impl;

import com.youfan.controllers.objs.Menu;
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
    public List<Menu> findBySellerId(Long sellerId) {
        return convertToVOList(mongoTemplate.find(
                buildQuery(sellerId, null, true),
                getEntityClass(),
                COLLECTION_MENU));
    }

    @Override
    public List<Menu> findAll() {
        return Collections.emptyList();
    }

    @Override
    public Menu findOne(Long menuId) {
        return convertToVO(mongoTemplate.findOne(
                buildQuery(null, menuId, true),
                getEntityClass(),
                COLLECTION_MENU));
    }

    @Override
    public void insert(Menu menu) {
        mongoTemplate.insert(convertToEntity(menu));
    }

    @Override
    public void insert(List<Menu> menus) {
        mongoTemplate.insert(convertToEntityList(menus), COLLECTION_MENU);
    }

    @Override
    public void update(Menu menu) {
        MenuEntity entity = convertToEntity(menu);
    }

    @Override
    public void delete(Long menuId) {
        Query query = buildQuery(null, menuId, true);
        mongoTemplate.updateFirst(query, Update.update(DATA_STATUS, 0), getEntityClass());
    }

    @Override
    public int minusRestNum(Long menuId) {
        Menu menu = findOne(menuId);
        if (menu == null || menu.getRestNum() == 0)
            return -1;

        int restNum = menu.getRestNum() - 1;
        mongoTemplate.updateFirst(
                buildQuery(null, menuId, true),
                Update.update(REST_NUM, restNum),
                getEntityClass());

        return restNum;
    }

    @Override
    public int plusTasteNum(Long menuId) {
        Menu menu = findOne(menuId);
        if (menu == null)
            return -1;

        int tasteNum = menu.getTasteNum() + 1;
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
