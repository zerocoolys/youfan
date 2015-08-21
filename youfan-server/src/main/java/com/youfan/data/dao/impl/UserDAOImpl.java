package com.youfan.data.dao.impl;

import com.youfan.controllers.objs.MerchantUser;
import com.youfan.data.dao.UserDAO;
import com.youfan.data.models.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

/**
 * Created by perfection on 15-8-19.
 */
@Repository("userDAO")
public class UserDAOImpl implements UserDAO {
    @Override
    public List<MerchantUser> findAll() {
        return Collections.emptyList();
    }

    @Override
    public MerchantUser findOne(Long id) {
        return null;
    }

    @Override
    public void insert(MerchantUser userEntity) {
        mongoTemplate.insert(userEntity);
    }

    @Override
    public Class<MerchantUser> getVOClass() {
        return null;
    }

    @Override
    public void insert(List<MerchantUser> list) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void update(MerchantUser userEntity) {

    }

    @Override
    public Class<UserEntity> getEntityClass() {
        return UserEntity.class;
    }
}
