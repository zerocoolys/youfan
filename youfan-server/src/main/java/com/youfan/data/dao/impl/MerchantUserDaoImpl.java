package com.youfan.data.dao.impl;

import com.mongodb.DBObject;
import com.youfan.controllers.objs.MerchantUser;
import com.youfan.data.dao.MerchantUserDao;
import com.youfan.data.models.MerchantUserEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * Created by perfection on 15-8-24.
 */
@Repository("merchantUserDao")
public class MerchantUserDaoImpl implements MerchantUserDao{
    @Override
    public List<MerchantUser> findAll() {
        return Collections.emptyList();
    }

    @Override
    public MerchantUser findOne(Long aLong) {
        return null;
    }

    @Override
    public void insert(MerchantUser merchantUser) {
        mongoTemplate.insert(convertToEntity(merchantUser));
    }

    @Override
    public MerchantUser login(String userName,String passWord) {
        MerchantUser merchantUser = new MerchantUser();
        merchantUser.setUserName(userName);
        merchantUser.setPassWord(passWord);
        MerchantUserEntity merchantUserEntity = mongoTemplate.findOne(query(where("userName").is(userName).andOperator(where("passWord").is(passWord))), MerchantUserEntity.class);
        if(merchantUserEntity==null){
            return null;
        }else {
            merchantUser.setId(merchantUserEntity.getId());
            return merchantUser;
        }
    }

    @Override
    public MerchantUser register(String userName,String passWord) {
        MerchantUser merchantUser = new MerchantUser();
        merchantUser.setUserName(userName);
        merchantUser.setPassWord(passWord);
        MerchantUserEntity merchantUserEntity = new MerchantUserEntity();
        merchantUserEntity.setUserName(userName);
        merchantUserEntity.setPassWord(passWord);
        mongoTemplate.insert(merchantUserEntity);
        MerchantUserEntity merchantUserEntityRes = mongoTemplate.findOne(query(where("userName").is(userName).andOperator(where("passWord").is(passWord))), MerchantUserEntity.class);
        if(merchantUserEntityRes==null){
            return null;
        }else {
            merchantUser.setId(merchantUserEntityRes.getId());
            return merchantUser;
        }
    }

    @Override
    public void insert(List<MerchantUser> list) {

    }

    @Override
    public void delete(Long aLong) {

    }

    @Override
    public void update(MerchantUser merchantUser) {

    }

    @Override
    public Class<MerchantUserEntity> getEntityClass() {
        return null;
    }

    @Override
    public Class<MerchantUser> getVOClass() {
        return null;
    }
}
