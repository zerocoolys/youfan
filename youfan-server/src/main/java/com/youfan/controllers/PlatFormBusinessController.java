package com.youfan.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.UserException;
import com.youfan.services.users.MerchantUsersServer;

/**
 * Created by zhanghr on 15/8/17.
 */
@RestController
@RequestMapping(path = "/pBusiness")
public class PlatFormBusinessController {

	Logger logger = LoggerFactory.getLogger(PlatFormBusinessController.class);
	@Resource
	MerchantUsersServer merchantUsersServer;

	///////////////////////////////// 系统//////////////////////////////////////////
	///////////////////////////////// 客户//////////////////////////////////////////
	///////////////////////////////// 商家//////////////////////////////////////////
	/**
	 * 获取置顶状态的商家信息
	 * 
	 * @param status
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/merchant/getByStatus")
	public List<MerchantUserEntity> getByStatus(HttpServletRequest request, HttpServletResponse response) {
		try {
			Integer status = 0;
			if (request.getParameter("status") == null) {
				status = Integer.valueOf(request.getParameter("status"));
			}
			return merchantUsersServer.getMerchantByStatus(status);
		} catch (UserException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ArrayList<MerchantUserEntity>();
	}

	/**
	 * 商家 审核接口
	 * @param request
	 * @param response
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年8月26日 下午5:50:28
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/merchant/checkMerchant")
	public void checkMerchant(HttpServletRequest request, HttpServletResponse response) {
		Integer status = 0;
		if (request.getParameter("id") != null && request.getParameter("status") != null) {
			status = Integer.valueOf(request.getParameter("status"));
			merchantUsersServer.checkMerchant(request.getParameter("id"), status);
		}
	}

}
