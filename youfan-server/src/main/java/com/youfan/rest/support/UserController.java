package com.youfan.rest.support;

import com.youfan.controllers.objs.MerchantKitchenInfo;
import com.youfan.controllers.objs.MerchantUser;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.exceptions.UserException;
import com.youfan.services.users.MerchantUsersServer;
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
    private MerchantUsersServer merchantUsersServer;

    @RequestMapping(path = "/saveMerchantUserInfo", method = RequestMethod.POST, produces = "application/json")
    public MerchantUser add(@RequestBody MerchantUser merchantUser) {
        try {
            merchantUsersServer.saveMerchantUserInfo(merchantUser);
        } catch (UserException ue) {
            System.out.println(ue.getMessage());
        }
        return merchantUser;
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST, produces = "application/json")
    public MerchantUser login(@RequestBody MerchantUser merchantUser) {
        MerchantUser merchantUserRes = null;
        try {
            merchantUserRes = merchantUsersServer.login(merchantUser.getUserName(), merchantUser.getPassWord());
        } catch (UserException ue) {
            System.out.println(ue.getMessage());
        }
        return merchantUserRes;
    }

    @RequestMapping(path = "/register", method = RequestMethod.POST, produces = "application/json")
    public MerchantUser register(@RequestBody MerchantUser merchantUser) {
        MerchantUser merchantUserRes = null;
        try {
            merchantUserRes = merchantUsersServer.register(merchantUser.getUserName(), merchantUser.getPassWord());
        } catch (UserException ue) {
            System.out.println(ue.getMessage());
        }
        return merchantUserRes;
    }

    @RequestMapping(path = "/saveMerchantKitchenInfo", method = RequestMethod.POST, produces = "application/json")
    public MerchantKitchenInfo saveMerchantKitchenInfo(@RequestBody MerchantKitchenInfo merchantKitchenInfo) {
        MerchantKitchenInfo merchantKitchenInfoRes = null;
        try {
            merchantKitchenInfoRes = merchantUsersServer.saveMerchantKitchenInfo(merchantKitchenInfo);
        } catch (KitchenInfoException ke) {
            System.out.println(ke.getMessage());
        }
        return merchantKitchenInfoRes;
    }

    @RequestMapping(path = "/saveMerchantKitchenPicInfo", method = RequestMethod.POST, produces = "application/json")
    public MerchantKitchenInfo saveMerchantKitchenPicInfo(@RequestBody MerchantKitchenInfo merchantKitchenInfo) {
        MerchantKitchenInfo merchantKitchenInfoRes = null;
        try {
            merchantKitchenInfoRes = merchantUsersServer.saveMerchantKitchenPicInfo(merchantKitchenInfo);
        } catch (KitchenInfoException ke) {
            System.out.println(ke.getMessage());
        }
        return merchantKitchenInfoRes;
    }

    @RequestMapping(path = "/saveMerchantKitchenStoryInfo", method = RequestMethod.POST, produces = "application/json")
    public MerchantKitchenInfo saveMerchantKitchenStoryInfo(@RequestBody MerchantKitchenInfo merchantKitchenInfo) {
        MerchantKitchenInfo merchantKitchenInfoRes = null;
        try {
            merchantKitchenInfoRes = merchantUsersServer.saveMerchantKitchenStoryInfo(merchantKitchenInfo);
        } catch (KitchenInfoException ke) {
            System.out.println(ke.getMessage());
        }
        return merchantKitchenInfoRes;
    }
}
