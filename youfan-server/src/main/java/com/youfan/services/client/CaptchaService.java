package com.youfan.services.client;

/**
 * Created by icepros on 15-8-31.
 */
public interface CaptchaService {

    /**
     * 设置验证码存活时间
     * @param captchaKey
     * @param aliveSeconds
     * @param captcha
     * @return
     */
    Object add(String captchaKey, int aliveSeconds, String captcha);

    /**
     * 校验 token 通过 token 获取验证码
     * @param captchaKey
     * @return
     */
    boolean getCaptcha(String captchaKey);
}
