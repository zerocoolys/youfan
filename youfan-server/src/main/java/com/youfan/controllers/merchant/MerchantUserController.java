package com.youfan.controllers.merchant;

import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.exceptions.UserException;
import com.youfan.services.merchant.MerchantUsersService;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by perfection on 15-8-19.
 */
@RestController
@Scope("prototype")
@RequestMapping("/user")
public class MerchantUserController {

    @Resource
    private MerchantUsersService merchantUsersService;

    @RequestMapping(path = "/saveMerchantUserInfo", method = RequestMethod.POST, produces = "application/json")
    public Response add(@RequestBody MerchantUserVO merchantUser) {
        merchantUsersService.saveMerchantUserInfo(merchantUser);
        return Responses.SUCCESS().setCode(0).setPayload(merchantUser);
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST, produces = "application/json")
    public Response login(@RequestBody MerchantUserVO merchantUser) {
        MerchantUserVO merchantUserRes = merchantUsersService.login(merchantUser.getUserName());
        return Responses.SUCCESS().setCode(0).setPayload(merchantUserRes);
    }

    @RequestMapping(path = "/register", method = RequestMethod.POST, produces = "application/json")
    public Map<String, String> register(@RequestBody MerchantUserVO merchantUser) {
        Map<String, String> mapRes = null;
        mapRes = merchantUsersService.register(merchantUser.getUserName(), merchantUser.getPassWord());
        return mapRes;
    }

    @RequestMapping(path = "/saveMerchantKitchenInfo", method = RequestMethod.POST, produces = "application/json")
    public MerchantKitchenInfoVO saveMerchantKitchenInfo(@RequestBody MerchantKitchenInfoVO merchantKitchenInfoVO) {
        MerchantKitchenInfoVO merchantKitchenInfoRes = null;
        merchantKitchenInfoRes = merchantUsersService.saveMerchantKitchenInfo(merchantKitchenInfoVO);
        return merchantKitchenInfoRes;
    }

    @RequestMapping(path = "/saveMerchantKitchenPicInfo", method = RequestMethod.POST, produces = "application/json")
    public MerchantKitchenInfoVO saveMerchantKitchenPicInfo(@RequestBody MerchantKitchenInfoVO merchantKitchenInfo) {
        MerchantKitchenInfoVO merchantKitchenInfoRes = null;
        merchantKitchenInfoRes = merchantUsersService.saveMerchantKitchenPicInfo(merchantKitchenInfo);
        return merchantKitchenInfoRes;
    }

    @RequestMapping(path = "/saveMerchantKitchenStoryInfo", method = RequestMethod.POST, produces = "application/json")
    public Response saveMerchantKitchenStoryInfo(@RequestBody MerchantKitchenInfoVO merchantKitchenInfo) {
        MerchantKitchenInfoVO merchantKitchenInfoRes = merchantUsersService.saveMerchantKitchenStoryInfo(merchantKitchenInfo);
        return Responses.SUCCESS().setCode(0).setPayload(merchantKitchenInfoRes);
    }

    @RequestMapping(path = "/saveMyHobby", method = RequestMethod.POST, produces = "application/json")
    public Response saveMyHobby(@RequestBody MerchantKitchenInfoVO merchantKitchenInfo) {
        MerchantKitchenInfoVO merchantKitchenInfoRes = merchantUsersService.saveMyHobby(merchantKitchenInfo);
        return Responses.SUCCESS().setCode(0).setPayload(merchantKitchenInfoRes);
    }

    @RequestMapping(path = "/getMerchantUserInfo", method = RequestMethod.POST, produces = "application/json")
    public Response getMerchantUserInfo(@RequestBody MerchantUserVO MerchantUserVO) {
        MerchantUserVO merchantUserVORes = merchantUsersService.getMerchantUserInfo(MerchantUserVO.getId());
        return Responses.SUCCESS().setCode(0).setPayload(merchantUserVORes);
    }

    @RequestMapping(path = "/getMerchantKitchenInfo", method = RequestMethod.POST, produces = "application/json")
    public Response getMerchantKitchenInfo(@RequestBody MerchantKitchenInfoVO merchantKitchenInfoVO) {
        MerchantKitchenInfoVO merchantKitchenInfoVORes = merchantUsersService.getMerchantKitchenBaseInfo(merchantKitchenInfoVO.getId());
        return Responses.SUCCESS().setCode(0).setPayload(merchantKitchenInfoVORes);
    }
}
