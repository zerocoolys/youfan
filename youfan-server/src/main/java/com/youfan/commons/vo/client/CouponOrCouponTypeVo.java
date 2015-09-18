package com.youfan.commons.vo.client;

import com.youfan.commons.vo.server.CouponDetailVO;

import java.util.List;

/**
 * Created by subdong on 15-9-15.
 */
public class CouponOrCouponTypeVo {

    private String id;

    // 用户id
    private String userId;

    /**
     * 优惠券名称
     */

    private String title;
    /**
     * 是否全场使用
     */
    private String ifAll;

    /**
     * 非全场使用情况下 指定厨房
     */
    private String kitchenId;

    private String kitchenName;

    /**
     * 有效期
     * 具体日期
     */
    private Long validityTime;
    /**
     * 创建时间
     */
    private Long createTime;
    /**
     * 创建时间
     */
    private Long updateTime;

    private String activeId;

    /**
     * 优惠方式
     */
    private String type;

    /**
     * 活动优惠详情
     */
    private List<CouponDetailVO> details;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIfAll() {
        return ifAll;
    }

    public void setIfAll(String ifAll) {
        this.ifAll = ifAll;
    }

    public String getKitchenId() {
        return kitchenId;
    }

    public void setKitchenId(String kitchenId) {
        this.kitchenId = kitchenId;
    }

    public Long getValidityTime() {
        return validityTime;
    }

    public void setValidityTime(Long validityTime) {
        this.validityTime = validityTime;
    }

    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    public Long getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Long updateTime) {
        this.updateTime = updateTime;
    }

    public String getActiveId() {
        return activeId;
    }

    public void setActiveId(String activeId) {
        this.activeId = activeId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<CouponDetailVO> getDetails() {
        return details;
    }

    public void setDetails(List<CouponDetailVO> details) {
        this.details = details;
    }

    public String getKitchenName() {
        return kitchenName;
    }

    public void setKitchenName(String kitchenName) {
        this.kitchenName = kitchenName;
    }
}
