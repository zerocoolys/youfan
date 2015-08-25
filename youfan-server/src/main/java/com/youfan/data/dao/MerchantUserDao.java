package com.youfan.data.dao;

import com.youfan.controllers.objs.MerchantUser;
import com.youfan.data.models.MerchantUserEntity;

/**
 * Created by perfection on 15-8-24.
 */
public interface MerchantUserDao extends MongoBaseDAO<MerchantUserEntity,MerchantUser, Long> {
    MerchantUser login(String userName,String passWord);
    MerchantUser register(String userName,String passWord);
}
