package com.youfan.commons.vo.server;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.youfan.data.models.CouponsContentEntity;

public class CouponsTypeVO {
	private String id;

	/**
	 * 优惠券针对端 2 客户端 3商家端
	 */
	private Integer port;

	/**
	 * 优惠券时效
	 */
	private Integer timeLine;

	private String kitchenId;

	/**
	 * 优惠券内容
	 */
	private List<CouponsContentEntity> content;
//	private JsonNode content;

	/**
	 * 优惠券描述
	 */
	private String desc;

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

	public String getKitchenId() {
		return kitchenId;
	}

	public void setKitchenId(String kitchenId) {
		this.kitchenId = kitchenId;
	}

	public List<CouponsContentEntity> getContent() {
		return content;
	}

	public void setContent(List<CouponsContentEntity> content) {
		this.content = content;
	}

//	public JsonNode getContent() {
//		return content;
//	}
//
//	public void setContent(JsonNode content) {
//		this.content = content;
//	}
	public String getDesc() {
		return desc;
	}

	

	public void setDesc(String desc) {
		this.desc = desc;
	}
	

	public static CouponsContentEntity convertToContent(Map<String,Object> cMap){
		CouponsContentEntity cce = new CouponsContentEntity();
		cce.setType(cMap.get("type").toString());
		cce.setValue(Double.valueOf(cMap.get("value").toString()));
		cce.setCondition(cMap.get("condition").toString());
		return cce ;
	}
}
