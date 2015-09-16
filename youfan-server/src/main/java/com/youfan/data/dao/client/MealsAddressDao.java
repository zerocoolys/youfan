package com.youfan.data.dao.client;

import com.youfan.commons.vo.client.MealsAddressVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.MealsAddressEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

/**
 * Created by icepros on 15-9-16.
 */
public interface MealsAddressDao extends MongoBaseDAO<MealsAddressEntity, MealsAddressVO, String> {

    void insert(MealsAddressVO mealsAddressVO);

    List<MealsAddressVO> findByUid(String uid);

    default Class<MealsAddressEntity> getEntityClass() {
        return MealsAddressEntity.class;
    }
    default Class<MealsAddressVO> getVOClass() {
        return MealsAddressVO.class;
    }

    default Query queryByUid(String uid){
        Criteria criteria = Criteria.where("uid").is(uid);
        return Query.query(criteria);
    }
}
