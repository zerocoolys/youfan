package com.youfan.data.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import static com.youfan.commons.Constants.COLLECTION_PAY_WAY;
/**
 * 支付渠道
 * @title PayWayEntity.java
 * @package com.youfan.data.models
 * @description TODO
 * @author QinghaiDeng   
 * @update 2015年9月6日 上午10:12:22
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
@Document(collection = COLLECTION_PAY_WAY)
public class PayWayEntity {

    @Id
    String id;
    
    private String name;
    
    /**
     * 支付方式代码
     */
    @Indexed(unique=true)
    private String code;
    
    @Field("icon_url")
    private String iconUrl;
    
    /**
     * 状态
     * -1删除
     * 	0暂停使用
     * 	1开启
     */
    private Integer status;

    @Field("ds")
	private Integer dataStatus=1;
	
	public Integer getDataStatus() {
		return dataStatus;
	}
	public void setDataStatus(Integer dataStatus) {
		this.dataStatus = dataStatus;
	}
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
