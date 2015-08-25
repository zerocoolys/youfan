package com.youfan.services.users.impl;

import com.youfan.controllers.objs.MerchantUser;
import com.youfan.controllers.objs.User;
import com.youfan.data.dao.UserDAO;
import com.youfan.exceptions.UserException;
import com.youfan.services.users.UsersService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by perfection on 15-8-19.
 */
@Service("usersService")
public class UsersServerImpl implements UsersService{

    @Resource
    private UserDAO userDAO;

    @Override
    public boolean isExists(String name) {
        return false;
    }

    @Override
    public User findOne(String name) {
        return null;
    }

    @Override
    public String findUserId(String name) {
        return null;
    }

    @Override
    public User validate(String username, String pass) throws UserException {
        return null;
    }

    @Override
    public void saveMerchantUserInfo(MerchantUser merchantUser) throws UserException {
        userDAO.insert(merchantUser);
    }
}
