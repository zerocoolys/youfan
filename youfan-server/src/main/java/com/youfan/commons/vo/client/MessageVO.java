package com.youfan.commons.vo.client;

import com.youfan.utils.ConfigUtil;
import com.youfan.utils.HttpClientUtil;

import java.net.URLEncoder;
import java.util.Date;

/**
 * Created by subdong on 15-8-27.
 */
public class MessageVO {

    private String id;

    //消息查看状态
    private Integer status;//0 未读 ，1已读  2，删除

    //用户ID
    private String receiverId;

    //消息所属状态
    private Integer receiverPort;// 2用户端， 3商家端

    //消息详细内容
    private String data;

    //消息时间
    private Long date = new Date().getTime();

    //消息状态
    private Integer code;

    //消息标题
    private String title;

    private Integer dataStatus = 1;


    public String getId() {
        return id;
    }


    public MessageVO() {
    }

    public MessageVO(Integer status, String receiverId, Integer receiverPort, String data, Integer code, String title, Integer dataStatus) {
        super();
        this.status = status;
        this.receiverId = receiverId;
        this.receiverPort = receiverPort;
        this.data = data;
        this.code = code;
        this.title = title;
        this.dataStatus = dataStatus;
    }


    public void setId(String id) {
        this.id = id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public Integer getReceiverPort() {
        return receiverPort;
    }

    public void setReceiverPort(Integer receiverPort) {
        this.receiverPort = receiverPort;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Long getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = date;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

public Integer getDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(Integer dataStatus) {
        this.dataStatus = dataStatus;
    }


        public int sendMsg() {
        HttpClientUtil h = new HttpClientUtil();
        int result = 0;
        try {
            h.open(ConfigUtil.getString("serverUrl"), "get");
            h.addParameter("toId", receiverId.toString());
            h.addParameter("toPort", receiverPort.toString());
            h.addParameter("status", status.toString());
            h.addParameter("data", URLEncoder.encode(data, "utf-8"));
            h.addParameter("date", date.toString());
            h.addParameter("code", code.toString());
            h.addParameter("dataStatus", dataStatus.toString());
            h.setRequestHeader("Cookie", "Language=zh_CN;UserAgent=PC");
            result = h.send();
            h.getResponseBodyAsString("utf-8");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            h.close();
        }

        return result;
    }
}
