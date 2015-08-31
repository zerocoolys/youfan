package com.youfan.controllers.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by icepros on 15-8-31.
 */
@RestController
public class CaptchaController {

    private static Logger logger = LoggerFactory.getLogger(CaptchaController.class);

    public CaptchaController() {
        logger.info("正在构造验证码控制器...");
    }



}
