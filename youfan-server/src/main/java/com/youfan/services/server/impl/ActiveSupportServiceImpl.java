package com.youfan.services.server.impl;

import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.commons.vo.ConditionVO;
import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.commons.vo.server.CouponsVO;
import com.youfan.commons.vo.server.OrderVO;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.data.dao.server.ActiveDAO;
import com.youfan.data.dao.server.CouponsDAO;
import com.youfan.data.dao.server.CouponsTypeDAO;
import com.youfan.data.models.CouponsContentEntity;
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
	public Response joinActive(Integer activeType, ClientUserVO userVo) {
		// 查询所有活动 再参加
		return null;
	}

	@Override
	public Response joinActive(String event, ClientUserVO userVo) {
		ActiveVO activeVo = activeDAO.getByEvent(event);
		if(activeVo.getStatus()!=1){//活动未开启
			return Responses.FAILED().setCode(0).setMsg("该活动未开启");
		}
		// 设定若非 用户参加活动 不涉及订单的种类
		return excutActive(activeVo, userVo);
	}

	private Response excutActive(ActiveVO activeVo, ClientUserVO userVo) {
		// 设定若非 用户参加活动 不涉及订单的种类
		if (activeVo.getActiveType() / 100 != 1) {
			return Responses.FAILED().setCode(2).setMsg("活动类型不匹配");
		}
		// 检查参加活动时间范围
		Long nowTime = new Date().getTime();// 当前时间
		if (nowTime < activeVo.getStartTime()) {
			return Responses.FAILED().setCode(3).setMsg("不在活动时间内，活动未开启");
		}
		if (nowTime > activeVo.getEndTime()) {
			return Responses.FAILED().setCode(4).setMsg("不在活动时间内，活动已结束");
		}
		// 检查参加活动条件
		if (!checkConditions(activeVo.getUserConditions(), userVo)) {
			return Responses.FAILED().setCode(5).setMsg("用户参数不匹配");
		}
		if (activeVo.getCouponsType() == 1) {
			// 未设置优惠券类型 或者优惠券类型不存在情况
			if (activeVo.getCouponsTypeId() == null) {
				return Responses.FAILED().setCode(6).setMsg("活动优惠类型未设置");
			}
			System.out.println("优惠券类型：" + activeVo.getCouponsTypeId());
			CouponsTypeVO cType = couponsTypeDao.findOne(activeVo.getCouponsTypeId());
			System.out.println(cType);
			if (cType == null) {
				return Responses.FAILED().setCode(6).setMsg("活动优惠类型  不存在");
			}
			// 发优惠券
			CouponsVO couponsVo = new CouponsVO();
			couponsVo.setCreateTime(nowTime);
			couponsVo.setCouponsTypeId(activeVo.getCouponsTypeId());
			couponsVo.setUserId(userVo.getId());
			couponsVo.setIfAll(activeVo.isIfAll());
			if (!activeVo.isIfAll()) {
				couponsVo.setKitchenId(activeVo.getKitchenId());
			}
			couponsVo.setStatus(0);
			couponsVo.setTitle(activeVo.getTitle() + "|" + cType.getTitle());
			couponsVo.setValidityTime(activeVo.getValidityTime());
			couponsVo.setUpdateTime(null);
			couponsDAO.insert(couponsVo);
			return Responses.SUCCESS().setMsg("发放优惠券").setPayload(couponsVo).setCode(1);
		} else if (activeVo.getCouponsType() == 2) {
			// 修改订单 活动类型为1XX不会出现修改订单
			return Responses.FAILED().setCode(6).setMsg("活动优惠类型不匹配");
		}
		Response response = null;
		return response;
	}

	@Override
	public Response joinActive(Integer activeType, ClientUserVO userVo, OrderVO orderVo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Response joinActive(String event, ClientUserVO userVo, OrderVO orderVo) {
		ActiveVO activeVo = activeDAO.getByEvent(event);
		if(activeVo.getStatus()!=1){//活动未开启
			return Responses.FAILED().setCode(0).setMsg("该活动未开启");
		}
		// 设定若非 用户参加活动 不涉及订单的种类
		return excutActive(activeVo, userVo, orderVo);
	}

	private Response excutActive(ActiveVO activeVo, ClientUserVO userVo, OrderVO orderVo) {
		// 设定若非 用户参加活动 不涉及订单的种类
		if (activeVo.getActiveType() / 100 != 2) {
			return Responses.FAILED().setCode(2).setMsg("活动类型不匹配");
		}
		// 检查参加活动时间范围
		Long nowTime = new Date().getTime();// 当前时间
		if (nowTime < activeVo.getStartTime()) {
			return Responses.FAILED().setCode(3).setMsg("不在活动时间内，活动未开启");
		}
		if (nowTime > activeVo.getEndTime()) {
			return Responses.FAILED().setCode(4).setMsg("不在活动时间内，活动已结束");
		}
		// 检查参加活动条件
		if (!(activeVo.getUserConditions()==null||checkConditions(activeVo.getUserConditions(), userVo))) {
			return Responses.FAILED().setCode(5).setMsg("用户参数不匹配");
		}
		if (!(activeVo.getOrderConditions()==null||checkConditions(activeVo.getOrderConditions(), orderVo))) {
			return Responses.FAILED().setCode(6).setMsg("订单参数不匹配");
		}
		CouponsTypeVO cType = couponsTypeDao.findOne(activeVo.getCouponsTypeId());
		if (couponsTypeDao.findOne(activeVo.getCouponsTypeId()) == null) {
			return Responses.FAILED().setCode(8).setMsg("活动优惠类型  不存在");
		}
		if (activeVo.getCouponsType() == 1) {
			// 未设置优惠券类型 或者优惠券类型不存在情况
			if (activeVo.getCouponsTypeId() == null) {
				return Responses.FAILED().setCode(7).setMsg("活动优惠类型未设置");
			}

			// 发优惠券
			CouponsVO couponsVo = new CouponsVO();
			couponsVo.setCreateTime(nowTime);
			couponsVo.setCouponsTypeId(activeVo.getCouponsTypeId());
			couponsVo.setUserId(userVo.getId());
			couponsVo.setIfAll(activeVo.isIfAll());
			if (!activeVo.isIfAll()) {
				couponsVo.setKitchenId(activeVo.getKitchenId());
			}
			couponsVo.setStatus(0);
			couponsVo.setTitle(activeVo.getTitle() + "|" + cType.getTitle());
			couponsVo.setValidityTime(activeVo.getValidityTime());

			couponsDAO.insert(couponsVo);
			return Responses.SUCCESS().setMsg("发放优惠券").setPayload(couponsVo).setCode(1);
		} else if (activeVo.getCouponsType() == 2) {
			// 修改订单操作
			List<CouponsContentEntity> clist = cType.getContent();
			if (clist != null) {
				for (CouponsContentEntity cce : clist) {
					// cce.getCondition()==null时 无条件进行优惠处理
					if(cce.getConditions() != null&&cce.getConditions().size()!=0){
						boolean flag = false;
						for( ConditionVO condition : cce.getConditions()){//判定所有条件都满足
							if (condition != null &&checkAttribute(condition.getOper(),
									getAttributeValue(orderVo, condition.getAttr()),
									condition.getValue())) {
								flag = true;
							}else{
								flag=false;
								break;
							}
						}
						if(flag){
							if (cce.getType().equals("-")) {// 减免
								orderVo.setDiscountPrice(orderVo.getOrgPrice() - Double.valueOf(cce.getValue()));
							} else if (cce.getType().equals("*")) {// 折扣
								orderVo.setDiscountPrice(orderVo.getOrgPrice() * Double.valueOf(cce.getValue()));
							}
						}
					}
				}
			}
			return Responses.SUCCESS().setCode(1).setMsg("修改订单").setPayload(orderVo);
		}
		return Responses.FAILED().setCode(0);
	}

	private boolean checkConditions(List<ConditionVO> conditions, Object vo) {
		if (vo == null) {
			return false;
		}
		for (ConditionVO condition : conditions) {
			Object voValue = getAttributeValue(vo, condition.getAttr());
			
			if (!checkAttribute(condition.getOper(), voValue, condition.getValue())) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 
	 * @param oper
	 *            比较操作符
	 * @param realValue
	 *            实际值
	 * @param conditionValue
	 *            条件值
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月7日 下午1:59:42
	 */
	private boolean checkAttribute(String oper, Object realValue, Object conditionValue) {
//		System.out.println(realValue+" " +oper+" "+conditionValue);
		try {
			switch (oper) {
			case "eq":
				return conditionValue == null ? false : conditionValue.equals(realValue);
			case "=":
				return conditionValue == null ? false
						: Double.valueOf(realValue.toString()) == Double.valueOf(conditionValue.toString());
			case ">":
				return conditionValue == null ? false
						: Double.valueOf(realValue.toString()) > Double.valueOf(conditionValue.toString());
			default:
				break;
			}
		} catch (NumberFormatException e) {
		}

		return false;
	}

	private Object getAttributeValue(Object vo, String attr) {

		try {
			return vo.getClass()
					.getMethod("get" + attr.substring(0, 1).toUpperCase() + attr.substring(1, attr.length()))
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

}
