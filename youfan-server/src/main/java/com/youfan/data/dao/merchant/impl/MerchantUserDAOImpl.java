package com.youfan.data.dao.merchant.impl;

import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.commons.Constants;
import com.youfan.data.dao.merchant.MerchantUserDAO;
import com.youfan.data.models.MerchantUserEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

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
    public MerchantUserVO saveMerchantUserInfo(MerchantUserVO merchantUser) {
        if (mongoTemplate.collectionExists(getEntityClass())) {
            Update update = new Update();

            update.set("address", merchantUser.getAddress());
            update.set("ageRange", merchantUser.getAgeRange());
            update.set("headPortraitPicUrl", merchantUser.getHeadPortraitPicUrl());
            update.set("healthCertificatePicUrl", merchantUser.getHealthCertificatePicUrl());
            update.set("idCardPicUrl", merchantUser.getIdCardPicUrl());
            update.set("realName", merchantUser.getRealName());
            update.set("sex", merchantUser.getSex());
            return convertToVO(mongoTemplate.findAndModify(query(where("id").is(merchantUser.getId())), update, getEntityClass()));
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
        if (!mongoTemplate.collectionExists(getEntityClass())) {
            mongoTemplate.createCollection(getEntityClass());
            mongoTemplate.insert(merchantUser);
        } else {
            if (mongoTemplate.findOne(query(where("userName").is(userName)), getEntityClass()) == null) {
                mongoTemplate.insert(merchantUser);
            }
        }
        MerchantUserEntity merchantUserEntity = mongoTemplate.findOne(query(where("userName").is(userName)), getEntityClass());
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
        if (!mongoTemplate.collectionExists(getEntityClass())) {
            mongoTemplate.createCollection(getEntityClass());
        }
        map = new HashMap<>();
        if (mongoTemplate.findOne(query(where("userName").is(userName)), getEntityClass()) != null) {
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
            MerchantUserEntity merchantUserEntityRes = mongoTemplate.findOne(query(where("userName").is(userName).andOperator(where("passWord").is(passWord))), getEntityClass());
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
    public void delete(Long id) {

    }

    @Override
    public void update(MerchantUserVO userEntity) {

    }


    @Override
    public List<MerchantUserEntity> getMerchantByStatus(Integer status) {
        return mongoTemplate.find(query(where("status").is(status)), getEntityClass());
    }

    @Override
    public void updateStatus(String id, Integer status) {
        mongoTemplate.updateFirst(query(where("id").is(id)), Update.update("status", status), getEntityClass());
    }

    @Override
    public List<MerchantUserEntity> find(Query query) {
        return mongoTemplate.find(query, getEntityClass());
    }

    @Override
    public long count(Query query) {
        return mongoTemplate.count(query, getEntityClass());
    }

    @Override
    public MerchantUserVO findById(String id) {
        Query q = new Query();
        Criteria c = Criteria.where(Constants.DATA_ID).is(id).and("status").is(0);
        q.addCriteria(c);
        MerchantUserEntity mue = mongoTemplate.findOne(q, getEntityClass());
        if (mue != null)
            return convertToVO(mue);

        return null;
    }
}
