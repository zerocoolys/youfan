package com.youfan.data.dao.server.impl;

import java.util.List;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.WriteResult;
import com.youfan.commons.vo.server.CouponsVO;
import com.youfan.data.dao.server.CouponsDAO;
import com.youfan.data.models.CouponsEntity;

@Repository("couponsDAO")
public class CouponsDAOImpl implements CouponsDAO{

	@Override
	public CouponsVO findOne(String id) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
    public void insert(CouponsVO couponsVO) {
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
		// TODO Auto-generated method stub
		return CouponsEntity.class;
	}

	@Override
	public Class<CouponsVO> getVOClass() {
		// TODO Auto-generated method stub
		return CouponsVO.class;
	}

	

}
