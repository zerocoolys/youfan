package com.youfan.services.client;

/**
 * Created by icepros on 15-8-31.
 */
public interface CaptchaService {

    /**
     * 添加数据
     * @param captchaKey
     * @param captcha
     * @return
     */
    void insert(String captchaKey, String captcha);

    /**
     * 设置验证码存活时间
     * @param captchaKey
     * @param aliveSeconds
     * @param captcha
     * @return
     */
    void setAlive(String captchaKey, int aliveSeconds, String captcha);

    /**
     * 通过 key 获得 keyValue
     * @param captchaKey
     * @return
     */
    String getCaptcha(String captchaKey);
}
