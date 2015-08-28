package com.youfan.services.client;

import com.youfan.controllers.objs.UserClientVO;
import com.youfan.exceptions.UserException;

/**
 * Created by icepros on 15-8-25.
 */
public interface ClientUserService {

    /**
     * 用户端用户信息保存
     *
     * @return
     */
    void insert(UserClientVO uc);

    /**
     * 用户端用户信息更改
     *
     * @return
     */
    void update(UserClientVO uc);

    /**
     * 查询所有用户端用户信息
     */
    void fetchAllUC();

    /**
     * 根据用户电话号码查询用户信息
     *
     * @param tel
     * @return
     * @throws UserException
     */
    UserClientVO getUserByTel(String tel) throws UserException;

    /**
     * 根据用户电话号码和密码 进行登陆
     *
     * @param tel
     * @param pwd
     * @return
     * @throws UserException
     */
    UserClientVO findUserByTelAndPwd(String tel, String pwd) throws UserException;
}
