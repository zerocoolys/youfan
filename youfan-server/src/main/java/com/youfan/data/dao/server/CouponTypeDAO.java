package com.youfan.data.dao.server;

import com.youfan.commons.vo.server.CouponTypeVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.CouponTypeEntity;

import java.util.List;

/**
 * 
 * @title CouponTypeDAO.java
 * @package com.youfan.data.dao.server
 * @description 优惠券类型DAO层接口
 * @author QinghaiDeng   
 * @update 2015年9月14日 上午11:27:28
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public interface CouponTypeDAO extends  MongoBaseDAO<CouponTypeEntity, CouponTypeVO, String>{

	public void insert(CouponTypeVO couponsTypeVO);

    CouponTypeVO findById(String couponTypeId);

	@Override
    default Class<CouponTypeEntity> getEntityClass() {
        return CouponTypeEntity.class;
    }

    @Override
    default Class<CouponTypeVO> getVOClass() {
        return CouponTypeVO.class;
    }

}
