package com.youfan.services.merchant;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

/**
 * Created by perfection on 15-8-24.
 */
public interface MerchantKitchenService {

    public long count(Query query);

    public List<MerchantKitchenInfoEntity> find(Query query);

    /**
     * 更具用户的当前位置查询商家3公里以内的所有店铺
     * @return
     */
    CollectionVO<MerchantKitchenInfoVO> geographicalSearch(Pagination pagination);

    MerchantKitchenInfoVO findById(String id);
}
