package com.youfan.controllers.params;

import com.youfan.commons.Pagination;

public class CouponsParams extends Pagination{
	private Integer port;
	private Integer timeLine;
	private String kitchenId;
	private Integer status;
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
	public String getKitchenId() {
		return kitchenId;
	}
	public void setKitchenId(String kitchenId) {
		this.kitchenId = kitchenId;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	
}
