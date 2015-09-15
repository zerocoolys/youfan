package com.youfan.commons.vo;

import java.util.Date;
import java.util.List;

/**
 * Created by xiaowei on 15-8-31.
 */
public class CommentVO {

    String id;

    String merchant_id;
    long order_id;

    String comment_user;

    String pid;//父评论

    String content;

    String replay_comment;

    boolean replayed;

    Date replay_date;

    Integer star;
    Date commentTime;

    String seller_id;

    Integer dataStatus = 0;

    List<String> img_url;

    Boolean is_hide_name;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMerchant_id() {
        return merchant_id;
    }

    public void setMerchant_id(String merchant_id) {
        this.merchant_id = merchant_id;
    }

    public long getOrder_id() {
        return order_id;
    }

    public void setOrder_id(long order_id) {
        this.order_id = order_id;
    }

    public String getComment_user() {
        return comment_user;
    }

    public void setComment_user(String comment_user) {
        this.comment_user = comment_user;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getStar() {
        return star;
    }

    public void setStar(Integer star) {
        this.star = star;
    }

    public Date getCommentTime() {
        return commentTime;
    }

    public void setCommentTime(Date commentTime) {
        this.commentTime = commentTime;
    }

    public Integer getDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(Integer dataStatus) {
        this.dataStatus = dataStatus;
    }

    public List<String> getImg_url() {
        return img_url;
    }

    public void setImg_url(List<String> img_url) {
        this.img_url = img_url;
    }

    public Boolean getIs_hide_name() {
        return is_hide_name;
    }

    public void setIs_hide_name(Boolean is_hide_name) {
        this.is_hide_name = is_hide_name;
    }

    public String getSeller_id() {
        return seller_id;
    }

    public void setSeller_id(String seller_id) {
        this.seller_id = seller_id;
    }

    public boolean isReplayed() {
        return replayed;
    }

    public void setReplayed(boolean replayed) {
        this.replayed = replayed;
    }

    public String getReplay_comment() {
        return replay_comment;
    }

    public void setReplay_comment(String replay_comment) {
        this.replay_comment = replay_comment;
    }

    public Date getReplay_date() {
        return replay_date;
    }

    public void setReplay_date(Date replay_date) {
        this.replay_date = replay_date;
    }
}
