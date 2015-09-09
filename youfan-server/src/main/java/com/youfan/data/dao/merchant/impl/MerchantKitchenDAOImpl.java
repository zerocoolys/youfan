package com.youfan.data.dao.merchant.impl;

import com.youfan.commons.Constants;
import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.CommentVO;
import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.data.dao.merchant.MerchantKitchenDAO;
import com.youfan.data.models.CommentEntity;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.utils.JSONUtils;

import org.springframework.data.domain.Sort;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
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
    public MerchantKitchenInfoVO saveMyHobby(MerchantKitchenInfoVO merchantKitchenInfoVO) {
        Update update = new Update();
        update.set("hobby", merchantKitchenInfoVO.getHobby());
        MerchantKitchenInfoEntity merchantKitchenInfoEntity = mongoTemplate.findAndModify(query(where("id").is(merchantKitchenInfoVO.getId())), update, getEntityClass());
        if (merchantKitchenInfoEntity != null) {
            return convertToVO(merchantKitchenInfoEntity);
        } else {
            mongoTemplate.insert(convertToEntity(merchantKitchenInfoVO));
            return merchantKitchenInfoVO;
        }
    }

    @Override
    public List<MerchantKitchenInfoVO> pageList(Integer page, Integer pageSize) {
//        DBCursor limit = mongoTemplate.getCollection(COLLECTION_KITCHENINFO).find().skip((page - 1) * pageSize).limit(pageSize);
//        MerchantKitchenInfoEntity merchantKitchenInfoEntity = null;
//        List<MerchantKitchenInfoVO> list = new ArrayList<>();
//        while (limit.hasNext()) {
//            Map map = limit.next().toMap();
//            String id = map.get("_id").toString();
//            map.remove("_id");
//            map.put("id", id);
//            merchantKitchenInfoEntity = JSONUtils.map2pojo(map, getEntityClass());
//            list.add(convertToVO(merchantKitchenInfoEntity));
//        }
//
        return convertToVOList(mongoTemplate.find(query(where("status").is(0)).skip((page - 1) * pageSize).limit(pageSize), getEntityClass()));
    }

    @Override
    public MerchantKitchenInfoVO findById(String id) {
        Query q = new Query().addCriteria(Criteria.where(Constants.FIELD_ID).is(id));
        MerchantKitchenInfoEntity mre = mongoTemplate.findOne(q, getEntityClass());
        return convertToVO(mre);
    }

    @Override
    public List<MerchantKitchenInfoVO> conditionalSearch(String merchantName) {
        Pattern pattern = Pattern.compile("^.*" + merchantName + ".*$", Pattern.CASE_INSENSITIVE);
        Query query = Query.query(Criteria.where(MERCHANTKITCHEN_NAME).regex(pattern));
        List<MerchantKitchenInfoEntity> merchantUserEntities = mongoTemplate.find(query, getEntityClass());
        return convertToVOList(merchantUserEntities);
    }

    @Override
    public CollectionVO<MerchantKitchenInfoVO> getGeographicalSearch(Pagination p) {

        Query query = new Query();
        Criteria c = Criteria.where(Constants.CONPONS_STATUS).is(0);
        if (p.getParams() != null && p.getParams().size() > 0) {
            p.getParams().forEach((k, v) -> {
                if ("lnglat".indexOf(k) == -1) {
                    c.and(k).is(v);
                }
            });
        }
        query.addCriteria(c);
        long totalCount = this.mongoTemplate.count(query, this.getEntityClass());
        query.skip((p.getPageNo() - 1) * p.getPageSize());
        query.limit(p.getPageSize());
        Sort sort = null;
        if (!p.getAsc().equals("") && p.getSortBy() != null) {
            sort = new Sort(new Sort.Order(p.getAsc().equals("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC, p.getSortBy()));
//            query.with(sort);
        }

        Point point = new Point(Double.valueOf(p.getParams().get("lng").toString()), Double.valueOf(p.getParams().get("lat").toString()));

        NearQuery geoNear = NearQuery.near(point, Metrics.KILOMETERS).minDistance(0.01).maxDistance(2).query(query);

        TypedAggregation<MerchantKitchenInfoEntity> aggs = newAggregation(MerchantKitchenInfoEntity.class, geoNear(geoNear, MERCHANTKITCHEN_LOCATION), sort(Sort.Direction.ASC, MERCHANTKITCHEN_LOCATION));

        AggregationResults<MerchantKitchenInfoEntity> results = mongoTemplate.aggregate(aggs, MerchantKitchenInfoEntity.class);

        List<MerchantKitchenInfoEntity> entities = results.getMappedResults();

        List<MerchantKitchenInfoVO> vos = convertToVOList(entities);

        CollectionVO<MerchantKitchenInfoVO> collection = new CollectionVO<>(vos, (int) totalCount, p.getPageSize());

        return collection;
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenInfo(MerchantKitchenInfoVO merchantKitchenInfo) {
        //判断是否存在该表
        createCollection(merchantKitchenInfo);

        Update update = new Update();

        update.set("id", merchantKitchenInfo.getId());
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
//        update.set("lat", merchantKitchenInfo.getLat());
//        update.set("lng", merchantKitchenInfo.getLng());
        update.set("location", merchantKitchenInfo.getLocation());
        MerchantKitchenInfoEntity merchantKitchenInfoEntity = mongoTemplate.findAndModify(query(where("id").is(merchantKitchenInfo.getId())), update, getEntityClass());
        if (merchantKitchenInfoEntity == null) {
            mongoTemplate.insert(convertToEntity(merchantKitchenInfo));
            return merchantKitchenInfo;
        } else {
            return convertToVO(merchantKitchenInfoEntity);
        }

    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenPicInfo(MerchantKitchenInfoVO merchantKitchenInfo) {
        createCollection(merchantKitchenInfo);

        Update update = new Update();

        update.set("kitchenPicUrl", merchantKitchenInfo.getKitchenPicUrl());

        return convertToVO(mongoTemplate.findAndModify(query(where(COLLECTION_MERCHANTKITCHENINFOID).is(merchantKitchenInfo.getId())), update, getEntityClass()));
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(MerchantKitchenInfoVO merchantKitchenInfo) {
        createCollection(merchantKitchenInfo);

        Update update = new Update();

        update.set("kitchenStoryName", merchantKitchenInfo.getKitchenStoryName());
        update.set("kitchenStoryContent", merchantKitchenInfo.getKitchenStoryContent());
        MerchantKitchenInfoEntity merchantKitchenInfoEntity = mongoTemplate.findAndModify(query(where("id").is(merchantKitchenInfo.getId())), update, getEntityClass());
        if (merchantKitchenInfoEntity != null) {
            return convertToVO(merchantKitchenInfoEntity);
        } else {
            return null;
        }
    }

    @Override
    public List<MerchantKitchenInfoVO> pageListByStatus(Integer page, Integer pageSize, Query query) {
        return convertToVOList(mongoTemplate.find(query.skip((page - 1) * pageSize).limit(pageSize), getEntityClass()));
    }

    @Override
    public Long getPageTotal(Integer status) {
        return mongoTemplate.count(query(where("status").is(status)), getEntityClass());
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

    @Override
    public MerchantKitchenInfoVO getMerchantKitchenBaseInfo(String id) {
        MerchantKitchenInfoEntity merchantKitchenInfoEntity = mongoTemplate.findOne(query(where("id").is(id)), getEntityClass());
        if (merchantKitchenInfoEntity != null) {
            return convertToVO(merchantKitchenInfoEntity);
        } else {
            return null;
        }
    }
}
