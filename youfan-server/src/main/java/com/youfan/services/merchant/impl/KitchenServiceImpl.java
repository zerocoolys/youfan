package com.youfan.services.merchant.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.data.dao.merchant.KitchenDAO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.services.impl.MongoServiceImpl;
import com.youfan.services.merchant.KitchenService;

/**
 * 
 * @title KitchenServiceImpl.java
 * @package com.youfan.services.merchant.impl
 * @description 厨房信息业务层实现类
 * @author QinghaiDeng   
 * @update 2015年9月11日 下午5:15:11
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
@Service("kitchenService")
public class KitchenServiceImpl extends MongoServiceImpl<MerchantKitchenInfoEntity, MerchantKitchenInfoVO>implements KitchenService {

	@Autowired
	public KitchenServiceImpl(KitchenDAO kitchenDAO) {
		super(kitchenDAO);
	}

}
