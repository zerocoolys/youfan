package com.youfan.data.dao.impl;

import com.youfan.controllers.objs.MerchantUser;
import com.youfan.data.dao.MerchantUserDAO;
import com.youfan.data.models.MerchantUserEntity;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * Created by perfection on 15-8-19.
 */
@Repository("merchantUserDao")
public class MerchantUserDAOImpl implements MerchantUserDAO {
    @Override
    public List<MerchantUser> findAll() {
        return Collections.emptyList();
    }

    @Override
    public MerchantUser saveMerchantUserInfo(MerchantUser merchantUser) {
        Update update = new Update();

        update.set("address", merchantUser.getAddress());
        update.set("ageRange", merchantUser.getAgeRange());
        update.set("headPortraitPicUrl", merchantUser.getHeadPortraitPicUrl());
        update.set("healthCertificatePicUrl", merchantUser.getHealthCertificatePicUrl());
        update.set("idCardPicUrl", merchantUser.getIdCardPicUrl());
        update.set("realName", merchantUser.getRealName());
        update.set("sex", merchantUser.getSex());

        return convertToVO(mongoTemplate.findAndModify(query(where("id").is(merchantUser.getId())), update, MerchantUserEntity.class));
    }

    @Override
    public MerchantUser findOne(Long id) {
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
    public Class<MerchantUser> getVOClass() {
        return MerchantUser.class;
    }

    @Override
    public void insert(List<MerchantUser> list) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void update(MerchantUser userEntity) {

    }

    @Override
    public Class<MerchantUserEntity> getEntityClass() {
        return MerchantUserEntity.class;
    }
}
