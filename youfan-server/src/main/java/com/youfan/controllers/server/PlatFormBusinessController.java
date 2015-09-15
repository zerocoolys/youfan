package com.youfan.controllers.server;

import static com.youfan.commons.Constants.MONGO_STATUS;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.youfan.commons.Constants.PAGER;
import com.youfan.commons.Pagination;
import com.youfan.commons.vo.ActiveVO;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.CommentVO;
import com.youfan.commons.vo.ConditionVO;
import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.commons.vo.server.CouponTypeVO;
import com.youfan.commons.vo.server.CouponVO;
import com.youfan.commons.vo.server.OrderVO;
import com.youfan.commons.vo.server.PayWayVO;
import com.youfan.controllers.params.ActiveParams;
import com.youfan.controllers.params.OrderParams;
import com.youfan.controllers.params.merchant.KitchenParams;
import com.youfan.controllers.params.merchant.MerchantParams;
import com.youfan.controllers.params.merchant.MerchantUserParams;
import com.youfan.controllers.params.server.CouponParams;
import com.youfan.controllers.params.server.CouponTypeParams;
import com.youfan.controllers.params.server.PayWayParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.data.dao.client.UserDao;
import com.youfan.data.models.CouponContentEntity;
import com.youfan.services.merchant.CommentService;
import com.youfan.services.merchant.KitchenService;
import com.youfan.services.merchant.MerchantKitchenService;
import com.youfan.services.merchant.MerchantService;
import com.youfan.services.merchant.MerchantUsersService;
import com.youfan.services.server.ActiveService;
import com.youfan.services.server.ActiveSupportService;
import com.youfan.services.server.CouponService;
import com.youfan.services.server.CouponTypeService;
import com.youfan.services.server.OrderService;
import com.youfan.services.server.PayWayService;
import com.youfan.utils.JSONUtils;
import com.youfan.utils.StringUtil;

/**
 * 
 * @title PlatFormBusinessController.java
 * @package com.youfan.controllers.server
 * @description 运营端业务控制器
 * @author QinghaiDeng
 * @update 2015年9月9日 上午11:23:24
 * @version V1.0 Copyright (c)2012 chantsoft-版权所有
 */
@RestController
@RequestMapping(path = "/pBusiness")
public class PlatFormBusinessController {

	Logger logger = LoggerFactory.getLogger(PlatFormBusinessController.class);
	@Resource
	MerchantUsersService merchantUsersService;
	@Resource
	MerchantKitchenService merchantKitchenService;
	@Resource
	OrderService orderService;
	@Resource
	ActiveService activeService;
	@Resource
	ActiveSupportService activeSupportService;
	@Resource
	CouponTypeService couponsTypeService;
	@Resource
	CouponService couponService;
	@Resource
	PayWayService payWayService;
	@Resource
	CommentService commentService;
	@Resource
	UserDao userDAO;
	@Resource
	MerchantService merchantService;
	@Resource
	KitchenService kitchenService;
	///////////////////////////////// 系统//////////////////////////////////////////

	/**
	 * Sys测试接口
	 * 
	 * @param sentence
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月1日 下午5:27:03
	 */

	@RequestMapping(method = RequestMethod.GET, path = "/sys/test")
	public Response test(HttpServletRequest request, HttpServletResponse response) {
		// return activeSupportService.joinActive("client_register",
		// userDAO.getUserByTel("13980041343"));
		ClientUserVO user = userDAO.getUserByTel("13980041343");
		user.setSex("男");
		OrderVO ov = new OrderVO();
		ov.setOrgPrice(1000);

		return activeSupportService.joinActive("client_order_up_100", user, ov);
	}

