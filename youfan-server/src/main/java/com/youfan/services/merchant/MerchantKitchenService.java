package com.youfan.services.merchant;

import com.youfan.data.models.MerchantKitchenInfoEntity;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

/**
 * Created by perfection on 15-8-24.
 */
public interface MerchantKitchenService {

    public long count(Query query);

    public List<MerchantKitchenInfoEntity> find(Query query);
}
