package com.youfan.rest.support;

import com.alibaba.fastjson.JSON;
import com.youfan.controllers.support.Responses;
import com.youfan.data.models.MenuEntity;
import com.youfan.data.models.TestJson;
import com.youfan.data.models.UserEntity;
import com.youfan.exceptions.UserException;
import com.youfan.services.users.UsersService;
import com.youfan.system.config.JsonUtil;
import org.springframework.context.annotation.Scope;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.AbstractView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by perfection on 15-8-19.
 */
@RestController
@Scope("prototype")
@RequestMapping("/user")
public class UserController {

    @Resource
    private UsersService usersService;

    @RequestMapping(path = "/saveMerchantUserInfo", method = RequestMethod.POST, produces = "application/json")
    public UserEntity add(@RequestBody UserEntity userEntity) {
        try {
            usersService.saveMerchantUserInfo(userEntity);
        } catch (UserException ue) {
            System.out.println(ue.getMessage());
        }
        return userEntity;
    }

}
