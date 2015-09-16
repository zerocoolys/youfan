package com.youfan.controllers.client;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.commons.vo.client.MealsAddressVO;
import com.youfan.controllers.params.MealsAddressParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.client.ClientUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by icepros on 15-9-16.
 */
@RestController
@RequestMapping("/address")
public class AddressController {

    private static Logger logger = LoggerFactory.getLogger(CUserController.class);

    @Resource
    private ClientUserService userService;

    /**
     * 送餐地址
     *
     * @param mealsAddressStr
     * @return
     */
    @RequestMapping(path = "/a_info", method = RequestMethod.POST, produces = "application/json")
    public Response add(@RequestBody String mealsAddressStr) {
        ObjectMapper mapper = new ObjectMapper();
        MealsAddressParams params = null;
        ClientUserVO cuVO = new ClientUserVO();
        MealsAddressVO maVO = new MealsAddressVO();

        try {
            params = mapper.readValue(mealsAddressStr, MealsAddressParams.class);
            maVO.setUid(params.getUid());
            maVO.setContact(params.getContact());
            maVO.setTel(params.getTel());
            maVO.setAddress(params.getAddress());
            maVO.setHouseNumber(params.getHouseNumber());
            maVO.setLabel(params.getLabel());

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
     * @param uid
     * @return
     */
    @RequestMapping(path = "/info/{uid}", method = RequestMethod.GET, produces = "application/json")
    public Response query(@PathVariable String uid) {
        List<MealsAddressVO> result = new ArrayList<>();
        try {
            result = userService.findMAddressByUid(uid);
            return Responses.SUCCESS().setPayload(result);
        } catch (Exception e) {
            logger.error(e.getMessage());
            return Responses.FAILED();
        }
    }

    @RequestMapping(path = "/u_info", method = RequestMethod.POST, produces = "application/json")
    public void update(@RequestBody String mealsAddressStr){
        ObjectMapper mapper = new ObjectMapper();
        MealsAddressParams params = null;
        MealsAddressVO maVO = new MealsAddressVO();

        try {
            params = mapper.readValue(mealsAddressStr, MealsAddressParams.class);
            maVO.setContact(params.getContact());
            maVO.setTel(params.getTel());
            maVO.setAddress(params.getAddress());
            maVO.setHouseNumber(params.getHouseNumber());
            maVO.setLabel(params.getLabel());

            userService.updateMealsAddress(params.getId(), maVO);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }

    @RequestMapping(path = "/r_info/", method = RequestMethod.POST, produces = "application/json")
    public void remove(@RequestBody String mealsAddressStr){
        ObjectMapper mapper = new ObjectMapper();
        MealsAddressParams params = null;
        MealsAddressVO maVO = new MealsAddressVO();

        try {
            params = mapper.readValue(mealsAddressStr, MealsAddressParams.class);
            maVO.setDataStatus(params.getDataStatus());

            userService.updateMealsAddress(params.getId(), maVO);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }
}
