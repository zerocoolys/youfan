package com.youfan.controllers.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.controllers.params.ClientUserParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.client.ClientUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

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
        try {
            userParams = mapper.readValue(clientUserParamsStr, ClientUserParams.class);
            userId = userService.getUserIdByToken(userParams.getToken());
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
    public Response updateUserInfo(@RequestBody String clientUserParamsStr, HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        ObjectMapper mapper = new ObjectMapper();
        ClientUserParams userParams = null;
        String userId = null;
        try {
            userParams = mapper.readValue(clientUserParamsStr, ClientUserParams.class);
            userId = userService.getUserIdByToken(token);
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
     * @param ucVO
     * @return
     */
    @RequestMapping(path = "/info", method = RequestMethod.GET, produces = "application/json")
    public Response getUserInfo(@RequestBody ClientUserVO ucVO) {

        return null;
    }

    /**
     * 忘记密码
     *
     * @param ucVO
     * @return
     */
    @RequestMapping(path = "/forgetpwd", method = RequestMethod.POST, produces = "application/json")
    public Response forgetPwd(@RequestBody ClientUserVO ucVO) {

        return null;
    }

    /**
     * 重置密码
     *
     * @param ucVO
     * @return
     */
    @RequestMapping(path = "/resetpwd", method = RequestMethod.POST, produces = "application/json")
    public Response resetPwd(@RequestBody ClientUserVO ucVO) {

        return null;
    }

    /**
     * 送餐地址
     *
     * @param ucVO
     * @return
     */
    @RequestMapping(path = "/mealsaddress", method = RequestMethod.POST, produces = "application/json")
    public Response mealsAddress(@RequestBody ClientUserVO ucVO) {

        return null;
    }

    /**
     * 送餐地址列表
     *
     * @param ucVO
     * @return
     */
    @RequestMapping(path = "/mealsaddresslist", method = RequestMethod.POST, produces = "application/json")
    public Response mealsAddressList(@RequestBody ClientUserVO ucVO) {

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
