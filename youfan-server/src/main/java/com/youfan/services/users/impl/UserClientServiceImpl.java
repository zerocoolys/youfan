package com.youfan.services.users.impl;

import com.youfan.controllers.objs.UserClientVO;
import com.youfan.data.dao.UserClientDao;
import com.youfan.data.models.UserClientEntity;
import com.youfan.exceptions.UserException;
import com.youfan.services.users.UserClientService;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by icepros on 15-8-25.
 */
@Service("ucService")
public class UserClientServiceImpl implements UserClientService {

    @Resource
    private UserClientDao ucDAO;

    @Override
    public void insert(UserClientVO uc) {
        if(uc == null){
            return;
        } else {
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
        return  result;
    }
}
