package com.youfan.data.dao.merchant.impl;

import com.mongodb.DBCursor;
import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.commons.Pagination;
import com.youfan.data.dao.merchant.MerchantKitchenDAO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.utils.JSONUtils;

import org.springframework.data.mongodb.core.query.Criteria;
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
    public MerchantKitchenInfoVO findOne(Long aLong) {
        return convertToVO(mongoTemplate.findOne(query(where("id").is(aLong)), getEntityClass()));
    }

    @Override
    public void insert(MerchantKitchenInfoVO merchantKitchenInfo) {
        mongoTemplate.insert(convertToEntity(merchantKitchenInfo));
    }

    @Override
    public void delete(Long aLong) {
        mongoTemplate.updateFirst(query(where("id").is(aLong)), Update.update("status", -1), getEntityClass());
    }

    @Override
    public void update(MerchantKitchenInfoVO merchantKitchenInfo) {
//        Update
//        mongoTemplate.findAndModify(query(where("id").is(merchantKitchenInfo.getId())),);
    }

    @Override
    public List<MerchantKitchenInfoVO> pageList(Integer page, Integer pageSize) throws KitchenInfoException {
        DBCursor limit = mongoTemplate.getCollection(COLLECTION_KITCHENINFO).find().skip((page - 1) * pageSize).limit(pageSize);
        MerchantKitchenInfoEntity merchantKitchenInfoEntity = null;
        List<MerchantKitchenInfoVO> list = new ArrayList<>();
        while (limit.hasNext()) {
            Map map = limit.next().toMap();
            String id = map.get("_id").toString();
            map.remove("_id");
            map.put("id", id);
            Long merchantKitchenInfoId = Long.valueOf(map.get(COLLECTION_MERCHANTKITCHENINFOID).toString());
            map.remove(COLLECTION_MERCHANTKITCHENINFOID);
            map.put("merchantKitchenInfoId",merchantKitchenInfoId);
            merchantKitchenInfoEntity = JSONUtils.map2pojo(map, getEntityClass());
            list.add(convertToVO(merchantKitchenInfoEntity));
        }
        return list;
    }

    @Override
    public MerchantKitchenInfoVO findById(String id) {
        Query q = new Query().addCriteria(Criteria.where("id").is(id));
        MerchantKitchenInfoEntity mre = mongoTemplate.findOne(q, getEntityClass());
        return convertToVO(mre);
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException {
        //判断是否存在该表
        createCollection(merchantKitchenInfo);

        Update update = new Update();

        update.set(COLLECTION_MERCHANTKITCHENINFOID,merchantKitchenInfo.getMerchantKitchenInfoId());
        update.set("cuisine", merchantKitchenInfo.getCuisine());
        update.set("desc", merchantKitchenInfo.getDesc());
        update.set("disPrice", merchantKitchenInfo.getDisPrice());
        update.set("disRange", merchantKitchenInfo.getDisRange());
        update.set("deliveryExplain", merchantKitchenInfo.getDeliveryExplain());
        update.set("endTime", merchantKitchenInfo.getEndTime());
        update.set("kitchenAddress", merchantKitchenInfo.getKitchenAddress());
        update.set("kitchenName", merchantKitchenInfo.getKitchenName());
        update.set("phoneNumber", merchantKitchenInfo.getPhoneNumber());
        update.set("startTime", merchantKitchenInfo.getStartTime());
        update.set("galleryFul", merchantKitchenInfo.getGalleryFul());
        update.set("isCanteen", merchantKitchenInfo.isCanteen());
        update.set("isDelivery", merchantKitchenInfo.isDelivery());
        update.set("isTakeSelf", merchantKitchenInfo.isTakeSelf());
        update.set("lat", merchantKitchenInfo.getLat());
        update.set("lng", merchantKitchenInfo.getLng());
        return convertToVO(mongoTemplate.findAndModify(query(where(COLLECTION_MERCHANTKITCHENINFOID).is(merchantKitchenInfo.getMerchantKitchenInfoId())), update, getEntityClass()));
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenPicInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException {
        createCollection(merchantKitchenInfo);

        Update update = new Update();

        update.set("kitchenPicUrl", merchantKitchenInfo.getKitchenPicUrl());

        return convertToVO(mongoTemplate.findAndModify(query(where("id").is(merchantKitchenInfo.getId())), update, getEntityClass()));
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException {
        createCollection(merchantKitchenInfo);

        Update update = new Update();

        update.set("address", merchantKitchenInfo.getKitchenStoryName());
        update.set("ageRange", merchantKitchenInfo.getKitchenStoryContent());

        return convertToVO(mongoTemplate.findAndModify(query(where("id").is(merchantKitchenInfo.getId())), update, getEntityClass()));
    }

    private void createCollection(MerchantKitchenInfoVO merchantKitchenInfo) {
        if (!mongoTemplate.collectionExists(getEntityClass())) {
            mongoTemplate.createCollection(getEntityClass());
            mongoTemplate.insert(convertToEntity(merchantKitchenInfo));
        }
    }

    @Override
    public long count(Query query) {
        return mongoTemplate.count(query, getEntityClass());
    }

    @Override
    public List<MerchantKitchenInfoEntity> find(Query query) {
        return mongoTemplate.find(query, getEntityClass());
    }
}
