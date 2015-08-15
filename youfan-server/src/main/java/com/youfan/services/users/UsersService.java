package com.youfan.services.users;

import com.youfan.controllers.objs.User;

/**
 * Created by yousheng on 15/8/15.
 */
public interface UsersService {

    public boolean isExists(String name);

    public User findOne(String name);
}
