package com.youfan.services.active.impl;

import java.util.Date;
import java.util.Map;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.commons.vo.server.CouponVO;
import com.youfan.data.dao.server.CouponDAO;
import com.youfan.services.active.ActiveDetail;

public class RegisterActiveDetail implements ActiveDetail {

	@Override
	public Object active(ActiveVO active, Map<String, Object> pramsMap, CouponDAO couponsDAO) {
		// TODO Auto-generated method stub
		//得到用户
		ClientUserVO user  = (ClientUserVO) pramsMap.get("userVO");
		//判定用户是否满足活动条件

		//
		if (active.getPointcut() != 1) {
			// 非注册是活动
		}

		int type = 1;
		switch (type) {
		case 1:

			break;
		case 2:

			break;

		default:
			break;
		}
		if (active.getType() == 1) {// 发放优惠券
			// 调用优惠券方法接口完成
			CouponVO cv = new CouponVO();

			cv.setUserId(user.getId());
			cv.setCreateTime(new Date().getTime());
			cv.setIfAll(active.isIfAll());
			cv.setStatus(0);
			cv.setValidityTime(active.getValidityTime());
			cv.setUpdateTime(new Date().getTime());
			cv.setKitchenId("");
			couponsDAO.insert(cv);
		} else if (active.getType() == 2) {// 减免返现 不符合注册时逻辑

		}
		return null;
	}

}
