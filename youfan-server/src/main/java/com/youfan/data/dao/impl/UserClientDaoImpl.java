package com.youfan.data.dao.impl;

import com.mongodb.BasicDBObject;
import com.youfan.controllers.objs.User;
import com.youfan.controllers.objs.UserClientVO;
import com.youfan.data.dao.UserClientDao;
import com.youfan.data.id.IdGenerator;
import com.youfan.data.models.UserClientEntity;
import com.youfan.exceptions.UserException;
import com.youfan.system.mongo.MongoPool;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.Instant;
import java.util.List;

/**
 * Created by icepros on 15-8-25.
 */
@Repository("ucDAO")
public class UserClientDaoImpl implements UserClientDao {

    @Resource
    private IdGenerator idGenerator;

    @Override
    public List<UserClientVO> findAll() {
        return null;
    }

    @Override
    public UserClientVO findOne(Long aLong) {
        return null;
    }

    @Override
    public void insert(UserClientVO userClientVO) {

        UserClientEntity ucEntity = convertToEntity(userClientVO);
        long userId = Instant.now().getEpochSecond() + idGenerator.next(SEQ_LOGIN);
        ucEntity.setUserId(userId);

        mongoTemplate.insert(ucEntity, COLLECTION_USER_CLIENT);
    }

    @Override
    public void insert(List<UserClientVO> list) {

    }

    @Override
    public void delete(Long aLong) {

    }

    @Override
    public void update(UserClientVO userClientVO) {

    }

    private Query clientQuery(String tel, String loginPwd) {
        Criteria criteria = Criteria.where("tel").is(tel);

        if (tel != null) {
            criteria.and("loginPwd").is(loginPwd);
        }

        return Query.query(criteria);
    }

    @Override
    public UserClientVO getUserByTelAndPwd(String tel, String pwd) {
        UserClientVO userClientVO = new UserClientVO();
        try {
            userClientVO = convertToVO(mongoTemplate.findOne(clientQuery(tel, pwd), UserClientEntity.class, COLLECTION_USER_CLIENT));
        } catch (Exception e){
            System.out.println(e.getMessage());
        }

        return userClientVO;
    }

    @Override
    public UserClientVO updateUserPwd(String pwd) {
        return null;
    }
}
