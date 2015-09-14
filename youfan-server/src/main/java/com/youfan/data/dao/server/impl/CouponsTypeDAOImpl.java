package com.youfan.data.dao.server.impl;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Map;

import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.WriteResult;
import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.data.dao.impl.AbstractMongoDAO;
import com.youfan.data.dao.server.CouponsTypeDAO;
import com.youfan.data.models.CouponsTypeEntity;
import com.youfan.utils.JSONUtils;

@Repository("couponsTypeDAO")
public class CouponsTypeDAOImpl extends AbstractMongoDAO<CouponsTypeEntity, CouponsTypeVO, String> implements CouponsTypeDAO{


	@Override
	public Class<CouponsTypeEntity> getEntityClass() {
		// TODO Auto-generated method stub
		return CouponsTypeEntity.class;
	}

	@Override
	public Class<CouponsTypeVO> getVOClass() {
		// TODO Auto-generated method stub
		return CouponsTypeVO.class;
	}

	@Override
	public int updateById(String id, CouponsTypeVO vo) {
		Update update;
		try {
			Map<String, Object> paramsMap = JSONUtils.obj2map(vo);
			if(paramsMap==null||paramsMap.isEmpty()){
				return 0;
			}
			update = buildUpdate(paramsMap);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			update =  new Update();
		}
		WriteResult re = mongoTemplate.updateFirst(query(where("id").is(id)), update, getEntityClass());
		System.out.println(re.toString());
		return re.getN();
	}

}
