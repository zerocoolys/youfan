package com.youfan.controllers.params;

import com.youfan.commons.Pagination;

public class ActiveParams extends Pagination{
	
	private String event;
	private String title;
	private Integer status;
	public String getEvent() {
		return event;
	}
	public void setEvent(String event) {
		this.event = event;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	

}
