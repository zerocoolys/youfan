package com.youfan.services.client.impl;

import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.commons.vo.client.MealsAddressVO;
import com.youfan.data.dao.client.UserDao;
import com.youfan.data.models.MealsAddressEntity;
import com.youfan.services.client.ClientUserService;
import com.youfan.system.redis.RedisPool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by icepros on 15-8-25.
 */
@Service("ucService")
public class ClientUserServiceImpl implements ClientUserService {

    private static Logger logger = LoggerFactory.getLogger(ClientUserServiceImpl.class);

    @Resource
    private UserDao ucDAO;

    @Override
    public void insert(ClientUserVO uc) {
        if (uc != null) {
            ucDAO.insert(uc);
        }
    }

    @Override
    public void update(ClientUserVO uc) {

    }

    @Override
    public void updateMealsAddress(String id, ClientUserVO clientUserVO) {
        ucDAO.updateMealsAddress(id, clientUserVO);
    }


    @Override
    public ClientUserVO getUserByTel(String tel) {
        return ucDAO.getUserByTel(tel);
    }

    @Override
    public ClientUserVO findUserById(String id) {
        return ucDAO.findByid(id);
    }

    @Override
    public void insertMealsAddress(MealsAddressVO mealsAddressVO) {
        if(mealsAddressVO != null){
            ucDAO.insertMealsAddress(mealsAddressVO);
        }
    }

    @Override
    public ClientUserVO findUserByTelAndPwd(String tel, String password) {
        return ucDAO.getUserByTelAndPwd(tel, password);
    }

    @Override
    public String getUserIdByToken(String token) {
        RedisPool redisPool = new RedisPool();
        String result = new String();
        try {
            result = redisPool.getJedis().get(token);
        } catch (Exception e) {
            logger.info(e.getMessage());
        }
        return result;
    }

    @Override
    public void update(String id, ClientUserVO clientUserVO) {
        ucDAO.update(id, clientUserVO);
    }

    @Override
    public void updateUserPwd(String id, String pwd) {
        ucDAO.updateUserPwd(id, pwd);
    }

    @Override
    public ClientUserVO findById(String id) {
        ClientUserVO cv = ucDAO.findOne(id);
        if (cv != null) {
            cv.setPassword("****");
            return cv;
        } else {
            return null;
        }
    }
}
