package com.youfan.services.merchant.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.controllers.params.merchant.MerchantUserParams;
import com.youfan.data.dao.merchant.MerchantKitchenDAO;
import com.youfan.data.dao.merchant.MerchantUserDAO;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.UserException;
import com.youfan.services.merchant.MerchantUsersService;

/**
 * Created by perfection on 15-8-19.
 */
@Service("merchantUsersServer")
public class MerchantUsersServiceImpl implements MerchantUsersService {


    @Resource
    private MerchantUserDAO merchantUserDao;

    @Resource
    private MerchantKitchenDAO merchantKitchenDAO;

    public MerchantUserVO login(String userName) {
        return merchantUserDao.login(userName);
    }

    @Override
    public List<MerchantKitchenInfoVO> getAllMerchantKitchenInfo() {
        return Collections.emptyList();
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
    public void saveMerchantUserInfo(MerchantUserVO merchantUser) {
        merchantUserDao.saveMerchantUserInfo(merchantUser);
    }

    public Map<String, String> register(String userName, String passWord) {
        return merchantUserDao.register(userName, passWord);
    }

    @Override
    public MerchantKitchenInfoVO getMerchantKitchenBaseInfo(String id) {
        return merchantKitchenDAO.getMerchantKitchenBaseInfo(id);
    }

    @Override
    public MerchantKitchenInfoVO getMerchantKitchenPicInfo(Long id) {
        return null;
    }

    @Override
    public MerchantKitchenInfoVO getMerchantKitchenStoryInfo(Long id) {
        return null;
    }

    @Override
    public MerchantUserVO getMerchantUserInfo(String id) {
        return merchantUserDao.getMerchantUserInfo(id);
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenInfo(MerchantKitchenInfoVO merchantKitchenInfo) {
        return merchantKitchenDAO.saveMerchantKitchenInfo(merchantKitchenInfo);
    }

    @Override
    public List<MerchantKitchenInfoVO> pageList(Integer page, Integer pageSize) {
        return merchantKitchenDAO.pageList(page, pageSize);
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenPicInfo(MerchantKitchenInfoVO merchantKitchenInfo) {
        return merchantKitchenDAO.saveMerchantKitchenPicInfo(merchantKitchenInfo);
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(MerchantKitchenInfoVO merchantKitchenInfo) {
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

    @Override
    public MerchantKitchenInfoVO saveMyHobby(MerchantKitchenInfoVO merchantKitchenInfoVO) {
        return merchantKitchenDAO.saveMyHobby(merchantKitchenInfoVO);
    }

    @Override
    public List<MerchantKitchenInfoVO> conditionalSearch(String merchantName) {
        List<MerchantKitchenInfoVO> merchantKitchenInfoVOs = new ArrayList<>(merchantKitchenDAO.conditionalSearch(merchantName));
        return merchantKitchenInfoVOs;
    }

	@Override
	public List<MerchantUserVO> getPagerByParams(MerchantUserParams muParams, Pagination pager) {
		return merchantUserDao.findPagerByParams(muParams, pager);
	}

	@Override
	public long count(MerchantUserParams muParams) {
		return merchantUserDao.count(muParams);
	}

	@Override
	public int updateById(String id, MerchantUserParams muParams) {
		// TODO Auto-generated method stub
		return merchantUserDao.updateById( id, muParams);
	}

}
