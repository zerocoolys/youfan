package com.youfan.commons.vo.merchant;

/**
 * @author xiaowei
 * @title MerchantResultVO
 * @package com.youfan.commons.vo.merchant
 * @description
 * @update 2015年09月09日. 上午11:31
 */
public class MerchantResultVO {
    MerchantUserVO mu;
    MerchantKitchenInfoVO mk;
    long cc;

    public MerchantResultVO(MerchantUserVO mu, MerchantKitchenInfoVO mk,long cc) {
        this.mu = mu;
        this.mk = mk;
        this.cc=cc;
    }

    public MerchantUserVO getMu() {
        return mu;
    }

    public void setMu(MerchantUserVO mu) {
        this.mu = mu;
    }

    public MerchantKitchenInfoVO getMk() {
        return mk;
    }

    public void setMk(MerchantKitchenInfoVO mk) {
        this.mk = mk;
    }

    public long getCc() {
        return cc;
    }

    public void setCc(long cc) {
        this.cc = cc;
    }
}
