package com.youfan.services.server.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.data.dao.server.ActiveDAO;
import com.youfan.exceptions.ServerNoActiveDetailClazzException;
import com.youfan.exceptions.ServerNoActiveEventException;
import com.youfan.services.active.ActiveDetail;
import com.youfan.services.server.ActiveSupportService;

@Service("activeSupportService")
public class ActiveSupportServiceImpl implements ActiveSupportService {

	@Resource
	ActiveDAO activeDAO;

	@Override
	public Object joinActive(String event, Map<String, Object> pramasMap)
			throws ServerNoActiveEventException, ServerNoActiveDetailClazzException {

		// 查询activeType类型的活动
		try {
			ActiveVO active = activeDAO.getByEvent(event);
			if (active == null) {
				throw new ServerNoActiveEventException(event);
			}
			try {
				Class<?> activeDetailClazz = Class.forName(active.getActiveDetailClazz());// "com.youfan.services.active.impl.LoginActiveDetail"
				ActiveDetail activeDetail = (ActiveDetail) activeDetailClazz.newInstance();
				return activeDetail.active(new ActiveVO(), pramasMap);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
				throw new ServerNoActiveDetailClazzException(active.getActiveDetailClazz());
			}

		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static void main(String[] args) {
		ActiveSupportServiceImpl assi = new ActiveSupportServiceImpl();
		try {
			assi.joinActive("login_active", null);
		} catch (ServerNoActiveEventException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServerNoActiveDetailClazzException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
