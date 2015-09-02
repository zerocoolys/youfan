package com.youfan.data.dao.server;

import java.util.List;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.controllers.params.ActiveParams;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.ActiveEntity;

public interface ActiveDAO extends MongoBaseDAO<ActiveEntity, ActiveVO, String>{

	public void insert(CouponsTypeVO couponsTypeVO);
	
	@Override
    default Class<ActiveEntity> getEntityClass() {
        return ActiveEntity.class;
    }

    @Override
    default Class<ActiveVO> getVOClass() {
        return ActiveVO.class;
    }

	public Long count(ActiveParams activeParams);

	public List<ActiveVO> getByCondition(ActiveParams activeParams);

	public ActiveVO getByEvent(String event);
}
