package com.youfan.commons.vo;

import java.io.Serializable;

public class ConditionVO implements Serializable{

	
	 /**serialVersionUID TODO*/ 
	
	private static final long serialVersionUID = 3763164387115320090L;
	String attr;
	String oper;// 操作（eq,=,>,<,>=,<=）
	String value;// 值

	public String getAttr() {
		return attr;
	}

	public void setAttr(String attr) {
		this.attr = attr;
	}

	public String getOper() {
		return oper;
	}

	public void setOper(String oper) {
		this.oper = oper;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
