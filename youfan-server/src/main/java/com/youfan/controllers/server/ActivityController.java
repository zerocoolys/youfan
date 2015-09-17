package com.youfan.controllers.server;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.commons.vo.server.OrderVO;
import com.youfan.controllers.support.Response;
import com.youfan.services.client.ClientUserService;
import com.youfan.services.server.ActiveSupportService;

/**
 * 
 * @title ActivityController.java
 * @package com.youfan.controllers.server
 * @description 活动控制器
 * @author QinghaiDeng   
 * @update 2015年9月17日 上午10:47:24
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
@RestController
@RequestMapping(path = "/active")
public class ActivityController {
	@Resource
	ClientUserService clientUserService;
	@Resource
	ActiveSupportService activeSupportService;
	@RequestMapping(method = RequestMethod.GET, path = "/test")
	public Response test(HttpServletRequest request, HttpServletResponse response) {
		// return activeSupportService.joinActive("client_register",
		// userDAO.getUserByTel("13980041343"));
		ClientUserVO user = clientUserService.getUserByTel("13980041343");
		user.setSex("男");
		OrderVO ov = new OrderVO();
		ov.setOrgPrice(1000);

		return activeSupportService.joinActive("client_register_10", user);
	}
}
