package com.youfan.services.users;

import java.util.List;

import org.springframework.data.mongodb.core.query.Query;

import com.youfan.data.models.MerchantKitchenInfoEntity;

/**
 * Created by perfection on 15-8-24.
 */
public interface MerchantKitchenServer {

	public long count(Query query);

	public List<MerchantKitchenInfoEntity> find(Query query);
}
