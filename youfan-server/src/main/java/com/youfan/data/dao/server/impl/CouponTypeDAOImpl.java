package com.youfan.data.dao.server.impl;

import org.springframework.stereotype.Repository;

import com.youfan.commons.vo.server.CouponTypeVO;
import com.youfan.data.dao.impl.MongoBaseDAOImpl;
import com.youfan.data.dao.server.CouponTypeDAO;
import com.youfan.data.models.CouponTypeEntity;

@Repository("couponsTypeDAO")
public class CouponTypeDAOImpl extends MongoBaseDAOImpl<CouponTypeEntity, CouponTypeVO, String>implements CouponTypeDAO{


	@Override
	public Class<CouponTypeEntity> getEntityClass() {
		// TODO Auto-generated method stub
		return CouponTypeEntity.class;
	}

	@Override
	public Class<CouponTypeVO> getVOClass() {
		// TODO Auto-generated method stub
		return CouponTypeVO.class;
	}
//
//	@Override
//	public int updateById(String id, CouponsTypeVO vo) {
//		Update update;
//		try {
//			Map<String, Object> paramsMap = JSONUtils.obj2map(vo);
//			if(paramsMap==null||paramsMap.isEmpty()){
//				return 0;
//			}
//			update = buildUpdate(paramsMap);
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			update =  new Update();
//		}
//		WriteResult re = mongoTemplate.updateFirst(query(where("id").is(id)), update, getEntityClass());
//		System.out.println(re.toString());
//		return re.getN();
//	}

}
