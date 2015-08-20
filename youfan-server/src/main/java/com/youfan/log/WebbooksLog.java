package com.youfan.log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * @title WebbooksLog.java
 * @package com.youfan.log
 * @description 支付结果日志记录
 * @author ZhangHuaRong   
 * @update 2015年8月19日 下午2:23:42
 */
public class WebbooksLog {
	public static void recordWebbooks(String info){
		 Logger logger=LoggerFactory.getLogger(WebbooksLog.class.getName() + ".recordWebbooks");
		 logger.info(info);
		
	}
	
	public static void main(String[] args) {
		WebbooksLog.recordWebbooks("==========================");
	}
}
