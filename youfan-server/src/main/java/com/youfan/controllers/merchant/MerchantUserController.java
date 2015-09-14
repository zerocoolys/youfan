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
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import redis.clients.jedis.Jedis;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by perfection on 15-8-19.
 */
@RestController
@Scope("prototype")
@RequestMapping("/user")
public class MerchantUserController {

    @Resource
    private Jedis jedis;

    @Resource
    private MerchantUsersService merchantUsersService;

    @RequestMapping(path = "/saveMerchantUserInfo", method = RequestMethod.POST, produces = "application/json")
    public Response add(@RequestBody MerchantUserVO merchantUser) {
        merchantUsersService.saveMerchantUserInfo(merchantUser);
        return Responses.SUCCESS().setCode(0).setPayload(merchantUser);
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST, produces = "application/json")
    public Response login(@RequestBody MerchantUserVO merchantUser) {
        Map map = merchantUsersService.login(merchantUser.getUserName());
        //code -1账户被删除，0账户不存在，1登陆成功
        switch (Integer.parseInt(map.get("code").toString())) {
            case 0:
                MerchantUserVO merchantUserRes = merchantUsersService.register(merchantUser.getUserName());
                if (merchantUserRes == null) {
                    return Responses.FAILED();
                } else {
                    String tmp = merchantUserRes.getId() + merchantUserRes.getUserName();
                    String token = DigestUtils.md5DigestAsHex(tmp.getBytes());
                    jedis.setex(token, (int) TimeUnit.DAYS.toSeconds(1), merchantUserRes.getId());
                    Map mapRes = new HashMap<>();
                    mapRes.put("token", token);
                    mapRes.put("user", merchantUserRes);
                    return Responses.SUCCESS().setPayload(mapRes);
                }
            case 1:
                MerchantUserVO merchantUserVO = (MerchantUserVO) map.get("merchantUserVO");
                String tmp = merchantUserVO.getId() + merchantUserVO.getUserName();
                String token = DigestUtils.md5DigestAsHex(tmp.getBytes());
                jedis.setex(token, (int) TimeUnit.DAYS.toSeconds(1), merchantUserVO.getId());
                Map mapRes = new HashMap<>();
                mapRes.put("token", token);
                mapRes.put("user", merchantUserVO);
                return Responses.SUCCESS().setPayload(mapRes);
            case -1:
                return Responses.SUCCESS();
            default:
                return Responses.FAILED();
        }
    }

    @RequestMapping(path = "/verifyToken", method = RequestMethod.POST, produces = "application/json")
    public Response verifyToken(@RequestBody String token) {
        String isToken = jedis.get(token);
        if (isToken == null) {
            return Responses.FAILED();
        } else {
            return Responses.SUCCESS();
        }
    }

//    @RequestMapping(path = "/register", method = RequestMethod.POST, produces = "application/json")
//    public Map<String, String> register(@RequestBody MerchantUserVO merchantUser) {
////        Map<String, String> mapRes = null;
////        mapRes = merchantUsersService.register(merchantUser.getUserName(), merchantUser.getPassWord());
////        return mapRes;
//        return null;
//    }

    @RequestMapping(path = "/saveMerchantKitchenInfo", method = RequestMethod.POST, produces = "application/json")
    public Response saveMerchantKitchenInfo(@RequestBody MerchantKitchenInfoVO merchantKitchenInfoVO) {
        MerchantKitchenInfoVO merchantKitchenInfoRes = merchantUsersService.
                saveMerchantKitchenInfo(merchantKitchenInfoVO);
        if (merchantKitchenInfoRes == null) {
            return Responses.FAILED();
        } else {
            return Responses.SUCCESS().setPayload(merchantKitchenInfoRes);
        }
    }

    @RequestMapping(path = "/saveMerchantKitchenPicInfo", method = RequestMethod.POST, produces = "application/json")
    public Response saveMerchantKitchenPicInfo(@RequestBody MerchantKitchenInfoVO merchantKitchenInfo) {
        MerchantKitchenInfoVO merchantKitchenInfoRes = null;
        merchantKitchenInfoRes = merchantUsersService.saveMerchantKitchenPicInfo(merchantKitchenInfo);
        return Responses.SUCCESS().setCode(0).setPayload(merchantKitchenInfoRes);
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
