package com.youfan.data.dao.impl;

import com.youfan.controllers.objs.MerchantUserVO;
import com.youfan.data.dao.MerchantUserDAO;
import com.youfan.data.models.MerchantUserEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * Created by perfection on 15-8-19.
 */
@Repository("merchantUserDao")
public class MerchantUserDAOImpl implements MerchantUserDAO {
    @Override
    public List<MerchantUserVO> findAll() {
        return Collections.emptyList();
    }

    @Override
    public MerchantUserVO saveMerchantUserInfo(MerchantUserVO merchantUser) {
        if (mongoTemplate.collectionExists(MerchantUserEntity.class)) {
            Update update = new Update();

            update.set("address", merchantUser.getAddress());
            update.set("ageRange", merchantUser.getAgeRange());
            update.set("headPortraitPicUrl", merchantUser.getHeadPortraitPicUrl());
            update.set("healthCertificatePicUrl", merchantUser.getHealthCertificatePicUrl());
            update.set("idCardPicUrl", merchantUser.getIdCardPicUrl());
            update.set("realName", merchantUser.getRealName());
            update.set("sex", merchantUser.getSex());
            return convertToVO(mongoTemplate.findAndModify(query(where("id").is(merchantUser.getId())), update, MerchantUserEntity.class));
        } else {
            mongoTemplate.insert(convertToEntity(merchantUser));
            return merchantUser;
        }

    }

    @Override
    public MerchantUserVO findOne(Long id) {
        return null;
    }

    @Override
    public void insert(MerchantUserVO merchantUser) {
        mongoTemplate.insert(convertToEntity(merchantUser));
    }

    @Override
    public MerchantUserVO login(String userName) {
        MerchantUserVO merchantUser = new MerchantUserVO();
        merchantUser.setUserName(userName);
        if (!mongoTemplate.collectionExists(MerchantUserEntity.class)) {
            mongoTemplate.createCollection(MerchantUserEntity.class);
            mongoTemplate.insert(merchantUser);
        } else {
            if (mongoTemplate.findOne(query(where("userName").is(userName)), MerchantUserEntity.class) == null) {
                mongoTemplate.insert(merchantUser);
            }
        }
        MerchantUserEntity merchantUserEntity = mongoTemplate.findOne(query(where("userName").is(userName)), MerchantUserEntity.class);
        if (merchantUserEntity == null) {
            return null;
        } else {
            merchantUser.setId(merchantUserEntity.getId());
            return merchantUser;
        }
    }

    @Override
    public Map<String, String> register(String userName, String passWord) {
        MerchantUserVO merchantUser = new MerchantUserVO();
        Map<String, String> map = null;
        if (!mongoTemplate.collectionExists(MerchantUserEntity.class)) {
            mongoTemplate.createCollection(MerchantUserEntity.class);
        }
        map = new HashMap<>();
        if (mongoTemplate.findOne(query(where("userName").is(userName)), MerchantUserEntity.class) != null) {
            //账户已经存在
            map.put("registerStatus", "-1");
            return map;
        } else {
            merchantUser.setUserName(userName);
            merchantUser.setPassWord(passWord);
            MerchantUserEntity merchantUserEntity = new MerchantUserEntity();
            merchantUserEntity.setUserName(userName);
            merchantUserEntity.setPassWord(passWord);
            mongoTemplate.insert(merchantUserEntity);
            MerchantUserEntity merchantUserEntityRes = mongoTemplate.findOne(query(where("userName").is(userName).andOperator(where("passWord").is(passWord))), MerchantUserEntity.class);
            if (merchantUserEntityRes == null) {
                //注册失败
                map.put("registerStatus", "0");
                return map;
            } else {
                //注册成功
                merchantUser.setId(merchantUserEntityRes.getId());
                map.put("registerStatus", "1");
                map.put("id", merchantUser.getId().toString());
                map.put("userName", merchantUser.getUserName());
                map.put("passWord", merchantUser.getPassWord());
                return map;
            }
        }
    }

    @Override
    public Class<MerchantUserVO> getVOClass() {
        return MerchantUserVO.class;
    }

    @Override
    public void insert(List<MerchantUserVO> list) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void update(MerchantUserVO userEntity) {
    }

    @Override
    public Class<MerchantUserEntity> getEntityClass() {
        return MerchantUserEntity.class;
    }

    @Override
    public List<MerchantUserEntity> getMerchantByStatus(Integer status) {
        return mongoTemplate.find(query(where("status").is(status)), MerchantUserEntity.class);
    }

    @Override
    public void updateStatus(String id, Integer status) {
        mongoTemplate.updateFirst(query(where("id").is(id)), new Update().set("status", status), MerchantUserEntity.class);
    }

    @Override
    public List<MerchantUserEntity> find(Query query) {
        // TODO Auto-generated method stub
        return mongoTemplate.find(query, MerchantUserEntity.class);
    }

    @Override
    public long count(Query query) {
        // TODO Auto-generated method stub
        return mongoTemplate.count(query, MerchantUserEntity.class);
    }

    @Override
    public MerchantUserVO findById(String id) {
        Query q = new Query();
        Criteria c = Criteria.where("id").is(id).and("status").is(1);
        q.addCriteria(c);
        MerchantUserEntity mue = mongoTemplate.findOne(q, getEntityClass());
        return convertToVO(mue);
    }
}
