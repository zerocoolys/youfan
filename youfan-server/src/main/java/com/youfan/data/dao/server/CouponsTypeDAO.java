package com.youfan.data.dao.server;

import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.CouponsTypeEntity;

public interface CouponsTypeDAO extends  MongoBaseDAO<CouponsTypeEntity, CouponsTypeVO, String>{

	@Override
    default Class<CouponsTypeEntity> getEntityClass() {
        return CouponsTypeEntity.class;
    }

    @Override
    default Class<CouponsTypeVO> getVOClass() {
        return CouponsTypeVO.class;
    }

//	public Long count(CouponsParams couponsParams);
//
//	public List<CouponsTypeVO> getByCondition(CouponsParams couponsParams);
//	
//	public int updateById(String id, Map<String, Object> updateMap);
//
//	public int updateById(String id, CouponsTypeVO vo);
}
