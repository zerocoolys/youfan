package com.youfan.data.dao.client.impl;

import com.youfan.commons.vo.UserClientVO;
import com.youfan.data.dao.client.UserDao;
import com.youfan.data.models.UserClientEntity;
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
    public UserClientVO findOne(Long id) {
        return null;
    }

    @Override
    public void insert(UserClientVO userClientVO) {
        UserClientEntity ucEntity = convertToEntity(userClientVO);
        long userId = generateId(idGenerator.next(COLLECTION_CLIENT_USER));
        ucEntity.setUserId(userId);

        mongoTemplate.insert(ucEntity, COLLECTION_CLIENT_USER);
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void update(UserClientVO userClientVO) {

    }

    @Override
    public UserClientVO getUserByTelAndPwd(String tel, String pwd) {

        return convertToVO(mongoTemplate.findOne(
                buildQuery(tel, pwd),
                getEntityClass(),
                COLLECTION_CLIENT_USER));
    }

    @Override
    public UserClientVO updateUserPwd(String pwd) {
        return null;
    }
}
