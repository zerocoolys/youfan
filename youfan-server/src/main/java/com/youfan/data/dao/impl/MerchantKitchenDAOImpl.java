package com.youfan.data.dao.impl;

import com.mongodb.DBCursor;
import com.youfan.controllers.objs.MerchantKitchenInfo;
import com.youfan.data.dao.MerchantKitchenDAO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.utils.JsonUtil;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * Created by perfection on 15-8-25.
 */
@Repository("merchantKitchenDAO")
public class MerchantKitchenDAOImpl implements MerchantKitchenDAO {
    @Override
    public List<MerchantKitchenInfo> findAll() {
        return convertToVOList(mongoTemplate.findAll(MerchantKitchenInfoEntity.class));
    }

    @Override
    public MerchantKitchenInfo findOne(Long aLong) {
        return convertToVO(mongoTemplate.findOne(query(where("id").is(aLong)), MerchantKitchenInfoEntity.class));
    }

    @Override
    public void insert(MerchantKitchenInfo merchantKitchenInfo) {
        mongoTemplate.insert(convertToEntity(merchantKitchenInfo));
    }

    @Override
    public void insert(List<MerchantKitchenInfo> list) {
        mongoTemplate.insertAll(convertToEntityList(list));
    }

    @Override
    public void delete(Long aLong) {
        mongoTemplate.updateFirst(query(where("id").is(aLong)), Update.update("status",-1),MerchantKitchenInfoEntity.class);
    }

    @Override
    public void update(MerchantKitchenInfo merchantKitchenInfo) {
//        Update
//        mongoTemplate.findAndModify(query(where("id").is(merchantKitchenInfo.getId())),);
    }

    @Override
    public Class<MerchantKitchenInfoEntity> getEntityClass() {
        return MerchantKitchenInfoEntity.class;
    }

    @Override
    public Class<MerchantKitchenInfo> getVOClass() {
        return MerchantKitchenInfo.class;
    }

    @Override
    public List<MerchantKitchenInfo> pageList(Integer page, Integer pageSize) throws KitchenInfoException {
        DBCursor limit = mongoTemplate.getCollection(COLLECTION_KITCHENINFO).find().skip((page-1)*pageSize).limit(pageSize);
        MerchantKitchenInfoEntity merchantKitchenInfoEntity = null;
        List<MerchantKitchenInfo> list = new ArrayList<>();
        while (limit.hasNext()) {
            Map map = limit.next().toMap();
            String id = map.get("_id").toString();
            map.remove("_id");
            map.put("id",id);
            merchantKitchenInfoEntity = JsonUtil.map2pojo(map,MerchantKitchenInfoEntity.class);
            list.add(convertToVO(merchantKitchenInfoEntity));
        }
        return list;
    }

    @Override
    public MerchantKitchenInfo saveMerchantKitchenInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException {
        //判断是否存在该表
        createCollection();

        Update update = new Update();

        update.set("addressGeoCoding", merchantKitchenInfo.getAddressGeoCoding());
        update.set("cuisine", merchantKitchenInfo.getCuisine());
        update.set("desc", merchantKitchenInfo.getDesc());
        update.set("disPrice", merchantKitchenInfo.getDisPrice());
        update.set("disRange", merchantKitchenInfo.getDisRange());
        update.set("distribution", merchantKitchenInfo.getDistribution());
        update.set("endTime", merchantKitchenInfo.getEndTime());
        update.set("kitchenAddress", merchantKitchenInfo.getKitchenAddress());
        update.set("kitchenName", merchantKitchenInfo.getKitchenName());
        update.set("phoneNumber", merchantKitchenInfo.getPhoneNumber());
        update.set("startTime", merchantKitchenInfo.getStartTime());
        update.set("galleryFul", merchantKitchenInfo.getGalleryFul());
        update.set("isCanteen", merchantKitchenInfo.isCanteen());
        update.set("isDistribution", merchantKitchenInfo.isDistribution());
        update.set("isTakeSelf", merchantKitchenInfo.isTakeSelf());
        update.set("lat", merchantKitchenInfo.getLat());
        update.set("lng", merchantKitchenInfo.getLng());
        return convertToVO(mongoTemplate.findAndModify(query(where("id").is(merchantKitchenInfo.getId())), update, MerchantKitchenInfoEntity.class));
    }

    @Override
    public MerchantKitchenInfo saveMerchantKitchenPicInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException {
        createCollection();

        Update update = new Update();

        update.set("kitchenPicUrl", merchantKitchenInfo.getKitchenPicUrl());

        return convertToVO(mongoTemplate.findAndModify(query(where("id").is(merchantKitchenInfo.getId())), update, MerchantKitchenInfoEntity.class));
    }

    @Override
    public MerchantKitchenInfo saveMerchantKitchenStoryInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException {
        createCollection();

        Update update = new Update();

        update.set("address", merchantKitchenInfo.getKitchenStoryName());
        update.set("ageRange", merchantKitchenInfo.getKitchenStoryContent());

        return convertToVO(mongoTemplate.findAndModify(query(where("id").is(merchantKitchenInfo.getId())), update, MerchantKitchenInfoEntity.class));
    }

    private void createCollection() {
        if (!mongoTemplate.collectionExists(MerchantUserEntity.class)) {
            mongoTemplate.createCollection(MerchantUserEntity.class);
        }
    }

	@Override
	public long count(Query query) {
		return mongoTemplate.count(query, MerchantKitchenInfoEntity.class);
	}

	@Override
	public List<MerchantKitchenInfoEntity> find(Query query) {
		return mongoTemplate.find(query, MerchantKitchenInfoEntity.class);
	}
}
