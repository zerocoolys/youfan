package com.youfan.data.dao.client.impl;

import com.youfan.commons.vo.client.UserVO;
import com.youfan.data.dao.client.UserDao;
import com.youfan.data.models.ClientUserEntity;
import com.youfan.data.support.IdGenerator;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by icepros on 15-8-25.
 */
@Repository("ucDAO")
public class UserDaoImpl implements UserDao {

	@Resource
	private IdGenerator idGenerator;



	@Override
	public void update(UserVO userClientVO) {

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
	public UserVO getUserByTelAndPwd(String tel, String pwd) {

		return convertToVO(mongoTemplate.findOne(buildQuery(tel, pwd),
				getEntityClass(), COLLECTION_CLIENT_USER));
	}

	@Override
	public UserVO updateUserPwd(String pwd) {
		return null;
	}

	@Override
	public Class<ClientUserEntity> getEntityClass() {
		return ClientUserEntity.class;
	}

	@Override
	public Class<UserVO> getVOClass() {
		// TODO Auto-generated method stub
		return null;
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
