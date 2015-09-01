package com.youfan.data.dao.client.impl;

import com.youfan.commons.vo.client.UserVO;
import com.youfan.data.dao.client.UserDao;
import com.youfan.data.models.ClientUserEntity;
import com.youfan.data.support.IdGenerator;
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
    public UserVO findOne(String id) {
        return null;
    }

    @Override
    public void insert(UserVO userClientVO) {
        ClientUserEntity ucEntity = convertToEntity(userClientVO);
        mongoTemplate.insert(ucEntity, COLLECTION_CLIENT_USER);
    }

    @Override
    public void delete(String id) {

    }

    @Override
    public void update(UserVO userClientVO) {

    }

    @Override
    public UserVO getUserByTelAndPwd(String tel, String password) {

        return convertToVO(mongoTemplate.findOne(
                buildQuery(tel, password),
                getEntityClass(),
                COLLECTION_CLIENT_USER));
    }

    @Override
    public UserVO updateUserPwd(String pwd) {
        return null;
    }
}
