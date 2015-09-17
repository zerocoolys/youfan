package com.youfan.commons.vo.server;

import java.util.List;

/**
 * Created on 2015-08-21.
 * <p>
 * 优惠券VO. // TODO 优惠券VO实现.
 *
 * @author dolphineor
 */
public class CouponVO {

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
	private Boolean ifAll;

	/**
	 * 非全场使用情况下 指定厨房
	 */
	private String kitchenId;

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
	
	/**
	 * 使用状态 (-1删除,0未使用,1已使用,)
	 */
	private Integer status;
	private Integer dataStatus=1;
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

	public Boolean getIfAll() {
		return ifAll;
	}

	public void setIfAll(Boolean ifAll) {
		this.ifAll = ifAll;
	}

	public String getKitchenId() {
		return kitchenId;
	}

	public void setKitchenId(String kitchenId) {
		this.kitchenId = kitchenId;
	}

	public Long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}


	public Long getValidityTime() {
		return validityTime;
	}

	public void setValidityTime(Long validityTime) {
		this.validityTime = validityTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Long getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Long updateTime) {
		this.updateTime = updateTime;
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


}
