package com.youfan.services.users.impl;

import com.youfan.controllers.objs.MerchantKitchenInfo;
import com.youfan.controllers.objs.MerchantUser;
import com.youfan.data.dao.MerchantKitchenDAO;
import com.youfan.data.dao.MerchantUserDAO;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.exceptions.UserException;
import com.youfan.services.users.MerchantUsersServer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

/**
 * Created by perfection on 15-8-19.
 */
@Service("merchantUsersServer")
public class MerchantUsersServerImpl implements MerchantUsersServer {


    @Resource
    private MerchantUserDAO merchantUserDao;

    @Resource
    private MerchantKitchenDAO merchantKitchenDAO;

    public MerchantUser login(String userName, String passWord) throws UserException {
        return merchantUserDao.login(userName, passWord);
    }

    @Override
    public void saveMerchantUserInfo(MerchantUser merchantUser) throws UserException {
        merchantUserDao.saveMerchantUserInfo(merchantUser);
    }

    public Map<String,String> register(String userName, String passWord) throws UserException {
        return merchantUserDao.register(userName, passWord);
    }

    @Override
    public MerchantKitchenInfo saveMerchantKitchenInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException {
        return merchantKitchenDAO.saveMerchantKitchenInfo(merchantKitchenInfo);
    }

    @Override
    public MerchantKitchenInfo saveMerchantKitchenPicInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException {
        return merchantKitchenDAO.saveMerchantKitchenPicInfo(merchantKitchenInfo);
    }

    @Override
    public MerchantKitchenInfo saveMerchantKitchenStoryInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException {
        return merchantKitchenDAO.saveMerchantKitchenStoryInfo(merchantKitchenInfo);
    }
}
