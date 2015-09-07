package com.youfan.data.dao.client.impl;

import com.youfan.commons.vo.client.UserVO;
import com.youfan.data.dao.client.UserDao;
import com.youfan.data.models.ClientUserEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

/**
 * Created by icepros on 15-8-25.
 */
@Repository("ucDAO")
public class UserDaoImpl implements UserDao {

	private static Logger logger = LoggerFactory.getLogger(UserDaoImpl.class);

	@Override
	public UserVO update(Query query,Update update) {
		return convertToVO(mongoTemplate.findAndModify(query, update, getEntityClass(), COLLECTION_CLIENT_USER));
	}

    @Override
    public UserVO findOne(String id) {
        return null;
    }

    @Override
    public void insert(UserVO userClientVO) {
        ClientUserEntity ucEntity = convertToEntity(userClientVO);
        mongoTemplate.insert(ucEntity, COLLECTION_CLIENT_USER);
    }

	@Override
	public void delete(String s) {

	}

	@Override
	public void update(UserVO userVO) {

	}


	@Override
	public UserVO getUserByTelAndPwd(String tel, String pwd) {

		return convertToVO(mongoTemplate.findOne(buildQuery(tel, pwd),
				getEntityClass(), COLLECTION_CLIENT_USER));
	}

	@Override
	public UserVO getUserByTel(String tel) {
		UserVO result = new UserVO();
		try {
			result = convertToVO(mongoTemplate.findOne(buildQueryByTel(tel), getEntityClass(), COLLECTION_CLIENT_USER));
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return  result;
	}

	@Override
	public UserVO findByid(String id) {

		UserVO userVO = mongoTemplate.findOne(buildQueryByid(id),
				UserVO.class, COLLECTION_CLIENT_USER);
		return userVO;
	}

	public Query buildQueryByid(String id) {
		Criteria criteria = Criteria.where("id").is(id);

		return Query.query(criteria);
	}
}
