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


//    @Override
//    public void insert(String captchaKey, String captcha) {
//        RedisPool redisPool = new RedisPool();
//        redisPool.getJedis().set(captchaKey, captcha);
//    }

    @Override
    public void setAlive(String captchaKey, int aliveSeconds, String captcha) {
        RedisPool redisPool = new RedisPool();
        redisPool.getJedis().setex(captchaKey, aliveSeconds, captcha);
    }

    @Override
    public String getCaptcha(String captchaKey) {
        RedisPool redisPool = new RedisPool();
        String result = new String();
        try {
            result = redisPool.getJedis().get(captchaKey);
        } catch (Exception e){
            logger.info(e.getMessage());
        }
        return result;
    }
}
