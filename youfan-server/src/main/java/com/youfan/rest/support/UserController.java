package com.youfan.rest.support;

import com.youfan.controllers.objs.MerchantUser;
import com.youfan.exceptions.UserException;
import com.youfan.services.users.UsersService;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

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
    public MerchantUser add(@RequestBody MerchantUser merchantUser) {
        try {
            usersService.saveMerchantUserInfo(merchantUser);
        } catch (UserException ue) {
            System.out.println(ue.getMessage());
        }
        return merchantUser;
    }

}
