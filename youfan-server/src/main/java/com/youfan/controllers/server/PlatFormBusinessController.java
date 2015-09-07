package com.youfan.controllers.server;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.ConditionVO;
import com.youfan.commons.vo.client.UserVO;
import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.commons.vo.server.OrderVO;
import com.youfan.commons.vo.server.PayWayVO;
import com.youfan.controllers.params.ActiveParams;
import com.youfan.controllers.params.CouponsParams;
import com.youfan.controllers.params.OrderParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.data.dao.client.UserDao;
import com.youfan.data.models.CouponsContentEntity;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.UserException;
import com.youfan.services.merchant.MerchantKitchenService;
import com.youfan.services.merchant.MerchantUsersService;
import com.youfan.services.server.ActiveService;
import com.youfan.services.server.ActiveSupportService;
import com.youfan.services.server.CouponsTypeService;
import com.youfan.services.server.OrderService;
import com.youfan.services.server.PayWayService;
import com.youfan.utils.JSONUtils;

/**
 * Created by MrDeng on 15/8/17.
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
	CouponsTypeService couponsTypeService;
	@Resource
	PayWayService payWayService;
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
	@Resource
	UserDao userDAO;

	@RequestMapping(method = RequestMethod.GET, path = "/sys/test")
	public Response test(HttpServletRequest request, HttpServletResponse response) {
		// return activeSupportService.joinActive("client_register",
		// userDAO.getUserByTel("13980041343"));
		UserVO user = userDAO.getUserByTel("13980041343");
		user.setSex("男");
		OrderVO ov = new OrderVO();
		ov.setOrgPrice(1000);

		return activeSupportService.joinActive("client_order_8折", user, ov);
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
			res = Responses.SUCCESS().setMsg("数据获取成功").setPayload(payload);

		} catch (Exception e) {
			logger.error(e.getMessage());
			res = Responses.FAILED().setMsg("数据获取异常");
		}
		return res;
	}

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

	@RequestMapping(method = RequestMethod.GET, path = "/sys/saveCouponsType")
	public Response saveCouponsType(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {
			if (request.getParameter("port") != null && request.getParameter("timeLine") != null) {

				CouponsTypeVO coupons = new CouponsTypeVO();
				coupons.setPort(Integer.valueOf(request.getParameter("port")));
				coupons.setTimeLine(Integer.valueOf(request.getParameter("timeLine")));
				// coupons.setKitchenId(request.getParameter("kitchenId"));
				coupons.setDesc(request.getParameter("desc"));
				coupons.setContent(
						JSONUtils.getObjectListByJson(request.getParameter("content"), CouponsContentEntity.class));
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

	@RequestMapping(method = RequestMethod.GET, path = "/sys/getCouponsType")
	public Response getCouponsType(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {
			CouponsParams couponsParams = new CouponsParams();
			if (request.getParameter("port") != null) {
				couponsParams.setPort(Integer.valueOf(request.getParameter("port")));
			}
			if (request.getParameter("timeLine") != null) {
				couponsParams.setTimeLine(Integer.valueOf(request.getParameter("timeLine")));
			}

			if (request.getParameter("kitchenId") != null) {
				couponsParams.setKitchenId(request.getParameter("kitchenId"));
			}
			if (request.getParameter("status") != null) {
				couponsParams.setStatus(Integer.valueOf(request.getParameter("status")));
			}
			long recordCnt = couponsTypeService.count(couponsParams);
			if (request.getParameter("pageSize") != null && request.getParameter("pageNo") != null) {
				couponsParams.setPageSize(Integer.valueOf(request.getParameter("pageSize")));
				couponsParams.setPageNo(Integer.valueOf(request.getParameter("pageNo")));
			} else {
				couponsParams.setPageSize((int) recordCnt);
				couponsParams.setPageNo(0);
			}
			CollectionVO<CouponsTypeVO> payload = new CollectionVO<>(new ArrayList<CouponsTypeVO>(), (int) recordCnt,
					couponsParams.getPageSize() < 1 ? (int) recordCnt : couponsParams.getPageSize());
			List<CouponsTypeVO> list = couponsTypeService.getByCondition(couponsParams);
			payload.addAll(list);
			res = Responses.SUCCESS().setPayload(payload).setCode(1).setMsg("数据获取成功");
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.FAILED().setCode(0).setMsg("数据获取失败");
		}
		return res;
	}

	@RequestMapping(method = RequestMethod.GET, path = "/sys/updateCouponsTypeStatus/{id}/{status}")
	public Response updateCouponsTypeStatus(@PathVariable String id, @PathVariable int status,
			HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {
			Map<String, Object> updateParams = new HashMap<>();
			updateParams.put("status", status);
			int un = couponsTypeService.updateById(id, updateParams);
			if (un == 1) {
				Responses.SUCCESS().setPayload(null).setCode(1).setMsg("优惠券类型更新成功");
			} else {
				Responses.FAILED().setPayload(null).setCode(0).setMsg("优惠券类型未更新");
			}

		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.FAILED().setCode(0).setMsg("优惠券类型更新失败");
		}
		return res;
	}

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
				// activeVo.setActiveDetailClazz(request.getParameter("activeDetailClazz"));

				// System.out.println(request.getParameter("userCondition"));
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
				// 状态默认为1 表示开启使用状态
				activeVo.setStatus(1);
				System.out.println(activeVo.toString());
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

	@RequestMapping(method = RequestMethod.GET, path = "/sys/getActive")
	public Response getActive(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {
			ActiveParams activeParams = new ActiveParams();
			if (request.getParameter("event") != null) {
				activeParams.setEvent(request.getParameter("event"));
			}
			if (request.getParameter("status") != null) {
				activeParams.setStatus(Integer.valueOf(request.getParameter("status")));
			}

			if (request.getParameter("title") != null) {
				activeParams.setTitle(request.getParameter("title"));
			}
			long recordCnt = activeService.count(activeParams);
			if (request.getParameter("pageSize") != null && request.getParameter("pageNo") != null) {
				activeParams.setPageSize(Integer.valueOf(request.getParameter("pageSize")));
				activeParams.setPageNo(Integer.valueOf(request.getParameter("pageNo")));
			} else {
				activeParams.setPageSize((int) recordCnt);
				activeParams.setPageNo(0);
			}

			CollectionVO<ActiveVO> payload = new CollectionVO<>(new ArrayList<ActiveVO>(), (int) recordCnt,
					activeParams.getPageSize() < 1 ? (int) recordCnt : activeParams.getPageSize());
			List<ActiveVO> list = activeService.getByCondition(activeParams);
			payload.addAll(list);
			res = Responses.SUCCESS().setPayload(payload).setCode(1).setMsg("数据获取成功");
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.SUCCESS().setCode(0).setMsg("数据获取失败");
		}
		return res;
	}

	@RequestMapping(method = RequestMethod.GET, path = "/sys/updateActive")
	public Response updateActive(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {
			String id = request.getParameter("id");
			activeService.updateById(id, JSONUtils.json2map(request.getParameter("updateMap")));
			res = Responses.SUCCESS().setPayload(null).setCode(1).setMsg("活动更新成功");
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.SUCCESS().setCode(0).setMsg("活动更新失败");
		}
		return res;
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

			List<PayWayVO> list = payWayService.getAll();
			res = Responses.SUCCESS().setMsg("数据获取成功").setPayload(list);
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
	@RequestMapping(method = RequestMethod.GET, path = "/sys/getPayWayById")
	public Response getPayWayById(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {

			PayWayVO vo = request.getParameter("id") == null ? null
					: (PayWayVO) payWayService.getById(request.getParameter("id"));
			res = Responses.SUCCESS().setMsg("数据获取成功").setPayload(vo);
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.FAILED().setMsg("数据获取异常：数据库异常");
		}

		return res;
	}

	/**
	 * 更改支付渠道状态
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月6日 上午11:46:10
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/sys/updatePayWayStatus")
	public Response updatePayWayStatus(HttpServletRequest request, HttpServletResponse response) {
		Response res = null;
		try {

			payWayService.updatePayWayStatus(request.getParameter("id"),
					Integer.valueOf(request.getParameter("status")));
			res = Responses.SUCCESS().setMsg("数据更新成功");
		} catch (Exception e) {
			e.printStackTrace();
			res = Responses.FAILED().setMsg("数据更新异常：数据库异常");
		}

		return res;
	}
	///////////////////////////////// 商家//////////////////////////////////////////

	/**
	 * 获取置顶状态的商家信息
	 *
	 * @param
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/merchant/getByStatus")

	public List<MerchantUserEntity> getByStatus(HttpServletRequest request, HttpServletResponse response) {
		try {
			Integer status = 0;
			if (request.getParameter("status") != null) {
				status = Integer.valueOf(request.getParameter("status"));
			}
			return merchantUsersService.getMerchantByStatus(status);
		} catch (UserException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ArrayList<MerchantUserEntity>();
	}

	/**
	 * 获取分页 商家信息
	 *
	 * @param
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/merchant/getMerchant/{pageNo}/{pageSize}")
	public CollectionVO<MerchantUserEntity> getMerchant(@PathVariable Integer pageNo, @PathVariable Integer pageSize,
			HttpServletRequest request, HttpServletResponse response) {
		CollectionVO<MerchantUserEntity> result = null;
		try {
			Query query = new Query();
			if (request.getParameter("status") != null) {
				query.addCriteria(Criteria.where("status").is(Integer.valueOf(request.getParameter("status"))));
			}
			if (request.getParameter("userName") != null) {
				query.addCriteria(Criteria.where("userName").is(request.getParameter("userName")));
			}

			if (request.getParameter("realName") != null) {
				query.addCriteria(Criteria.where("realName").is(request.getParameter("realName")));
			}

			long count = merchantUsersService.count(query);
			query.skip((pageNo - 1) * pageSize);
			query.limit(pageSize);
			List<MerchantUserEntity> msa = merchantUsersService.find(query);
			result = new CollectionVO<MerchantUserEntity>(msa, (int) count, pageSize);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return result;
	}

	/**
	 * 获取分页 商家厨房信息
	 *
	 * @param
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/merchant/getKitchen/{pageNo}/{pageSize}")
	public CollectionVO<MerchantKitchenInfoEntity> getKitchen(@PathVariable Integer pageNo,
			@PathVariable Integer pageSize, HttpServletRequest request, HttpServletResponse response) {
		CollectionVO<MerchantKitchenInfoEntity> result = null;
		try {
			Query query = new Query();
			if (request.getParameter("status") != null) {
				query.addCriteria(Criteria.where("status").is(Integer.valueOf(request.getParameter("status"))));
			}
			if (request.getParameter("userName") != null) {
				query.addCriteria(Criteria.where("userName").is(request.getParameter("userName")));
			}

			if (request.getParameter("realName") != null) {
				query.addCriteria(Criteria.where("realName").is(request.getParameter("realName")));
			}

			long count = merchantUsersService.count(query);
			query.skip((pageNo - 1) * pageSize);
			query.limit(pageSize);
			List<MerchantKitchenInfoEntity> msa = merchantKitchenService.find(query);
			result = new CollectionVO<MerchantKitchenInfoEntity>(msa, (int) count, pageSize);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return result;
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

}
