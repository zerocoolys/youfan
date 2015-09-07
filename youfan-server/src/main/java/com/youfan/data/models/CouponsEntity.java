package com.youfan.data.models;

import static com.youfan.commons.Constants.COLLECTION_COUPONS;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created on 2015-08-21.
 * <p>
 * 优惠券实体类. // TODO 优惠券实体类实现.
 *
 * @author dolphineor
 */
@Document(collection = COLLECTION_COUPONS)
public class CouponsEntity {
	@Id
	private String id;

	// 用户id
	@Field("userid")
	private String userId;

	/**
	 * 优惠券名称
	 */
	
	private String title;
	
	/**
	 * 是否全场使用
	 */
	@Field("ifall")
	private Boolean ifAll;

	/**
	 * 非全场使用情况下 指定厨房
	 */
	@Field("kid")
	private String kitchenId;

	/**
	 * 优惠卷类型ID
	 */
	@Field("ctid")
	private String couponsTypeId;
	/**
	 * 有效期 具体日期
	 */
	@Field("vt")
	private Long validityTime;
	/**
	 * 创建时间
	 */
	@Field("ct")
	private Long createTime;
	/**
	 * 使用状态 (-1删除,0未使用,1已使用,)
	 */
	/**
	 * 更新时间
	 */
	@Field("ut")
	private Long updateTime;
	private Integer status;
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
	public String getCouponsTypeId() {
		return couponsTypeId;
	}
	public void setCouponsTypeId(String couponsTypeId) {
		this.couponsTypeId = couponsTypeId;
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
	
	
}
