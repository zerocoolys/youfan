package com.youfan.data.dao;

import com.youfan.controllers.objs.MerchantKitchenInfoVO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.exceptions.KitchenInfoException;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

/**
 * Created by perfection on 15-8-25.
 */
public interface MerchantKitchenDAO extends MongoBaseDAO<MerchantKitchenInfoEntity, MerchantKitchenInfoVO, Long> {
    MerchantKitchenInfoVO saveMerchantKitchenInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfoVO saveMerchantKitchenPicInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    List<MerchantKitchenInfoVO> pageList(Integer page, Integer pageSize) throws KitchenInfoException;

    long count(Query query);

    List<MerchantKitchenInfoEntity> find(Query query);

    MerchantKitchenInfoVO findById(String id);
}
