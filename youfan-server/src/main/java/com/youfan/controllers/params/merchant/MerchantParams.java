package com.youfan.controllers.params.merchant;

import com.youfan.controllers.params.MongoParams;

/**
 * 
 * @title MerchantUserParams.java
 * @package com.youfan.controllers.params.merchant
 * @description 商家信息 混合与查询参数 添加参数时 全部使用装箱类数据类型
 * @author QinghaiDeng   
 * @update 2015年9月10日 下午3:56:09
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public class MerchantParams extends MongoParams{

	private String userName;
	private String realName;
	private String phone;
	private Integer status;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
}
