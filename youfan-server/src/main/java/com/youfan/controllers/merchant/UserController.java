package com.youfan.controllers.merchant;

import com.youfan.controllers.objs.MerchantKitchenInfoVO;
import com.youfan.controllers.objs.MerchantUserVO;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.exceptions.UserException;
import com.youfan.services.users.MerchantUsersServer;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

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
    public MerchantUserVO add(@RequestBody MerchantUserVO merchantUser) {
        try {
            merchantUsersServer.saveMerchantUserInfo(merchantUser);
        } catch (UserException ue) {
            System.out.println(ue.getMessage());
        }
        return merchantUser;
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST, produces = "application/json")
    public MerchantUserVO login(@RequestBody MerchantUserVO merchantUser) {
        MerchantUserVO merchantUserRes = null;
        try {
            merchantUserRes = merchantUsersServer.login(merchantUser.getUserName());
        } catch (UserException ue) {
            System.out.println(ue.getMessage());
        }
        return merchantUserRes;
    }

    @RequestMapping(path = "/register", method = RequestMethod.POST, produces = "application/json")
    public Map<String, String> register(@RequestBody MerchantUserVO merchantUser) {
        Map<String, String> mapRes = null;
        try {
            mapRes = merchantUsersServer.register(merchantUser.getUserName(), merchantUser.getPassWord());
        } catch (UserException ue) {
            System.out.println(ue.getMessage());
        }
        return mapRes;
    }

    @RequestMapping(path = "/saveMerchantKitchenInfo", method = RequestMethod.GET, produces = "application/json")
    public MerchantKitchenInfoVO saveMerchantKitchenInfo(MerchantKitchenInfoVO merchantKitchenInfo) {
        MerchantKitchenInfoVO merchantKitchenInfoRes = null;
        try {
            merchantKitchenInfoRes = merchantUsersServer.saveMerchantKitchenInfo(merchantKitchenInfo);
        } catch (KitchenInfoException ke) {
            System.out.println(ke.getMessage());
        }
        return merchantKitchenInfoRes;
    }

    @RequestMapping(path = "/saveMerchantKitchenPicInfo", method = RequestMethod.POST, produces = "application/json")
    public MerchantKitchenInfoVO saveMerchantKitchenPicInfo(@RequestBody MerchantKitchenInfoVO merchantKitchenInfo) {
        MerchantKitchenInfoVO merchantKitchenInfoRes = null;
        try {
            merchantKitchenInfoRes = merchantUsersServer.saveMerchantKitchenPicInfo(merchantKitchenInfo);
        } catch (KitchenInfoException ke) {
            System.out.println(ke.getMessage());
        }
        return merchantKitchenInfoRes;
    }

    @RequestMapping(path = "/saveMerchantKitchenStoryInfo", method = RequestMethod.POST, produces = "application/json")
    public MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(@RequestBody MerchantKitchenInfoVO merchantKitchenInfo) {
        MerchantKitchenInfoVO merchantKitchenInfoRes = null;
        try {
            merchantKitchenInfoRes = merchantUsersServer.saveMerchantKitchenStoryInfo(merchantKitchenInfo);
        } catch (KitchenInfoException ke) {
            System.out.println(ke.getMessage());
        }
        return merchantKitchenInfoRes;
    }

    @RequestMapping(path = "/getMerchantKitchenStoryInfo", method = RequestMethod.GET, produces = "application/json")
    public MerchantKitchenInfoVO getMerchantKitchenStoryInfo(@RequestBody MerchantKitchenInfoVO merchantKitchenInfo) {
        MerchantKitchenInfoVO merchantKitchenInfoRes = null;
        try {
            merchantKitchenInfoRes = merchantUsersServer.saveMerchantKitchenStoryInfo(merchantKitchenInfo);
        } catch (KitchenInfoException ke) {
            System.out.println(ke.getMessage());
        }
        return merchantKitchenInfoRes;
    }
}
