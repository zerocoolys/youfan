package com.youfan.data.dao.client.impl;

import com.mongodb.WriteResult;
import com.youfan.commons.vo.CouponsVO;
import com.youfan.data.dao.client.CouponDao;
import com.youfan.data.models.CouponsEntity;
import com.youfan.data.support.IdGenerator;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by subdong on 15-8-31.
 */
@Repository("couponDao")
public class CouponDaoImpl implements CouponDao {

    @Resource
    private IdGenerator idGenerator;

    @Override
    public CouponsVO findOne(String s) {

        return null;
    }

    @Override
    public void insert(CouponsVO couponsVO) {
        couponsVO.setDataStatus(1);
        mongoTemplate.insert(convertToEntity(couponsVO));
    }

    @Override
    public void delete(String s) {
        Query query = Query.query(Criteria.where(CONPONS_ID).is(s).and(CONPONS_DATASTATUS).is(1));
        Update update = new Update();
        update.set(CONPONS_DATASTATUS, 0);
        mongoTemplate.updateFirst(query, update, getEntityClass());
    }

    @Override
    public void update(CouponsVO couponsVO) {
        Query  query = Query.query(Criteria.where(CONPONS_ID).is(couponsVO.getId()).and(CONPONS_DATASTATUS).is(1));
        Update update = new Update();
        update.set(COUPONS_STATUS,couponsVO.getStatus());
        mongoTemplate.updateFirst(query, update,getEntityClass());
    }


    @Override
    public List<CouponsVO> findUserId(Long userId) {
        Query query = Query.query(Criteria.where(CONPONS_USERID).is(userId).and(CONPONS_DATASTATUS).is(1));
        List<CouponsEntity> entities = mongoTemplate.find(query, getEntityClass());
        return convertToVOList(entities);
    }

    @Override
    public boolean updateStatus(Long couponsid) {
        Query query = Query.query(Criteria.where(CONPONS_ID).is(couponsid).and(CONPONS_DATASTATUS).is(1));
        Update update = new Update();
        update.set(CONPONS_STATUS,1);
        WriteResult result = mongoTemplate.updateFirst(query, update, getEntityClass());
        return result.isUpdateOfExisting();
    }


    @Override
    public Class<CouponsEntity> getEntityClass() {
        return CouponsEntity.class;
    }

    @Override
    public Class<CouponsVO> getVOClass() {
        return CouponsVO.class;
    }


}
