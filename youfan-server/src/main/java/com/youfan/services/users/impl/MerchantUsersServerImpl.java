package com.youfan.services.users.impl;

import com.youfan.controllers.objs.MerchantUser;
import com.youfan.data.dao.MerchantUserDAO;
import com.youfan.exceptions.UserException;
import com.youfan.services.users.MerchantUsersServer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by perfection on 15-8-19.
 */
@Service("merchantUsersServer")
public class MerchantUsersServerImpl implements MerchantUsersServer{


    @Resource
    private MerchantUserDAO merchantUserDao;

    public MerchantUser login(String userName,String passWord) throws UserException{
        return merchantUserDao.login(userName,passWord);
    }
    public MerchantUser register(String userName,String passWord) throws UserException{
        return merchantUserDao.register(userName,passWord);
    }
	@Override
	public void saveMerchantUserInfo(MerchantUser merchantUser) throws UserException {
		// TODO Auto-generated method stub
		
	}
}
