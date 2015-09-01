package com.youfan.controllers.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youfan.controllers.params.CaptchaParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.client.CaptchaService;
import com.youfan.utils.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.IOException;

/**
 * Created by icepros on 15-8-31.
 */
@RestController
@RequestMapping("/register")
public class CaptchaController {

    private static Logger logger = LoggerFactory.getLogger(CaptchaController.class);

    @Resource
    private CaptchaService captchaService;

    public CaptchaController() {
        logger.info("正在构造验证码控制器...");
    }


    /**
     * 通过 captchaKey 查询验证码时效
     * @param captcha
     * @return
     */
    @RequestMapping(method = RequestMethod.POST, path = "/verify", produces = "application/json")
    public Response verify(@RequestBody String captcha){

        ObjectMapper mapper = new ObjectMapper();
        CaptchaParams captchaParams = null;
        Response response = null;
        try {
            captchaParams = mapper.readValue(captcha, CaptchaParams.class);
            System.out.println(captchaParams.getCaptchaKey());
            response = Responses.SUCCESS().setPayload(captchaService.getCaptcha(captchaParams.getCaptchaKey())) ;
        } catch (Exception e) {
            response = Responses.FAILED();
            logger.error(e.getMessage());
        }
        return response;
    }

    /**
     * 在 redis 存储验证码时效
     * @param captchaParamsStr
     */
    @RequestMapping(method = RequestMethod.POST, path = "/captcha", produces = "application/json")
    public void addCaptchaToRedis(@RequestBody String captchaParamsStr){

        ObjectMapper objectMapper = new ObjectMapper();
        CaptchaParams captchaParams = null;

        try {
            captchaParams = objectMapper.readValue(captchaParamsStr, CaptchaParams.class);
        } catch (IOException e) {
            e.printStackTrace();

        }

        captchaService.add(captchaParams.getCaptchaKey(), 60000, captchaParams.getCaptcha());
    }
}
