package com.youfan.services.client.impl;

import com.youfan.commons.vo.UserClientVO;
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
    public void insert(UserClientVO uc) {
        if (uc != null) {
            ucDAO.insert(uc);
        }
    }

    @Override
    public void update(UserClientVO uc) {

    }

    @Override
    public void fetchAllUC() {

    }

    @Override
    public UserClientVO getUserByTel(String tel) throws UserException {
        return null;
    }

    @Override
    public UserClientVO findUserByTelAndPwd(String tel, String pwd) throws UserException {

        UserClientVO result = ucDAO.getUserByTelAndPwd(tel, pwd);
        return result;
    }
}
