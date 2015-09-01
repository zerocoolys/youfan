package com.youfan.exceptions;

public class ServerNoActiveDetailClazzException extends ServerException {

	public ServerNoActiveDetailClazzException(String clazz) {
		super("活动事件处理类:"+clazz+" 不存在");
		// TODO Auto-generated constructor stub
	}

}
