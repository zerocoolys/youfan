package com.youfan.controllers.objs;

import org.springframework.data.annotation.Id;

/**
 * Created by subdong on 15-8-27.
 */
public class Message {

    private String id;

    //消息查看状态
    private Integer status;//0 未读 ，1已读  2，删除

    //用户ID
    private Long receiverId;

    //消息所属状态
    private Integer receiverPort;// 2用户端， 3商家端

    //消息详细内容
    private String data;

    //消息时间
    private Long date;

    //消息状态
    private Integer code;

    //消息标题
    private String title;

    //消息摘要
    private String des;

    public String getId() {
        return id;
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

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
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

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id='" + id + '\'' +
                ", status=" + status +
                ", receiverId=" + receiverId +
                ", receiverPort=" + receiverPort +
                ", data='" + data + '\'' +
                ", date=" + date +
                ", code=" + code +
                ", title='" + title + '\'' +
                ", des='" + des + '\'' +
                '}';
    }
}
