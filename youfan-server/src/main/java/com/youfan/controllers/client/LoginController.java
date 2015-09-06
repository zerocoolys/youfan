package com.youfan.controllers.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youfan.commons.vo.client.UserVO;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.exceptions.ServerNoActiveDetailClazzException;
import com.youfan.exceptions.ServerNoActiveEventException;
import com.youfan.exceptions.UserException;
import com.youfan.services.client.UserService;
import com.youfan.services.server.ActiveService;
import com.youfan.services.server.ActiveSupportService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.AbstractView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.youfan.commons.Constants.ACTIVE_TYPE;

/**
 * 客户端用户登陆控制器 Created by yousheng on 15/8/14.
 */
@RestController
@RequestMapping("/client")
public class LoginController {

	@Resource
	private UserService ucService;
	Logger logger = LoggerFactory.getLogger(LoginController.class);

	@Resource
	ActiveSupportService activeSupportService;

	/**
	 * 用户注册
	 *
	 * @param uc
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST, path = "/register", produces = "application/json")
	public Response register(@RequestBody UserVO uc) {

		Response response = null;
		UserVO userVO = new UserVO();

		// 设置日期格式
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String tel = uc.getTel();

		userVO.setTel(tel);
		userVO.setPassword(uc.getPassword());
		userVO.setName("优饭" + tel.substring(tel.length() - 4, tel.length()));
		userVO.setSex("待完善");
		userVO.setAge("待完善");
		userVO.setJobs("待完善");
		userVO.setRegisterDate(df.format(new Date()));

		try {
			if (ucService.getUserByTel(tel).getTel() != null) {
				response = Responses.FAILED();
			} else {
				ucService.insert(userVO);
				response = Responses.SUCCESS();
                /////////////// MrDeng添加活动参加功能 请此处完善代码时
                /////////////// 把这段代码移动到成功注册判定下/////////////////////////
//                Map<String, Object> paramsMap = new HashMap<>();
//                paramsMap.put("userVO", userVO);
//                try {
//                    activeSupportService.joinActive(ACTIVE_TYPE.CLIENT_REGISTER, "client_register", paramsMap);
//                } catch (ServerNoActiveDetailClazzException e1) {
//                    System.out.println("不存在[client_register]对应活动的处理方式 写入日志");
//                    logger.error("不存在[client_register]对应活动的处理方式 写入日志");
//                } catch (ServerNoActiveEventException e1) {
//                    System.out.println("不存在[client_register]对应活动");
//                }
                ////////////////////////////////////////////////////////////
			}
		} catch (Exception e) {
			response = Responses.FAILED();
			logger.error(e.getMessage());
		}

		return response;
	}

	/**
	 * 用户登陆
	 */
	@RequestMapping(method = RequestMethod.POST, path = "/login", produces = "application/json")
	public Response login(@RequestBody UserVO ucVO) {

		Response response = null;
		UserVO userClientVO = new UserVO();
		try {
			userClientVO = ucService.findUserByTelAndPwd(ucVO.getTel(), ucVO.getPassword());
			response = Responses.SUCCESS().setPayload(userClientVO);
			/////////////// MrDeng添加活动参加功能 请此处完善代码时
			/////////////// 把这段代码移动到成功登录判定下/////////////////////////
//			Map<String, Object> paramsMap = new HashMap<>();
//			paramsMap.put("userVO", userClientVO);
//			try {
////				activeSupportService.joinActive(ACTIVE_TYPE.CLIENT_LOGIN, "client_login", paramsMap);
//			} catch (ServerNoActiveDetailClazzException e1) {
//				System.out.println("不存在[client_register]对应活动的处理方式 写入日志");
//				logger.error("不存在[client_register]对应活动的处理方式 写入日志");
//			} catch (ServerNoActiveEventException e1) {
//				System.out.println("不存在[client_register]对应活动");
//			}
			////////////////////////////////////////////////////////////
		} catch (Exception e) {
			response = Responses.FAILED();
			logger.error(e.getMessage());
		}
		return response;
	}
}
