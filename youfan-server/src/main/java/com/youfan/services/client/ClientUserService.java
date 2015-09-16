package com.youfan.services.client;

import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.commons.vo.client.MealsAddressVO;
import com.youfan.data.models.MealsAddressEntity;
import com.youfan.exceptions.UserException;

import java.util.List;

/**
 * Created by icepros on 15-8-25.
 */
public interface ClientUserService {

    /**
     * 用户端用户信息保存
     *
     * @return
     */
    void insert(ClientUserVO uc);

    /**
     * 用户端用户信息更改
     *
     * @return
     */
    void update(ClientUserVO uc);

    /**
     * 根据用户电话号码查询用户信息
     *
     * @param tel
     * @return
     * @throws UserException
     */
    ClientUserVO getUserByTel(String tel);

    ClientUserVO findUserById(String id);

    /**
     * 根据用户电话号码和密码 进行登陆
     *
     * @param tel
     * @param pwd
     * @return
     * @throws UserException
     */
    ClientUserVO findUserByTelAndPwd(String tel, String pwd);

    /**
     * 通过token 获取用户id
     *
     * @param token
     * @return
     */
    String getUserIdByToken(String token);

    /**
     * 通过 用户id 修改用户信息
     *
     * @param id
     * @param clientUserVO
     */
    void update(String id, ClientUserVO clientUserVO);

    void updateUserPwd(String id, String pwd);

    /**
     * 根据用户id查询用户信息
     *
     * @param id
     * @return
     */
    ClientUserVO findById(String id);

    void insertMealsAddress(MealsAddressVO mealsAddressVO);

    List<MealsAddressVO> findMAddressByUid(String uid);

    void updateMealsAddress(String id, MealsAddressVO mealsAddressVO);

    void deleteMealsAddress(String id, String dataStatus);
}
