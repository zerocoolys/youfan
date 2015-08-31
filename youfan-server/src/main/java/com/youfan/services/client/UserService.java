package com.youfan.services.client;

import com.youfan.commons.vo.client.UserVO;
import com.youfan.exceptions.UserException;

/**
 * Created by icepros on 15-8-25.
 */
public interface UserService {

    /**
     * 用户端用户信息保存
     *
     * @return
     */
    void insert(UserVO uc);

    /**
     * 用户端用户信息更改
     *
     * @return
     */
    void update(UserVO uc);

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
    UserVO getUserByTel(String tel) throws UserException;

    /**
     * 根据用户电话号码和密码 进行登陆
     *
     * @param tel
     * @param pwd
     * @return
     * @throws UserException
     */
    UserVO findUserByTelAndPwd(String tel, String pwd) throws UserException;
}
