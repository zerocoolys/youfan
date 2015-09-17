package com.youfan.data.models;

import com.youfan.commons.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

/**
 * Created by xiaowei on 15-8-27.
 */
@Document(collection = Constants.COLLECTION_COMMENT)
public class CommentEntity {

    @Id
    String id;

    @Field(Constants.COMMENT_MERCHANT_ID)
    String merchant_id;//商家店铺id

    String merchant_user;
    long order_id;

    @Field(Constants.COMMENT_USER)
    String comment_user;

    @Field(Constants.COMMENT_USER_ID)
    String user_id;

    @Field(Constants.SELLER_ID)
    String seller_id;//商家id

    String pid;//父评论

    String content;

    boolean replayed;

    @Field(Constants.COMMENT_REPLAY_COMMENT)
    String replay_comment;

    @Field(Constants.COMMENT_REPLAY_DATE)
    Date replay_date;

    Integer star;
    @Field(Constants.COMMENT_TIME)
    Date commentTime;

    @Field(Constants.DATA_STATUS)
    Integer dataStatus = 1;

    List<String> img_url;


    @Field(Constants.COMMENT_IS_HIDE_NAME)
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

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getMerchant_user() {
        return merchant_user;
    }

    public void setMerchant_user(String merchant_user) {
        this.merchant_user = merchant_user;
    }
}
