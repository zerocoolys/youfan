package com.youfan.data.dao.client.impl;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.client.ClientUserVO;
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
    public void update(String id, ClientUserVO clientUserVO) {
        Update update = new Update();
        update.set("name", clientUserVO.getName());
        update.set("sex", clientUserVO.getSex());
        update.set("age", clientUserVO.getAge());
        update.set("jobs", clientUserVO.getJobs());

        convertToVO(mongoTemplate.findAndModify(buildQueryById(id), update, getEntityClass(), COLLECTION_CLIENT_USER));
    }

    @Override
    public void updateUserPwd(String id, String pwd) {
        Update update = new Update();
        update.set("password", pwd);

        convertToVO(mongoTemplate.findAndModify(buildQueryById(id), update, getEntityClass(), COLLECTION_CLIENT_USER));
    }

    @Override
    public ClientUserVO findOne(String id) {
        return null;
    }

    @Override
    public void insert(ClientUserVO userClientVO) {
        ClientUserEntity ucEntity = convertToEntity(userClientVO);
        mongoTemplate.insert(ucEntity, COLLECTION_CLIENT_USER);
    }

    @Override
    public void delete(String s) {

    }

    @Override
    public void update(ClientUserVO userVO) {

    }



    @Override
    public ClientUserVO getUserByTelAndPwd(String tel, String pwd) {

        return convertToVO(mongoTemplate.findOne(buildQuery(tel, pwd),
                getEntityClass(), COLLECTION_CLIENT_USER));
    }

    @Override
    public ClientUserVO getUserByTel(String tel) {
        ClientUserVO result = new ClientUserVO();
        try {
            result = convertToVO(mongoTemplate.findOne(buildQueryByTel(tel), getEntityClass(), COLLECTION_CLIENT_USER));
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return result;
    }

    @Override
    public ClientUserVO findByid(String id) {

        ClientUserVO userVO = mongoTemplate.findOne(buildQueryById(id),
                ClientUserVO.class, COLLECTION_CLIENT_USER);
        return userVO;
    }
}
