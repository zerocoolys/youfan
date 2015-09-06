package com.youfan.commons;
/**
 *
 * @description TODO
 * @author ZhangHuaRong
 * @update 2015年9月1日 上午11:56:14
 */
public interface RedisKeyContants {

	//String P_RRE_D_YZM = "c:d_yzm:";

    /**
     * 订单的就餐方式
     * zq -> 自取
     * ps -> 配送
     *
     */
    String ORDER_REPAST_MODE_KEY = "youfan-order-repastMode-key";

    /**
     * 订单的支付方式:
     * alipay -> 支付宝
     * wx -> 微信
     * upacp -> 银联支付(适用于App支付, 限2015年元旦后的银联新商户使用, 需要开通银联全渠道支付服务.)
     * upmp -> 银联支付(适用于App支付.限2015年元旦之前的银联老客户使用和Ping++的个人工作室使用, 需开通银联手机支付服务.　注: 银联于2015年元旦正式将该服务整合为新的银联全渠道支付)
     * apple_pay -> Apple Pay(只适用于iOS, 且仅限iPhone6和iPhone6 plus能使用)
     */
    String ORDER_PAYMENT_WAY_KEY = "youfan-order-paymentWay-key";

}
