package com.youfan.controllers.client;

import com.youfan.commons.vo.client.UserVO;
import com.youfan.exceptions.UserException;
import com.youfan.services.client.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.AbstractView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by yousheng on 15/8/14.
 */
@RestController
@RequestMapping("/client")
public class LoginController {

    @Resource
    private UserService ucService;
    Logger logger = LoggerFactory.getLogger(LoginController.class);

    /**
     * 用户注册
     *
     * @param uc
     * @return
     */
    @RequestMapping(method = RequestMethod.POST, path = "/register", produces = "application/json")
    public void register(@RequestBody UserVO uc) {

        String tel = uc.getTel();

        uc.setLoginPwd("待完善");
        uc.setName("优饭" + tel.substring(tel.length() - 4, tel.length()));
        uc.setSex("待完善");
        uc.setAge("待完善");
        uc.setJobs("待完善");
        ucService.insert(uc);
    }

    /**
     * 用户登陆
     */
    @RequestMapping(method = RequestMethod.POST, path = "/login", produces = "application/json")
    public ModelAndView login(@RequestBody UserVO ucVO) {

        UserVO userClientVO = new UserVO();
        try {
            userClientVO = ucService.findUserByTelAndPwd(ucVO.getTel(), ucVO.getLoginPwd());
        } catch (UserException e) {
            System.out.println(e.getMessage());
        }

        Map<String, Object> ucMap = new HashMap<>();
        ucMap.put("result", userClientVO);
        AbstractView jsonView = new MappingJackson2JsonView();
        jsonView.setAttributesMap(ucMap);

        logger.info("find:" + jsonView);

        return new ModelAndView(jsonView);
    }
}
