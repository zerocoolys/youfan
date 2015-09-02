package com.youfan.exceptions;

public class ServerNoActiveEventException extends ServerException {

	public ServerNoActiveEventException(String eventName) {
		super(eventName + " 不存在");
	}

}
