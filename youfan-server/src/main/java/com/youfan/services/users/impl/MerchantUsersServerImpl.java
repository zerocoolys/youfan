package com.youfan.services.users.impl;

import com.youfan.controllers.objs.*;
import com.youfan.data.dao.MerchantKitchenDAO;
import com.youfan.data.dao.MerchantUserDAO;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.data.models.MessageEntity;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.exceptions.UserException;
import com.youfan.services.users.MerchantUsersServer;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
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

    public MerchantUser login(String userName) throws UserException {
        return merchantUserDao.login(userName);
    }

    @Override
    public List<MerchantKitchenInfo> getAllMerchantKitchenInfo() {
        return merchantKitchenDAO.findAll();
    }

    @Override
    public MerchantKitchenInfo mrFindById(String id) {
        return merchantKitchenDAO.findById(id);
    }

    @Override
    public MerchantUser muFindById(String id) {
        return merchantUserDao.findById(id);
    }

    @Override
    public void saveMerchantUserInfo(MerchantUser merchantUser) throws UserException {
        merchantUserDao.saveMerchantUserInfo(merchantUser);
    }

    public Map<String,String> register(String userName, String passWord) throws UserException {
        return merchantUserDao.register(userName, passWord);
    }

    @Override
    public MerchantKitchenBaseInfo getMerchantKitchenBaseInfo(Long id) throws KitchenInfoException {
        return null;
    }

    @Override
    public MerchantKitchenPicInfo getMerchantKitchenPicInfo(Long id) throws KitchenInfoException {
        return null;
    }

    @Override
    public MerchantKitchenStoryInfo getMerchantKitchenStoryInfo(Long id) throws KitchenInfoException {
        return null;
    }

    @Override
    public MerchantKitchenInfo getMerchantKitchenInfo(Long id) throws KitchenInfoException {
        return null;
    }

    @Override
    public MerchantKitchenInfo saveMerchantKitchenInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException {
        return merchantKitchenDAO.saveMerchantKitchenInfo(merchantKitchenInfo);
    }

    @Override
    public List<MerchantKitchenInfo> pageList(Integer page, Integer pageSize) throws KitchenInfoException {
        return merchantKitchenDAO.pageList(page,pageSize);
    }

    @Override
    public MerchantKitchenInfo saveMerchantKitchenPicInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException {
        return merchantKitchenDAO.saveMerchantKitchenPicInfo(merchantKitchenInfo);
    }

    @Override
    public MerchantKitchenInfo saveMerchantKitchenStoryInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException {
        return merchantKitchenDAO.saveMerchantKitchenStoryInfo(merchantKitchenInfo);
    }

	@Override
	public List<MerchantUserEntity> getMerchantByStatus(Integer status) throws UserException {
        return  merchantUserDao.getMerchantByStatus(status);

	}

	@Override
	public void checkMerchant(String id, Integer status) {
		merchantUserDao.updateStatus(id, status);
	}

	@Override
	public long count(Query query) {
		return merchantUserDao.count(query);
	}

    @Override
    public MerchantKitchenInfo findById(String id) {
        return null;
    }

    @Override
	public List<MerchantUserEntity> find(Query query) {
		return merchantUserDao.find(query);
	}
}
