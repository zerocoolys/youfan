package com.youfan.log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * @description 支付日志记录
 * @author ZhangHuaRong   
 */
public class ChargeLog {
	private static Logger logger = LoggerFactory.getLogger(ChargeLog.class.getName() + ".chargeLog");
	
	public static void chargeLog(String orderNo,String created,String amount){
		StringBuffer bf = new StringBuffer();
		bf.append(orderNo).append("|").append(created.toString()).append("|").append(amount.toString());
		logger.info(bf.toString());
	}

	
	
	public static void main(String[] args) {
		ChargeLog.chargeLog("12345", "2324234E", "100.0");
	}
}
