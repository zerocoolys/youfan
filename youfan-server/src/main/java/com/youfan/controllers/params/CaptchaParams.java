package com.youfan.controllers.params;

/**
 * Created by icepros on 15-8-31.
 */
public class CaptchaParams {
    //redis key 值
    private String captchaKey;
    //redis value
    private String captcha;
    //验证码存活时间
    private int aliveSeconds;

    public String getCaptchaKey() {
        return captchaKey;
    }

    public void setCaptchaKey(String captchaKey) {
        this.captchaKey = captchaKey;
    }

    public String getCaptcha() {
        return captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }

    public int getAliveSeconds() {
        return aliveSeconds;
    }

    public void setAliveSeconds(int aliveSeconds) {
        this.aliveSeconds = aliveSeconds;
    }
}
