package com.youfan.services.client.impl;

import com.youfan.services.client.CaptchaService;
import com.youfan.system.redis.RedisPool;
import com.youfan.utils.ObjectUtil;
import com.youfan.utils.StringUtil;
import com.youfan.utils.XXTEAUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by icepros on 15-8-31.
 */
@Service
public class CaptchaServiceImpl implements CaptchaService {

    private static Logger logger = LoggerFactory.getLogger(CaptchaServiceImpl.class);

    /**
     * 验证码缓存时长
     */
    private static int cacheSeconds= 300;

    /**
     * 验证码超时设限
     * 30秒
     */
    private static long timeoutThreshold= 30000;

    public CaptchaServiceImpl() {
        if ((cacheSeconds*1000)<=timeoutThreshold){
            logger.error("验证码服务配置有误, 验证码生命时长大于缓存失效时间");
        }
    }


    @Override
    public Object add(String captchaKey, int aliveSeconds, String captcha) {
        RedisPool redisPool = new RedisPool();
        redisPool.getJedis().setex(captchaKey, aliveSeconds, captcha);
        return redisPool;
    }

    @Override
    public boolean getCaptcha(String captchaKey) {
        RedisPool redisPool = new RedisPool();
        return redisPool.getJedis().exists(captchaKey);
    }
}
