package com.youfan.data.dao.server;

import com.youfan.commons.vo.server.CouponTypeVO;
import com.youfan.data.dao.NewMongoBaseDAO;
import com.youfan.data.models.CouponTypeEntity;

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
public interface CouponTypeDAO extends  NewMongoBaseDAO<CouponTypeEntity, CouponTypeVO, String>{

	public void insert(CouponTypeVO couponsTypeVO);
	
	@Override
    default Class<CouponTypeEntity> getEntityClass() {
        return CouponTypeEntity.class;
    }

    @Override
    default Class<CouponTypeVO> getVOClass() {
        return CouponTypeVO.class;
    }

//	public Long count(CouponsParams couponsParams);
//
//	public List<CouponsTypeVO> getByCondition(CouponsParams couponsParams);
//	
//	public int updateById(String id, Map<String, Object> updateMap);
//
//	public int updateById(String id, CouponsTypeVO vo);
}
