package com.youfan.services.server;

import com.youfan.commons.vo.User;
import com.youfan.exceptions.UserException;

/**
 * Created by yousheng on 15/8/15.
 */
public interface UsersService {

    boolean isExists(String name);

    User findOne(String name);

    String findUserId(String name);


    /**
     * 验证用户名和密码是否匹配，
     *
     * @param username
     * @param pass
     * @return User 匹配则返回该用户数据
     */
    User validate(String username, String pass) throws UserException;
}
