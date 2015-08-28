package com.youfan.controllers.params;

/**
 * Created on 2015-08-28.
 *
 * @author dolphineor
 */
public class ChargeParams {

    private String subject;     // 商品的标题, 该参数最长为32个Unicode字符, 银联全渠道(upacp/upacp_wap)限制在32个字节.

    private String body;        // 商品的描述信息, 该参数最长为128个Unicode字符, yeepay_wap对于该参数长度限制为100个Unicode字符.

    private int amount;         // 订单总金额, 单位为对应币种的最小货币单位, 例如: 人民币为分(如订单总金额为1元, 此处请填100)

    private String orderNo;     // 订单号

    private String channel;     // 支付使用的第三方支付渠道

    private String currency;    // 货币代码

    private String clientIp;    // 发起支付请求终端的IP地址, 格式为 IPV4


    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getClientIp() {
        return clientIp;
    }

    public void setClientIp(String clientIp) {
        this.clientIp = clientIp;
    }
}
