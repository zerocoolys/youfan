package com.youfan.services.server.impl;

import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.commons.vo.ConditionVO;
import com.youfan.commons.vo.client.UserVO;
import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.commons.vo.server.CouponsVO;
import com.youfan.commons.vo.server.OrderVO;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.data.dao.server.ActiveDAO;
import com.youfan.data.dao.server.CouponsDAO;
import com.youfan.data.dao.server.CouponsTypeDAO;
import com.youfan.services.server.ActiveSupportService;

@Service("activeSupportService")
public class ActiveSupportServiceImpl implements ActiveSupportService {

	@Resource
	ActiveDAO activeDAO;

	@Resource
	CouponsTypeDAO couponsTypeDao;
	@Resource
	CouponsDAO couponsDAO;
	@Override
	public Object joinActive(Integer activeType, UserVO userVo) {
		//查询所有活动 再参加
		return null;
	}

	@Override
	public Object joinActive(String event, UserVO userVo) {
		ActiveVO activeVo = activeDAO.getByEvent(event);
		//设定若非 用户参加活动 不涉及订单的种类
		return excutActive(activeVo, userVo);
	}
	
	private Object excutActive(ActiveVO activeVo, UserVO userVo){
		//设定若非 用户参加活动 不涉及订单的种类
		if(activeVo.getActiveType()/100!=1){
			return Responses.FAILED().setCode(2).setMsg("活动类型不匹配");
		}
		//检查参加活动时间范围
		Long nowTime = new Date().getTime();//当前时间
		if(nowTime<activeVo.getStartTime()){
			return Responses.FAILED().setCode(3).setMsg("不在活动世间内，活动未开启");
		}
		if(nowTime>activeVo.getEndTime()){
			return Responses.FAILED().setCode(4).setMsg("不在活动世间内，活动已结束");
		}
		//检查参加活动条件
		if (checkConditions(activeVo.getUserConditions(), userVo)) {
			return  Responses.FAILED().setCode(5).setMsg("用户参数不匹配");
		}
		if(activeVo.getCouponsType()==1){
			//未设置优惠券类型 或者优惠券类型不存在情况
			if(activeVo.getCouponsTypeId()==null){
				return Responses.FAILED().setCode(6).setMsg("活动优惠类型未 不存在");
			}
			CouponsTypeVO cType = couponsTypeDao.findOne(activeVo.getCouponsTypeId());
			if(couponsTypeDao.findOne(activeVo.getCouponsTypeId())==null){
				return Responses.FAILED().setCode(6).setMsg("活动优惠类型  不存在");
			}
			//发优惠券
			CouponsVO couponsVo = new CouponsVO();
			couponsVo.setCreateTime(nowTime);
			couponsVo.setCouponsTypeId(activeVo.getCouponsTypeId());
			couponsVo.setUserId(userVo.getId());
			couponsVo.setIfAll(activeVo.isIfAll());
			if(!activeVo.isIfAll()){
				couponsVo.setKitchenId(activeVo.getKitchenId());
			}
			couponsVo.setStatus(0);
			couponsVo.setTitle(activeVo.getTitle()+"|"+cType.getTitle());
			couponsVo.setValidityTime(activeVo.getValidityTime());
			
			couponsDAO.insert(couponsVo);
		}else if(activeVo.getCouponsType()==2){
			//修改订单  活动类型为1XX不会出现修改订单
			return Responses.FAILED().setCode(6).setMsg("活动优惠类型不匹配");
		}
		Response response = null;
		return response;
	}

	@Override
	public Object joinActive(Integer activeType, UserVO userVo, OrderVO orderVo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object joinActive(String event, UserVO userVo, OrderVO orderVo) {
		ActiveVO activeVo = activeDAO.getByEvent(event);
		//设定若非 用户参加活动 不涉及订单的种类
		return excutActive(activeVo, userVo,orderVo);
	}

	private Object excutActive(ActiveVO activeVo, UserVO userVo, OrderVO orderVo){
		//设定若非 用户参加活动 不涉及订单的种类
		if(activeVo.getActiveType()/100!=2){
			return Responses.FAILED().setCode(2).setMsg("活动类型不匹配");
		}
		Long nowTime = new Date().getTime();//当前时间
		if(nowTime<activeVo.getStartTime()){
			return Responses.FAILED().setCode(3).setMsg("不在活动世间内，活动未开启");
		}
		if(nowTime>activeVo.getEndTime()){
			return Responses.FAILED().setCode(4).setMsg("不在活动世间内，活动已结束");
		}
		Response response = null;
		if (checkConditions(activeVo.getUserConditions(), userVo)) {
			response = Responses.FAILED().setCode(2).setMsg("用户参数不匹配");
		}
		return response;
	}
	private boolean checkConditions(List<ConditionVO> conditions, Object vo) {
		for (ConditionVO condition : conditions) {
			String voValue = getAttributeValue(vo, condition.getAttr());
			if (!checkAttribute(condition.getOper(), condition.getValue(), voValue)) {
				return false;
			}
		}
		return true;
	}

	public boolean checkAttribute(String oper, String value, String voValue) {
		try {
			switch (oper) {
			case "eq":
				return value == null ? false : value.equals(voValue);
			case "=":
				return value == null ? false : value.equals(voValue);
			case ">":
				return value == null ? false : value.equals(voValue);
			default:
				break;
			}
		} catch (NumberFormatException e) {
		}

		return false;
	}

	public String getAttributeValue(Object vo, String attr) {

		try {
			return (String) vo.getClass().getMethod("get" + attr.substring(0, 1).toUpperCase() + attr.substring(1, attr.length()))
					.invoke(vo, null);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static void main(String[] args) {
		// ActiveSupportServiceImpl service = new ActiveSupportServiceImpl();
		// UserVO user = new UserVO();
		// user.setId("ddddd");
		// OrderVO order = new OrderVO();
		// order.setDataStatus(2);
		// service.getAttributeValue(order, "dataStatus");
		Integer.valueOf("dd");
	}


}
