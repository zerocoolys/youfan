package com.youfan.data.dao.impl;

import com.youfan.data.dao.UserDAO;
import com.youfan.data.models.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

/**
 * Created by perfection on 15-8-19.
 */
@Repository("userDAO")
public class UserDAOImpl implements UserDAO{
    @Override
    public List<UserEntity> findAll() {
        return Collections.emptyList();
    }

    @Override
    public UserEntity findOne(Long id) {
        return null;
    }

    @Override
    public void insert(UserEntity userEntity) {
        mongoTemplate.insert(userEntity);
    }

    @Override
    public void insert(List<UserEntity> list) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void update(UserEntity userEntity) {

    }

    @Override
    public Class<UserEntity> getEntityClass() {
        return UserEntity.class;
    }
}
