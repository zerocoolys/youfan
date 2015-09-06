package com.youfan.commons.vo.server;

public class PayWayVO {

	String id;

	private String name;

	/**
	 * 支付方式代码
	 */
	private String code;

	private String iconUrl;

	/**
	 * 状态 -1删除 0暂停使用 1开启
	 */
	private Integer status;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getIconUrl() {
		return iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}
