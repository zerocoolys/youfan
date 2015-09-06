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
 * 短信验证码控制器
 * Created by icepros on 15-8-31.
 */
@RestController
@RequestMapping("/captcha")
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
            response = Responses.SUCCESS().setPayload(captchaService.getCaptcha(captchaParams.getCaptchaKey()));
                //response = Responses.SUCCESS().setCode(-1).setMsg("验证码失效");
        } catch (Exception e) {
            response = Responses.FAILED();
            logger.error(e.getMessage());
        }
        return response;
    }

    /**
     * 添加
     * @param captchaParamsStr
     * @return
     */
    @RequestMapping(method = RequestMethod.POST, path = "/add", produces = "application/json")
    public Response add(@RequestBody String captchaParamsStr) {
        ObjectMapper mapper = new ObjectMapper();
        CaptchaParams captchaParams = null;
        Response response = null;

        try {
            captchaParams = mapper.readValue(captchaParamsStr, CaptchaParams.class);
            captchaService.insert(captchaParams.getCaptchaKey(), captchaParams.getCaptcha());
            response = Responses.SUCCESS();
        } catch (Exception e) {
            response = Responses.FAILED();
            logger.error(e.getMessage());
        }
        return response;
    }

    /**
     * 在 redis 存储验证码时效 5 分钟
     * @param captchaParamsStr
     */
    @RequestMapping(method = RequestMethod.POST, path = "/alive", produces = "application/json")
    public Response setAlive(@RequestBody String captchaParamsStr){
        ObjectMapper objectMapper = new ObjectMapper();
        CaptchaParams captchaParams = null;
        Response response = null;

        try {
            captchaParams = objectMapper.readValue(captchaParamsStr, CaptchaParams.class);
            captchaService.setAlive(captchaParams.getCaptchaKey(), 300000, captchaParams.getCaptcha());
            response = Responses.SUCCESS();
        } catch (IOException e) {
            response = Responses.FAILED();
            logger.info(e.getMessage());
        }
        return response;
    }
}
