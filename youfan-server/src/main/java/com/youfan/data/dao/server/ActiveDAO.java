package com.youfan.data.dao.server;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.ActiveEntity;

public interface ActiveDAO extends MongoBaseDAO<ActiveEntity, ActiveVO, String>{

	@Override
    default Class<ActiveEntity> getEntityClass() {
        return ActiveEntity.class;
    }

    @Override
    default Class<ActiveVO> getVOClass() {
        return ActiveVO.class;
    }

}
