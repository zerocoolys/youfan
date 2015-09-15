package com.youfan.controllers.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.commons.vo.client.MealsAddressVO;
import com.youfan.controllers.params.ClientUserParams;
import com.youfan.controllers.params.MealsAddressParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.data.models.MealsAddressEntity;
import com.youfan.services.client.ClientUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by icepros on 15-9-2.
 */
@RestController
@RequestMapping("/cuser")
public class CUserController {

    private static Logger logger = LoggerFactory.getLogger(CUserController.class);

    @Resource
    private ClientUserService userService;

    /**
     * 更新用户密码信息
     *
     * @return
     */
    @RequestMapping(path = "/pinfo", method = RequestMethod.POST, produces = "application/json")
    public Response updateUserPwd(@RequestBody String clientUserParamsStr) {

        ObjectMapper mapper = new ObjectMapper();
        ClientUserParams userParams = null;
        String userId = null;
        String userTel = null;
        try {
            userParams = mapper.readValue(clientUserParamsStr, ClientUserParams.class);
            userTel = userParams.getTel();
            userId = userService.getUserByTel(userTel).getId();
        } catch (Exception e) {
            return Responses.FAILED();
        }

        if (userId != null) {
            userService.updateUserPwd(userId, userParams.getPassword());
            return Responses.SUCCESS();
        } else {
            //登陆超时
            return Responses.FAILED();
        }
    }

    /**
     * 更新用户基本信息
     *
     * @return
     */
    @RequestMapping(path = "/binfo", method = RequestMethod.POST, produces = "application/json")
    public Response updateUserInfo(@RequestBody String clientUserParamsStr) {

        //String token = request.getHeader("Authorization");
        ObjectMapper mapper = new ObjectMapper();
        ClientUserParams userParams = null;
        String userId = null;
        try {
            userParams = mapper.readValue(clientUserParamsStr, ClientUserParams.class);
            userId = userParams.getUid();
        } catch (Exception e) {
            return Responses.FAILED();
        }

        if (userId != null) {
            ClientUserVO clientUserVO = new ClientUserVO();
            clientUserVO.setName(userParams.getName());
            clientUserVO.setSex(userParams.getSex());
            clientUserVO.setAge(userParams.getAge());
            clientUserVO.setJobs(userParams.getJobs());

            userService.update(userId, clientUserVO);
            return Responses.SUCCESS();
        } else {
            return Responses.FAILED();
        }
    }

    /**
     * 查询用户信息
     *
     * @param
     * @return
     */
    @RequestMapping(path = "/{id}", method = RequestMethod.GET, produces = "application/json")
    public Response getUserInfo(@PathVariable String id) {

        ClientUserVO clientUserVO = userService.findUserById(id);
        return Responses.SUCCESS().setPayload(clientUserVO);
    }

    /**
     * 送餐地址
     *
     * @param mealsAddressStr
     * @return
     */
    @RequestMapping(path = "/mealsaddress", method = RequestMethod.POST, produces = "application/json")
    public Response mealsAddress(@RequestBody String mealsAddressStr) {
        ObjectMapper mapper = new ObjectMapper();
        MealsAddressParams params = null;
        ClientUserVO cuVO = new ClientUserVO();
        MealsAddressVO maVO = new MealsAddressVO();
        List<MealsAddressVO> list = new ArrayList<MealsAddressVO>();
        try {
            params = mapper.readValue(mealsAddressStr, MealsAddressParams.class);
            maVO.setContact(params.getContact());
            maVO.setTel(params.getTel());
            maVO.setAddress(params.getAddress());
            maVO.setHouseNumber(params.getHouseNumber());
            maVO.setLabel(params.getLabel());

            list = userService.findUserById(params.getId()).getMealsAddress();

            list.add(maVO);

            cuVO.setMealsAddress(list);
            userService.updateMealsAddress(params.getId(), cuVO);
            userService.insertMealsAddress(maVO);
            return Responses.SUCCESS();
        } catch (Exception e) {
            logger.error(e.getMessage());
            return Responses.FAILED();
        }
    }

    /**
     * 送餐地址列表
     *
     * @param mealsAddressStr
     * @return
     */
    @RequestMapping(path = "/maddresslist", method = RequestMethod.GET, produces = "application/json")
    public Response mealsAddressList(@RequestBody String mealsAddressStr) {

        return null;
    }


    /**
     * 我的关注 存 商家店铺地址
     *
     * @param ucVO
     * @return
     */
    @RequestMapping(path = "/attention", method = RequestMethod.POST, produces = "application/json")
    public Response attention(@RequestBody ClientUserVO ucVO) {

        return null;
    }

    /**
     * 点赞
     *
     * @param ucVO
     * @return
     */
    @RequestMapping(path = "/praise", method = RequestMethod.POST, produces = "application/json")
    public Response praise(@RequestBody ClientUserVO ucVO) {

        return null;
    }

}
