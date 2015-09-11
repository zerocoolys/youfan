package com.youfan.data.dao.server;

import com.youfan.commons.vo.server.PayWayVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.dao.NewMongoBaseDAO;
import com.youfan.data.models.PayWayEntity;

/**
 * 
 * @title PayWayDAO.java
 * @package com.youfan.data.dao.server
 * @description TODO
 * @author QinghaiDeng   
 * @update 2015年9月6日 上午10:58:11
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public interface PayWayDAO  extends NewMongoBaseDAO<PayWayEntity, PayWayVO, String>{

	@Override
    default Class<PayWayEntity> getEntityClass() {
        return PayWayEntity.class;
    }

    @Override
    default Class<PayWayVO> getVOClass() {
        return PayWayVO.class;
    }
}