	/**
	 * 检查敏感词
	 * 
	 * @param sentence
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月1日 上午9:44:27
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/checkWords/{sentence}")
	public Response checkWords(@PathVariable String sentence, HttpServletRequest request,
			HttpServletResponse response) {
		Response res = null;
		res = Responses.SUCCESS().setCode(1).setMsg("No Sensitive Words");
		return res;
	}

	/**
	 * 分页获取订单信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年8月31日 上午10:21:13
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/getOrder")
	public Response getOrders(HttpServletRequest request, HttpServletResponse response) {
		OrderParams op = new OrderParams();
		Response res = null;
		try {

			if (request.getParameter("orderNo") != null) {
				op.setOrderNo(request.getParameter("orderNo"));
			}
			if (request.getParameter("buyerId") != null) {
				op.setBuyerId(request.getParameter("buyerId"));
			}
			if (request.getParameter("sellerId") != null) {
				op.setSellerId(request.getParameter("sellerId"));
			}
			if (request.getParameter("orderStatus") != null) {
				op.setOrderStatus(Integer.valueOf(request.getParameter("orderStatus")));
			}

			int recordCnt = orderService.count(op);
			if (request.getParameter("pageNo") != null && request.getParameter("pageSize") != null
					&& request.getParameter("orderBy") != null) {
				op.setPageSize(Integer.valueOf(request.getParameter("pageSize")));
				op.setPageNo(Integer.valueOf(request.getParameter("pageNo")));
				op.setOrderBy(request.getParameter("orderBy"));
			} else {
				op.setPageSize(recordCnt);
				op.setPageNo(1);
				op.setOrderBy("ID");
			}

			List<OrderVO> list = orderService.getOrdersByParams(op);
			CollectionVO<OrderVO> payload = new CollectionVO<OrderVO>(list, recordCnt, op.getPageSize());
			res = Responses.SUCCESS().setCode(1).setMsg("数据获取成功").setPayload(payload);

		} catch (Exception e) {
			logger.error(e.getMessage());
			res = Responses.FAILED().setMsg("数据获取异常");
		}
		return res;
	}

	/**
	 * 更新订单状态信息
	 * 
	 * @param id
	 * @param orderStatus
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月8日 下午2:26:46
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/updateOrderStatus/{id}/{orderStatus}")
	public Response updateOrderStatus(@PathVariable Long id, @PathVariable int orderStatus, HttpServletRequest request,
			HttpServletResponse response) {
		Response res = null;
		try {
			OrderVO order = orderService.findOrderById(id);
			if (order == null) {
				res = Responses.SUCCESS().setCode(0).setMsg("订单更新失败 订单不存在");
			}
			OrderParams op = new OrderParams();
			op.setOrderNo(order.getOrderNo());
			op.setOrderStatus(orderStatus);
			int r = orderService.updateOrderStatus(op);
			if (r == 1) {
				res = Responses.SUCCESS().setPayload(null).setCode(1).setMsg("订单更新成功");
			} else {
				res = Responses.SUCCESS().setPayload(null).setCode(0).setMsg("订单未更新");
			}

		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.SUCCESS().setCode(0).setMsg("订单更新失败");
		}
		return res;
	}

	/**
	 * 保存优惠券类型
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月8日 下午2:27:02
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/saveCouponsType")
	public Response saveCouponsType(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {
			if (request.getParameter("port") != null && request.getParameter("timeLine") != null
					&& request.getParameter("title") != null) {
				CouponTypeVO coupons = new CouponTypeVO();
				coupons.setPort(Integer.valueOf(request.getParameter("port")));
				coupons.setTitle(request.getParameter("title"));
				coupons.setTimeLine(Integer.valueOf(request.getParameter("timeLine")));
				coupons.setDesc(request.getParameter("desc"));
				coupons.setContent(
						JSONUtils.getObjectListByJson(request.getParameter("content"), CouponContentEntity.class));
				// 创建时间为保存时当前时间
				coupons.setCreateTime(new Date().getTime());
				// 状态默认为1 表示开启使用状态
				coupons.setStatus(1);
				couponsTypeService.save(coupons);
				res = Responses.SUCCESS().setMsg("数据保存成功");
			} else {
				res = Responses.FAILED().setMsg("数据保存异常:参数错误");
			}
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.FAILED().setMsg("数据保存异常：数据库异常");
		}

		return res;
	}

	/**
	 * 分页条件获取优惠券类型
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月8日 下午2:27:14
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/getCouponsType")
	public Response getCouponsType(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {
			CouponTypeParams params = new CouponTypeParams();
			if (request.getParameter("port") != null) {
				params.setPort(Integer.valueOf(request.getParameter("port")));
			}
			if (request.getParameter("timeLine") != null) {
				params.setTimeLine(Integer.valueOf(request.getParameter("timeLine")));
			}

			if (request.getParameter("kitchenId") != null) {
				params.setKitchenId(request.getParameter("kitchenId"));
			}
			if (request.getParameter("status") != null) {
				params.setStatus(Integer.valueOf(request.getParameter("status")));
			}
			Pagination pager = new Pagination();
			long recordCnt = couponsTypeService.count(params);
			pager.setPageNo(request.getParameter(PAGER.PAGE_NO) == null ? 0
					: Integer.valueOf(request.getParameter(PAGER.PAGE_NO)));
			pager.setPageSize((int) (request.getParameter(PAGER.PAGE_SIZE) == null ? recordCnt
					: Integer.valueOf(request.getParameter(PAGER.PAGE_SIZE))));
			pager.setSortBy(request.getParameter(PAGER.SORT_BY));
			pager.setAsc(
					request.getParameter(PAGER.ASC) == null ? false : Boolean.valueOf(request.getParameter(PAGER.ASC)));
			CollectionVO<CouponTypeVO> payload = new CollectionVO<>(couponsTypeService.getPagerByParams(params, pager),
					(int) recordCnt, pager.getPageSize() < 1 ? (int) recordCnt : pager.getPageSize());
			return Responses.SUCCESS().setPayload(payload).setCode(1).setMsg("数据获取成功");
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.FAILED().setCode(0).setMsg("数据获取失败");
		}
		return res;
	}

	/**
	 * 更新优惠券类型状态
	 * 
	 * @param id
	 * @param status
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月8日 下午2:27:32
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/updateCouponsTypeStatus/{id}/{status}")
	public Response updateCouponsTypeStatus(@PathVariable String id, @PathVariable int status,
			HttpServletRequest request, HttpServletResponse response) {
		try {
			CouponTypeParams params = new CouponTypeParams();
			params.setStatus(status);
			int un = couponsTypeService.updateById(id, params);
			if (un == 1) {
				return Responses.SUCCESS().setPayload(null).setCode(1).setMsg("优惠券类型更新成功");
			} else {
				return Responses.FAILED().setPayload(null).setCode(0).setMsg("优惠券类型未更新");
			}

		} catch (Exception e) {
			e.printStackTrace();
			return Responses.FAILED().setCode(0).setMsg("优惠券类型更新失败");
		}
	}

	@RequestMapping(method = RequestMethod.GET, path = "/sys/updateCouponsType/{id}")
	public Response updateCouponsTypeById(@PathVariable String id, HttpServletRequest request) {
		try {
			CouponTypeVO coupons = new CouponTypeVO();
			coupons.setPort(
					request.getParameter("port") == null ? null : Integer.valueOf(request.getParameter("port")));
			coupons.setTitle(request.getParameter("title"));
			coupons.setTimeLine(request.getParameter("timeLine") == null ? null
					: Integer.valueOf(request.getParameter("timeLine")));
			coupons.setDesc(request.getParameter("desc"));
			coupons.setContent(request.getParameter("content") == null ? null
					: JSONUtils.getObjectListByJson(request.getParameter("content"), CouponContentEntity.class));
			// 状态默认为1 表示开启使用状态
			int un = couponsTypeService.updateById(id, coupons);
			if (un == 1) {
				return Responses.SUCCESS().setPayload(null).setCode(1).setMsg("优惠券类型更新成功");
			} else {
				return Responses.FAILED().setPayload(null).setCode(0).setMsg("优惠券类型未更新");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Responses.FAILED().setCode(0).setMsg("优惠券类型更新失败");
		}
	}

	@RequestMapping(method = RequestMethod.GET, path = "/sys/deleteCouponsType/{id}")
	public Response deleteCouponsType(@PathVariable String id) {
		try {
			// 状态默认为1 表示开启使用状态
			int dn = couponsTypeService.logicDelete(id);
			if (dn == 1) {
				return Responses.SUCCESS().setPayload(null).setCode(1).setMsg("优惠券类型删除成功");
			} else {
				return Responses.FAILED().setPayload(null).setCode(0).setMsg("优惠券类型未删除");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Responses.FAILED().setCode(0).setMsg("优惠券类型删除失败");
	}

	/**
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description 分页查询条件优惠券内容 分页信息不传递则查询所有
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月14日 上午11:38:34
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/getCoupons")
	public Response getCoupons(HttpServletRequest request, HttpServletResponse response) {
		try {
			CouponParams params = new CouponParams();
			params.setDataStatus(null);
			Pagination pager = new Pagination();
			long recordCnt = couponService.count(params);
			// 分页信息
			pager.setPageNo(request.getParameter(PAGER.PAGE_NO) == null ? 0
					: Integer.valueOf(request.getParameter(PAGER.PAGE_NO)));
			pager.setPageSize((int) (request.getParameter(PAGER.PAGE_SIZE) == null ? recordCnt
					: Integer.valueOf(request.getParameter(PAGER.PAGE_SIZE))));
			pager.setSortBy(request.getParameter(PAGER.SORT_BY));
			pager.setAsc(
					request.getParameter(PAGER.ASC) == null ? false : Boolean.valueOf(request.getParameter(PAGER.ASC)));
			CollectionVO<CouponVO> payload = new CollectionVO<>(couponService.getPagerByParams(params, pager),
					(int) recordCnt, pager.getPageSize());
			return Responses.SUCCESS().setCode(0).setPayload(payload).setMsg("获取优惠券成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Responses.FAILED().setCode(0).setMsg("获取优惠券息失败");
	}

	/**
	 * 
	 * @param id
	 * @param request
	 * @param response
	 * @return
	 * @description 更新优惠券内容
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月14日 上午11:38:17
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/updateCoupon/{id}")
	public Response updateCoupon(@PathVariable String id, HttpServletRequest request, HttpServletResponse response) {
		try {
//			CouponParams params = new CouponParams();
			CouponVO vo = new CouponVO();
			vo.setId(id);
			vo.setDataStatus(1);
			int rn = couponService.updateById(id, vo);
			if (rn == 1) {
				return Responses.SUCCESS().setCode(0).setMsg("获取优惠券信息成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Responses.FAILED().setCode(0).setMsg("获取优惠券信息失败");
	}

	/**
	 * 保存活动
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月8日 下午2:27:45
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/saveActive")
	public Response saveActive(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {
			if (request.getParameter("event") != null && request.getParameter("port") != null
					&& request.getParameter("activeType") != null) {

				ActiveVO activeVo = new ActiveVO();
				activeVo.setPort(Integer.valueOf(request.getParameter("port")));
				activeVo.setEvent(request.getParameter("event"));
				activeVo.setActiveType(Integer.valueOf(request.getParameter("activeType")));
				activeVo.setUserConditions(request.getParameter("userCondition") == null ? null
						: JSONUtils.json2list(request.getParameter("userCondition"), ConditionVO.class));
				activeVo.setOrderConditions(request.getParameter("orderCondition") == null ? null
						: JSONUtils.json2list(request.getParameter("orderCondition"), ConditionVO.class));
				activeVo.setAllowTimes(0);
				activeVo.setDesc(request.getParameter("desc"));
				activeVo.setCouponsTypeId(request.getParameter("couponsTypeId"));
				activeVo.setCouponsType(Integer.valueOf(request.getParameter("couponsType")));
				// 创建时间为保存时当前时间
				activeVo.setCreateTime(new Date().getTime());
				activeVo.setValidityTime(Long.valueOf(request.getParameter("validityTime")));
				activeVo.setStartTime(Long.valueOf(request.getParameter("startTime")));
				activeVo.setEndTime(Long.valueOf(request.getParameter("endTime")));
				activeVo.setTitle(request.getParameter("title"));
				activeService.save(activeVo);
				res = Responses.SUCCESS().setMsg("数据保存成功");
			} else {
				res = Responses.FAILED().setMsg("数据保存异常:参数错误");
			}
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.FAILED().setMsg("数据保存异常：数据库异常");
		}

		return res;
	}

	/**
	 * 分页条件获取活动
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月8日 下午2:27:55
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/getActive")
	public Response getActive(HttpServletRequest request, HttpServletResponse response) {
		try {
			ActiveParams params = new ActiveParams();
			params.setEvent(request.getParameter("event"));
			params.setStatus(
					request.getParameter("status") == null ? null : Integer.valueOf(request.getParameter("status")));
			params.setTitle(request.getParameter("title"));

			Pagination pager = new Pagination();
			long recordCnt = activeService.count(params);
			// 分页信息
			pager.setPageNo(request.getParameter(PAGER.PAGE_NO) == null ? 0
					: Integer.valueOf(request.getParameter(PAGER.PAGE_NO)));
			pager.setPageSize((int) (request.getParameter(PAGER.PAGE_SIZE) == null ? recordCnt
					: Integer.valueOf(request.getParameter(PAGER.PAGE_SIZE))));
			pager.setSortBy(request.getParameter(PAGER.SORT_BY));
			pager.setAsc(
					request.getParameter(PAGER.ASC) == null ? false : Boolean.valueOf(request.getParameter(PAGER.ASC)));
			CollectionVO<ActiveVO> payload = new CollectionVO<>(activeService.getPagerByParams(params, pager),
					(int) recordCnt, pager.getPageSize() < 1 ? (int) recordCnt : pager.getPageSize());
			return Responses.SUCCESS().setPayload(payload).setCode(1).setMsg("数据获取成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Responses.SUCCESS().setCode(0).setMsg("数据获取失败");
	}

	/**
	 * 更新活动状态
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月8日 下午2:28:12
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/updateActive/{id}")
	public Response updateActive(@PathVariable String id, HttpServletRequest request, HttpServletResponse response) {
		try {
			ActiveVO activeVo = new ActiveVO();
			activeVo.setPort(StringUtil.isNumber(request.getParameter("port"))
					? Integer.valueOf(request.getParameter("port")) : null);
			activeVo.setEvent(request.getParameter("event"));
			activeVo.setActiveType(StringUtil.isNumber(request.getParameter("activeType"))
					? Integer.valueOf(request.getParameter("activeType")) : null);
			activeVo.setUserConditions(request.getParameter("userCondition") == null ? null
					: JSONUtils.json2list(request.getParameter("userCondition"), ConditionVO.class));
			activeVo.setOrderConditions(request.getParameter("orderCondition") == null ? null
					: JSONUtils.json2list(request.getParameter("orderCondition"), ConditionVO.class));
			activeVo.setAllowTimes(0);
			activeVo.setDesc(request.getParameter("desc"));
			activeVo.setCouponsTypeId(request.getParameter("couponsTypeId"));
			activeVo.setCouponsType(StringUtil.isNumber(request.getParameter("couponsType"))
					? Integer.valueOf(request.getParameter("couponsType")) : null);
			// 创建时间为保存时当前时间
			activeVo.setCreateTime(new Date().getTime());
			activeVo.setValidityTime(StringUtil.isNumber(request.getParameter("validityTime"))
					? Long.valueOf(request.getParameter("validityTime")) : null);
			activeVo.setStartTime(StringUtil.isNumber(request.getParameter("startTime"))
					? Long.valueOf(request.getParameter("startTime")) : null);
			activeVo.setEndTime(StringUtil.isNumber(request.getParameter("endTime"))
					? Long.valueOf(request.getParameter("endTime")) : null);
			activeVo.setTitle(request.getParameter("title"));
			activeVo.setPort(StringUtil.isNumber(request.getParameter("port"))
					? Integer.valueOf(request.getParameter("port")) : null);
			int un = activeService.updateById(id, activeVo);
			if (un == 1) {
				return Responses.SUCCESS().setCode(1).setMsg("数据更新成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Responses.SUCCESS().setCode(0).setMsg("活动更新失败");
	}

	@RequestMapping(method = RequestMethod.GET, path = "/sys/updateActive/{id}/{status}")
	public Response updateActive(@PathVariable String id, @PathVariable Integer status, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			ActiveVO activeVo = new ActiveVO();
			activeVo.setStatus(status);
			int un = activeService.updateById(id, activeVo);
			if (un == 1) {
				return Responses.SUCCESS().setCode(1).setMsg("数据更新成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Responses.SUCCESS().setCode(0).setMsg("活动更新失败");
	}

	/**
	 * 保存支付渠道
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月6日 上午11:45:48
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/savePayWay")
	public Response savePayWay(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {
			PayWayVO payWayVo = new PayWayVO();
			payWayVo.setCode(request.getParameter("code"));
			payWayVo.setName(request.getParameter("name"));
			payWayVo.setIconUrl(request.getParameter("iconUrl"));
			payWayVo.setStatus(
					request.getParameter("status") == null ? 0 : Integer.valueOf(request.getParameter("status")));
			payWayService.save(payWayVo);
			res = Responses.SUCCESS().setMsg("数据保存成功");
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.FAILED().setMsg("数据保存异常：数据库异常");
		}

		return res;
	}

	/**
	 * 获取所有支付渠道
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月6日 上午11:45:59
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/getPayWay")
	public Response getPayWay(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {

			PayWayParams params = new PayWayParams();

			Pagination pager = new Pagination();
			int recordCnt = (int) payWayService.count(params);
			// 分页信息
			pager.setPageNo(request.getParameter(PAGER.PAGE_NO) == null ? 0
					: Integer.valueOf(request.getParameter(PAGER.PAGE_NO)));
			pager.setPageSize((int) (request.getParameter(PAGER.PAGE_SIZE) == null ? recordCnt
					: Integer.valueOf(request.getParameter(PAGER.PAGE_SIZE))));
			pager.setSortBy(request.getParameter(PAGER.SORT_BY));
			pager.setAsc(
					request.getParameter(PAGER.ASC) == null ? false : Boolean.valueOf(request.getParameter(PAGER.ASC)));
			CollectionVO<PayWayVO> payload = new CollectionVO<>(payWayService.getPagerByParams(params, pager),
					(int) recordCnt, pager.getPageSize() < 1 ? (int) recordCnt : pager.getPageSize());
			return Responses.SUCCESS().setPayload(payload).setCode(1).setMsg("数据获取成功");
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.FAILED().setMsg("数据获取异常：数据库异常");
		}

		return res;
	}

	/**
	 * 获取指定支付渠道
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月6日 上午11:45:59
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/getPayWay/{id}")
	public Response getPayWay(@PathVariable String id, HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {
			PayWayVO vo = request.getParameter("id") == null ? null : (PayWayVO) payWayService.get(id);
			res = Responses.SUCCESS().setMsg("数据获取成功").setPayload(vo);
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.FAILED().setMsg("数据获取异常：数据库异常");
		}

		return res;
	}

	/**
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description 更新指定ID的更改支付渠道
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月6日 上午11:46:10
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/updatePayWay/{id}")
	public Response updatePayWay(HttpServletRequest request, HttpServletResponse response) {
		try {
			PayWayVO payWayVo = new PayWayVO();
			payWayVo.setCode(request.getParameter("code"));
			payWayVo.setName(request.getParameter("name"));
			payWayVo.setIconUrl(request.getParameter("iconUrl"));
			int un = payWayService.updateById(request.getParameter("id"), payWayVo);
			if (un == 1) {
				return Responses.SUCCESS().setMsg("数据更新成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Responses.FAILED().setMsg("数据更新异常：数据库异常");
	}

	////////////////////////////////////// 评论//////////////////////////////////////////////
	/**
	 * 分页条件获取评论
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月8日 下午2:29:16
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/getCommentsPager")
	public Response getCommentsPager(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {
			Map<String, Object> paramMap = request.getParameter("paramMap") == null ? null
					: JSONUtils.json2map(request.getParameter("paramMap"));
			long recordCnt = commentService.count(paramMap);
			Pagination pager = new Pagination();
			pager.setParams(paramMap);
			pager.setPageSize(StringUtil.isNumber(request.getParameter("pageSize"))
					? Integer.valueOf(request.getParameter("pageSize")) : (int) recordCnt);
			pager.setPageNo(StringUtil.isNumber(request.getParameter("pageNo"))
					? Integer.valueOf(request.getParameter("pageNo")) : (int) recordCnt);
			pager.setSortBy(request.getParameter("sortBy") == null ? "ct" : request.getParameter("sortBy"));
			pager.setAsc(
					request.getParameter("pageNo") == null ? false : Boolean.valueOf(request.getParameter("pageNo")));

			List<CommentVO> list = commentService.getPagerByCondition(pager);
			CollectionVO<CommentVO> payload = new CollectionVO<>(list, (int) recordCnt,
					pager.getPageSize() < 1 ? (int) recordCnt : pager.getPageSize());
			res = Responses.SUCCESS().setPayload(payload).setCode(1).setMsg("数据获取成功");
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.SUCCESS().setCode(0).setMsg("数据获取失败");
		}
		return res;
	}

	/**
	 * 删除评论
	 * 
	 * @param pageNo
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月8日 下午6:00:06
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/comment/delete/{id}")
	public Response deleteCommentById(@PathVariable String id) {
		try {
			int r = commentService.deleteById(id);
			if (r == 1) {
				return Responses.SUCCESS().setCode(1).setMsg("评论删除成功");
			}
		} catch (Exception e) {
		}
		return Responses.FAILED().setCode(0).setMsg("评论删除");
	}

	///////////////////////////////// 商家//////////////////////////////////////////

	/**
	 * 获取置顶状态的商家信息
	 *
	 * @param
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/merchant/getMerchants")
	public Response getMerchants(HttpServletRequest request, HttpServletResponse response) {
		try {
			MerchantParams params = new MerchantParams();
			params.setPhone(request.getParameter("phone"));
			params.setRealName(request.getParameter("realName"));
			params.setUserName(request.getParameter("userName"));
			params.setStatus(request.getParameter(MONGO_STATUS) == null ? null
					: Integer.valueOf(request.getParameter(MONGO_STATUS)));
			Pagination pager = new Pagination();
			long recordCnt = merchantService.count(params);
			// 分页信息
			pager.setPageNo(request.getParameter(PAGER.PAGE_NO) == null ? 0
					: Integer.valueOf(request.getParameter(PAGER.PAGE_NO)));
			pager.setPageSize((int) (request.getParameter(PAGER.PAGE_SIZE) == null ? recordCnt
					: Integer.valueOf(request.getParameter(PAGER.PAGE_SIZE))));
			pager.setSortBy(request.getParameter(PAGER.SORT_BY));
			pager.setAsc(
					request.getParameter(PAGER.ASC) == null ? false : Boolean.valueOf(request.getParameter(PAGER.ASC)));
			CollectionVO<MerchantUserVO> payload = new CollectionVO<>(merchantService.getPagerByParams(params, pager),
					(int) recordCnt, pager.getPageSize());
			return Responses.SUCCESS().setCode(0).setPayload(payload).setMsg("获取商家信息成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Responses.FAILED().setCode(0).setMsg("获取商家信息失败");
	}

	@RequestMapping(method = RequestMethod.GET, path = "/merchant/updateMerchant/{id}")
	public Response updateMerchantById(@PathVariable String id, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			MerchantUserParams muParams = new MerchantUserParams();
			muParams.setStatus(request.getParameter(MONGO_STATUS) == null ? null
					: Integer.valueOf(request.getParameter(MONGO_STATUS)));
			muParams.setUserName(request.getParameter("userName"));
			int rn = merchantUsersService.updateById(id, muParams);
			if (rn == 1) {
				return Responses.SUCCESS().setCode(0).setMsg("获取商家信息成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Responses.FAILED().setCode(0).setMsg("获取商家信息失败");
	}

	/**
	 * 获取分页 商家厨房信息
	 *
	 * @param
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/merchant/getKitchens")
	public Response getKitchens(HttpServletRequest request, HttpServletResponse response) {
		try {
			KitchenParams params = new KitchenParams();
			params.setPhoneNumber(request.getParameter("phone"));
			params.setKitchenName(request.getParameter("name"));
			Pagination pager = new Pagination();
			long recordCnt = kitchenService.count(params);
			// 分页信息
			pager.setPageNo(request.getParameter(PAGER.PAGE_NO) == null ? 0
					: Integer.valueOf(request.getParameter(PAGER.PAGE_NO)));
			pager.setPageSize((int) (request.getParameter(PAGER.PAGE_SIZE) == null ? recordCnt
					: Integer.valueOf(request.getParameter(PAGER.PAGE_SIZE))));
			pager.setSortBy(request.getParameter(PAGER.SORT_BY));
			pager.setAsc(
					request.getParameter(PAGER.ASC) == null ? false : Boolean.valueOf(request.getParameter(PAGER.ASC)));
			CollectionVO<MerchantKitchenInfoVO> payload = new CollectionVO<>(
					kitchenService.getPagerByParams(params, pager), (int) recordCnt, pager.getPageSize());
			return Responses.SUCCESS().setCode(1).setPayload(payload).setMsg("获取商家厨房信息成功");
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
		}
		return Responses.FAILED().setCode(0).setMsg("获取商家厨房信息失败");
	}

	/**
	 * 商家 审核接口
	 *
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
			merchantUsersService.checkMerchant(request.getParameter("id"), status);
		}
	}

	/**
	 * 获取菜单信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月14日 上午10:39:18
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/merchant/getMenus")
	public Response getMenus(HttpServletRequest request, HttpServletResponse response) {
		try {
			MerchantParams params = new MerchantParams();
			params.setPhone(request.getParameter("phone"));
			params.setRealName(request.getParameter("realName"));
			params.setUserName(request.getParameter("userName"));
			params.setStatus(request.getParameter(MONGO_STATUS) == null ? null
					: Integer.valueOf(request.getParameter(MONGO_STATUS)));
			Pagination pager = new Pagination();
			long recordCnt = merchantService.count(params);
			// 分页信息
			pager.setPageNo(request.getParameter(PAGER.PAGE_NO) == null ? 0
					: Integer.valueOf(request.getParameter(PAGER.PAGE_NO)));
			pager.setPageSize((int) (request.getParameter(PAGER.PAGE_SIZE) == null ? recordCnt
					: Integer.valueOf(request.getParameter(PAGER.PAGE_SIZE))));
			pager.setSortBy(request.getParameter(PAGER.SORT_BY));
			pager.setAsc(
					request.getParameter(PAGER.ASC) == null ? false : Boolean.valueOf(request.getParameter(PAGER.ASC)));
			CollectionVO<MerchantUserVO> payload = new CollectionVO<>(merchantService.getPagerByParams(params, pager),
					(int) recordCnt, pager.getPageSize());
			return Responses.SUCCESS().setCode(0).setPayload(payload).setMsg("获取商家信息成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Responses.FAILED().setCode(0).setMsg("获取商家信息失败");
	}

}
