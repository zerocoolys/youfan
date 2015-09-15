package com.youfan.data.dao.server;

import com.youfan.commons.vo.server.CouponVO;
import com.youfan.data.dao.NewMongoBaseDAO;
import com.youfan.data.models.CouponEntity;

/**
 * 
 * @title CouponDAO.java
 * @package com.youfan.data.dao.server
 * @description 优惠券DAO层接口
 * @author QinghaiDeng   
 * @update 2015年9月14日 上午11:27:44
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public interface CouponDAO extends  NewMongoBaseDAO<CouponEntity, CouponVO, String>{

	
	@Override
    default Class<CouponEntity> getEntityClass() {
        return CouponEntity.class;
    }

    @Override
    default Class<CouponVO> getVOClass() {
        return CouponVO.class;
    }
}
