package com.youfan.services.merchant.impl;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.data.dao.merchant.MerchantKitchenDAO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.services.merchant.MerchantKitchenService;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by perfection on 15-8-19.
 */
@Service("merchantKitchenServer")
public class MerchantKitchenServiceImpl implements MerchantKitchenService {


    @Resource
    private MerchantKitchenDAO merchantKitchenDAO;


    @Override
    public long count(Query query) {
        return merchantKitchenDAO.count(query);
    }

    @Override
    public List<MerchantKitchenInfoEntity> find(Query query) {
        return merchantKitchenDAO.find(query);
    }

    @Override
    public CollectionVO<MerchantKitchenInfoVO> geographicalSearch(Pagination pagination) {
        return merchantKitchenDAO.getGeographicalSearch(pagination);
    }
}
