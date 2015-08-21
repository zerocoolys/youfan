package com.youfan.data.dao;

import com.youfan.controllers.objs.MerchantUser;
import com.youfan.data.models.UserEntity;

/**
 * Created by perfection on 15-8-19.
 */
public interface UserDAO extends MongoBaseDAO<UserEntity,MerchantUser, Long> {
}
