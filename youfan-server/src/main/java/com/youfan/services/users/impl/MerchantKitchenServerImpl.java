package com.youfan.services.users.impl;

import com.youfan.data.dao.MerchantKitchenDAO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.services.users.MerchantKitchenServer;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by perfection on 15-8-19.
 */
@Service("merchantKitchenServer")
public class MerchantKitchenServerImpl implements MerchantKitchenServer {


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
}
