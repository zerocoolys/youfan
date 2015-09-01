package com.youfan.services.client.impl;

import com.youfan.commons.vo.client.UserVO;
import com.youfan.data.dao.client.UserDao;
import com.youfan.exceptions.UserException;
import com.youfan.services.client.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by icepros on 15-8-25.
 */
@Service("ucService")
public class UserServiceImpl implements UserService {

    @Resource
    private UserDao ucDAO;

    @Override
    public void insert(UserVO uc) {
        if (uc != null) {
            ucDAO.insert(uc);
        }
    }

    @Override
    public void update(UserVO uc) {

    }


    @Override
    public UserVO getUserByTel(String tel){
        return null;
    }

    @Override
    public UserVO findUserByTelAndPwd(String tel, String password){
        return ucDAO.getUserByTelAndPwd(tel, password);
    }
}
