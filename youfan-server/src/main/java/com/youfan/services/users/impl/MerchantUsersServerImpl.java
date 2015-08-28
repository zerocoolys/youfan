package com.youfan.services.users.impl;

import com.youfan.controllers.objs.*;
import com.youfan.data.dao.MerchantKitchenDAO;
import com.youfan.data.dao.MerchantUserDAO;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.exceptions.UserException;
import com.youfan.services.users.MerchantUsersServer;
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

    public MerchantUserVO login(String userName) throws UserException {
        return merchantUserDao.login(userName);
    }

    @Override
    public List<MerchantKitchenInfoVO> getAllMerchantKitchenInfo() {
        return merchantKitchenDAO.findAll();
    }

    @Override
    public MerchantKitchenInfoVO mrFindById(String id) {
        return merchantKitchenDAO.findById(id);
    }

    @Override
    public MerchantUserVO muFindById(String id) {
        return merchantUserDao.findById(id);
    }

    @Override
    public void saveMerchantUserInfo(MerchantUserVO merchantUser) throws UserException {
        merchantUserDao.saveMerchantUserInfo(merchantUser);
    }

    public Map<String, String> register(String userName, String passWord) throws UserException {
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
    public MerchantKitchenInfoVO getMerchantKitchenInfo(Long id) throws KitchenInfoException {
        return null;
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException {
        return merchantKitchenDAO.saveMerchantKitchenInfo(merchantKitchenInfo);
    }

    @Override
    public List<MerchantKitchenInfoVO> pageList(Integer page, Integer pageSize) throws KitchenInfoException {
        return merchantKitchenDAO.pageList(page, pageSize);
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenPicInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException {
        return merchantKitchenDAO.saveMerchantKitchenPicInfo(merchantKitchenInfo);
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException {
        return merchantKitchenDAO.saveMerchantKitchenStoryInfo(merchantKitchenInfo);
    }

    @Override
    public List<MerchantUserEntity> getMerchantByStatus(Integer status) throws UserException {
        return merchantUserDao.getMerchantByStatus(status);

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
    public MerchantKitchenInfoVO findById(String id) {
        return null;
    }

    @Override
    public List<MerchantUserEntity> find(Query query) {
        return merchantUserDao.find(query);
    }
}
