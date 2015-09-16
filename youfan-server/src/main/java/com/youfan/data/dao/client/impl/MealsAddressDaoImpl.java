package com.youfan.data.dao.client.impl;

import com.youfan.commons.vo.client.MealsAddressVO;
import com.youfan.data.dao.client.MealsAddressDao;
import com.youfan.data.models.MealsAddressEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

/**
 * Created by icepros on 15-9-16.
 */
@Repository("maDAO")
public class MealsAddressDaoImpl implements MealsAddressDao {

    @Override
    public void insert(MealsAddressVO mealsAddressVO) {
        MealsAddressEntity entity = convertToEntity(mealsAddressVO);
        mongoTemplate.insert(entity, COLLECTION_CLIENT_MEALS_ADDRESS);
    }

    @Override
    public MealsAddressVO findByUid(String uid) {
        MealsAddressEntity maEntity = mongoTemplate.findOne(queryByUid(uid), getEntityClass(), COLLECTION_CLIENT_MEALS_ADDRESS);
        if (maEntity != null)
            return convertToVO(maEntity);

        return null;
    }



    @Override
    public void update(MealsAddressVO mealsAddressVO) {

    }
}
