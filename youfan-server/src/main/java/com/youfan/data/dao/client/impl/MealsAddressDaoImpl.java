package com.youfan.data.dao.client.impl;

import com.youfan.commons.vo.client.MealsAddressVO;
import com.youfan.data.dao.client.MealsAddressDao;
import com.youfan.data.models.MealsAddressEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by icepros on 15-9-16.
 */
@Repository("maDAO")
public class MealsAddressDaoImpl implements MealsAddressDao {

    @Override
    public void update(MealsAddressVO mealsAddressVO) {

    }

    @Override
    public void insert(MealsAddressVO mealsAddressVO) {
        MealsAddressEntity entity = convertToEntity(mealsAddressVO);
        mongoTemplate.insert(entity, COLLECTION_CLIENT_MEALS_ADDRESS);
    }

    @Override
    public List<MealsAddressVO> findByUid(String uid) {
        List<MealsAddressVO> list = mongoTemplate.find(queryByUid(uid), getVOClass(), COLLECTION_CLIENT_MEALS_ADDRESS);
        return list;
    }


    @Override
    public void update(String id, MealsAddressVO mealsAddressVO) {
        Update update = new Update();
        update.set("tel", mealsAddressVO.getTel());
        update.set("contact", mealsAddressVO.getContact());
        update.set("address", mealsAddressVO.getAddress());
        update.set("houseNumber", mealsAddressVO.getHouseNumber());
        update.set("label", mealsAddressVO.getLabel());

        convertToVO(mongoTemplate.findAndModify(queryById(id), update, getEntityClass(), COLLECTION_CLIENT_MEALS_ADDRESS));
    }

    @Override
    public void delete(String id, String dataStatus) {
        Update update = new Update();
        update.set("dataStatus", dataStatus);

        convertToVO(mongoTemplate.findAndModify(queryById(id), update, getEntityClass(), COLLECTION_CLIENT_MEALS_ADDRESS));
    }
}
