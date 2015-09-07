package com.youfan.data.models;

import static com.youfan.commons.Constants.COLLECTION_SERVER_COUPONS_TYPE;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * 优惠券类型
 * 
 * @title CouponsTypeEntity.java
 * @package com.youfan.data.models
 * @description TODO
 * @author QinghaiDeng
 * @update 2015年8月31日 下午4:51:10
 * @version V1.0 Copyright (c)2012 chantsoft-版权所有
 */
@Document(collection = COLLECTION_SERVER_COUPONS_TYPE)
public class CouponsTypeEntity {
	@Id
	private String id;

	/**
	 * 优惠券针对端 2 客户端 3商家端
	 */
	private Integer port;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 优惠券时效
	 */
	@Field("tl")
	private Integer timeLine;
	
	
	/**
	 * 是否为全场使用
	 */
	private Boolean ifAll;

	@Field("ct")
	private Long createTime;
	/**
	 * 优惠券内容
	 */
	private List<CouponsContentEntity> content;

	/**
	 * 优惠券描述
	 */
	private String desc;
	
	private Integer status;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getPort() {
		return port;
	}

	public void setPort(Integer port) {
		this.port = port;
	}

	public Integer getTimeLine() {
		return timeLine;
	}

	public void setTimeLine(Integer timeLine) {
		this.timeLine = timeLine;
	}

	public List<CouponsContentEntity> getContent() {
		return content;
	}

	public void setContent(List<CouponsContentEntity> content) {
		this.content = content;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public Boolean getIfAll() {
		return ifAll;
	}

	public void setIfAll(Boolean ifAll) {
		this.ifAll = ifAll;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

}
