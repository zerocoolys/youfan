package com.youfan.data.dao.impl;

import com.youfan.data.dao.MenuDAO;
import com.youfan.data.models.MenuEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
@Repository("menuDAO")
public class MenuDAOImpl implements MenuDAO {

    private final ReentrantLock lock = new ReentrantLock();


    @Override
    public List<MenuEntity> list(Long sellerId) {
        Query query = Query.query(Criteria.where(SELLER_ID).is(sellerId).and(DATA_STATUS).is(1));
//        List<MenuEntity> list = mongoTemplate.find(buildQuery(sellerId, null, true), getEntityClass(), COLLECTION_MENU);
        List<MenuEntity> list = mongoTemplate.find(query, getEntityClass(), COLLECTION_MENU);

        if (list == null || list.isEmpty())
            return Collections.emptyList();

        return list;
    }

    @Override
    public List<MenuEntity> list() {
        return Collections.emptyList();
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
    public MenuEntity update(MenuEntity menu) {
        return null;
    }

    @Override
    public void delete(MenuEntity menuEntity) {
        Query query = buildQuery(menuEntity.getSellerId(), menuEntity.getMenuId(), true);
        mongoTemplate.updateFirst(query, Update.update(DATA_STATUS, 0), getEntityClass());
    }

    @Override
    public Class<MenuEntity> getEntityClass() {
        return MenuEntity.class;
    }

    @Override
    public int minusRestNum(Long sellerId, Long menuId) {
        lock.lock();
        int restNum;

        try {
            Query query = buildQuery(sellerId, menuId, true);

            restNum = mongoTemplate.findOne(
                    query,
                    getEntityClass(),
                    COLLECTION_MENU).getRestNum() - 1;

            mongoTemplate.updateFirst(query, Update.update(REST_NUM, restNum), getEntityClass());
        } finally {
            lock.unlock();
        }

        return restNum;
    }

    @Override
    public int plusTasteNum(Long sellerId, Long menuId) {
        lock.lock();
        int tasteNum;

        try {
            Query query = buildQuery(sellerId, menuId, true);

            tasteNum = mongoTemplate.findOne(
                    query,
                    getEntityClass(),
                    COLLECTION_MENU).getTasteNum() + 1;

            mongoTemplate.updateFirst(query, Update.update(TASTE_NUM, tasteNum), getEntityClass());
        } finally {
            lock.unlock();
        }


        return tasteNum;
    }

    @Override
    public void resetRestNum(Long sellerId, int restNum) {
        mongoTemplate.updateMulti(
                buildQuery(sellerId, null, true),
                Update.update(REST_NUM, restNum),
                getEntityClass());
    }

    @Override
    public void resetRestNum(Long sellerId, int restNum, Long menuId) {
        mongoTemplate.updateFirst(
                buildQuery(sellerId, menuId, true),
                Update.update(REST_NUM, restNum),
                getEntityClass());
    }
}
