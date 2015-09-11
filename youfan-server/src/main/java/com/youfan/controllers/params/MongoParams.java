package com.youfan.controllers.params;

public interface MongoParams {

	/**
	 * 
	 * @return
	 * @description 获取数据 标志数据是否删除 兼容使用status和dataStatus
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 上午9:56:38
	 */
	public Integer getStatus();
	public Integer getDataStatus();
}
