package com.youfan.eventbus.events;

import java.io.Serializable;

/**
 * 
 * @description 优惠券发放
 * @author ZhangHuaRong   
 */
public class CouponEvent implements Serializable{

	
	
	private static final long serialVersionUID = 1L;
	
	private String name;
	
	private int num;
	
	

	public CouponEvent(String name, int num) {
		super();
		this.name = name;
		this.num = num;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}
	
	public void domain(){
		System.out.println(name+" ：已经发放");
	}
	

}
