package com.youfan.data.dao.server;

import java.util.List;

import com.youfan.commons.vo.server.CouponsVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.CouponsEntity;

public interface CouponsDAO extends MongoBaseDAO<CouponsEntity, CouponsVO, String>{

	
	@Override
    default Class<CouponsEntity> getEntityClass() {
        return CouponsEntity.class;
    }

    @Override
    default Class<CouponsVO> getVOClass() {
        return CouponsVO.class;
    }

	List<CouponsVO> findUserId(Long userId);

	boolean updateStatus(Long couponsid);
}
