package com.youfan.services.users;

import com.youfan.controllers.objs.User;
import com.youfan.exceptions.UserException;

/**
 * Created by yousheng on 15/8/15.
 */
public interface UsersService {

    public boolean isExists(String name);

    public User findOne(String name);

    public String findUserId(String name);


    /**
     * 验证用户名和密码是否匹配，
     *
     * @param username
     * @param pass
     * @return User 匹配则返回该用户数据
     */
    public User validate(String username, String pass) throws UserException;
}
