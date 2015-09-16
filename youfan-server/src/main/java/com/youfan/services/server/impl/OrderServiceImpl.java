package com.youfan.services.server.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.youfan.commons.OrderStatus;
import com.youfan.commons.Pagination;
import com.youfan.commons.vo.MechantMenuVO;
import com.youfan.commons.vo.MerchantOrderDetailVO;
import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.commons.vo.merchant.MerchantIncomeVO;
import com.youfan.commons.vo.merchant.MerchantOrderHeaderVO;
import com.youfan.commons.vo.merchant.MerchantOrderOverviewVO;
import com.youfan.commons.vo.server.OrderDishRelVO;
import com.youfan.commons.vo.server.OrderVO;
import com.youfan.controllers.params.OrderParams;
import com.youfan.data.dao.client.MenuDAO;
import com.youfan.data.dao.client.UserDao;
import com.youfan.data.dao.merchant.MerchantUserDAO;
import com.youfan.data.dao.server.OrderDAO;
import com.youfan.services.server.OrderService;

/**
 * Created by yousheng on 15/8/18.
 */
@Service
public class OrderServiceImpl implements OrderService {

	@Resource
	private OrderDAO orderDAO;

	@Resource
	private MenuDAO menuDao;

	@Resource
	private MerchantUserDAO merchantUserDAO;

	@Resource
	private UserDao userDao;

	@Override
	public List<OrderVO> findAll(Pagination pagination) {

		List<OrderVO> result = Collections.emptyList();

		return result;
	}

	@Override
	public List<OrderVO> findByUserId(String userId, Pagination pagination) {
		List<OrderVO> result = orderDAO.findByBuyerId(userId, pagination);
		if (result == null)
			return Collections.emptyList();

		return result;
	}

	@Override
	public List<OrderVO> findBySellerId(String sellerId, Pagination pagination) {
		List<OrderVO> result = new ArrayList<>();

		result.addAll(orderDAO.findBySellerId(sellerId, pagination));

		return result;
	}

	@Override
	public OrderVO findOrderById(Long id) {
		return orderDAO.findOrderById(id);
	}

	@Override
	public OrderVO findByOrderNo(String orderNo) {
		return orderDAO.getOrderByOrderNo(orderNo);
	}

	@Override
	public OrderVO createOrder(OrderVO order) {
		return orderDAO.insert(order);
	}

	@Override
	public int updateCommentStatus(Integer orderNo) {
		return orderDAO.updateCommentStatus(orderNo);
	}

	@Override
	public int updateOrderStatus(OrderParams order) {
		return orderDAO.updateOrderStatus(order);
	}

	@Override
	public List<OrderDishRelVO> findDishByOrderNo(String orderNo) {
		return orderDAO.findDishByOrderNo(orderNo);
	}

	@Override
	public void saveOrderDishes(List<OrderDishRelVO> dishRelVOs) {
		orderDAO.saveOrderDishes(dishRelVOs);
	}

	@Override
	public Map<String, Long> findOrdersByMerchantSummary(OrderParams order) {

		List<Map<String, Object>> orderSummary = orderDAO
				.findOrdersByMerchantSummary(order);
		Map<String, Long> summary = new HashMap<String, Long>();

		for (Map<String, Object> count : orderSummary) {
			int orderStatus = (int) count.get("order_status");
			Long amout = (long) count.get("amount");

			if (orderStatus == OrderStatus.ORDER_PAYED.value()) {
				Long number = summary.get(OrderStatus.ORDER_PAYED.value());

				if (number != null && number == 0)
					summary.put(OrderStatus.ORDER_PAYED.name(), amout + number);
				else
					summary.put(OrderStatus.ORDER_PAYED.name(), amout);

			} else if (orderStatus == OrderStatus.ORDER_MERCHANT_CONFIRM
					.value()) {

				Long number = summary.get(OrderStatus.ORDER_MERCHANT_CONFIRM
						.value());

				if (number != null && number != 0)
					summary.put(OrderStatus.ORDER_MERCHANT_CONFIRM.name(),
							amout + number);
				else
					summary.put(OrderStatus.ORDER_MERCHANT_CONFIRM.name(),
							amout);

			} else if (orderStatus == OrderStatus.ORDER_DISH_FINISHED.value()) {

				Long number = summary.get(OrderStatus.ORDER_DISH_FINISHED
						.value());

				if (number != null && number != 0)
					summary.put(OrderStatus.ORDER_DISH_FINISHED.name(), amout
							+ number);
				else
					summary.put(OrderStatus.ORDER_DISH_FINISHED.name(), amout);

			} else if (orderStatus == OrderStatus.ORDER_STEP2_CLIENT_WITHDRAW_PAYED
					.value()
					|| orderStatus == OrderStatus.ORDER_STEP2_MERCHANT_WITHDRAW_PAYED
							.value()
					|| orderStatus == OrderStatus.ORDER_STEP3_CLIENT_WITHDRAW_PAYED
							.value()
					|| orderStatus == OrderStatus.ORDER_STEP3_MERCHANT_WITHDRAW_PAYED
							.value()) {

				Long number = summary.get(OrderStatus.ORDER_WITHDRAW.value());

				if (number != null && number != 0)
					summary.put(OrderStatus.ORDER_WITHDRAW.name(), amout
							+ number);
				else
					summary.put(OrderStatus.ORDER_WITHDRAW.name(), amout);

			} else if (orderStatus == OrderStatus.ORDER_WITHDRAW_COD.value()
					|| orderStatus == OrderStatus.ORDER_WITHDRAW_PAYED.value()) {

				Long number = summary.get(OrderStatus.ORDER_COMPELETE_WITHDRAW
						.value());

				if (number != null && number != 0)
					summary.put(OrderStatus.ORDER_COMPELETE_WITHDRAW.name(),
							amout + number);
				else
					summary.put(OrderStatus.ORDER_COMPELETE_WITHDRAW.name(),
							amout);

			}

		}

		return summary;

	}
	@Override
	public List<MerchantOrderHeaderVO> findOrdersByMerchant(
			OrderParams parameter) {

		List<MerchantOrderHeaderVO> orders = null;
		orders = orderDAO.findMerchantOrders(parameter);

		if (orders != null && orders.size() > 0) {

			for (int i = 0; i < orders.size(); i++) {

				MerchantOrderHeaderVO order = orders.get(i);
				if (order != null) {
					// 加载头像
					order.setImg("http://www.touxiang.cn/uploads/20140218/18-074928_617.jpg");

					// 加载菜品列表
					if (StringUtils.isBlank(parameter.getRepastMode())) {
						List<MechantMenuVO> dishes = menuDao
								.findByMenuIds(order.longDishesId());
						List<String> dishNames = dishes.stream()
								.map(menu -> menu.getName())
								.collect(Collectors.toList());
						order.setDishNames(dishNames);

					}

				} else {
					return orders;
				}

			}

		}

		return orders;
	}

	@Override
	public MerchantOrderDetailVO findOrderDetailByOrderNo(String orderNo) {

		MerchantOrderDetailVO order = orderDAO.findOrderDetail(orderNo);

		if (order != null) {
			// 查询菜品
			List<MechantMenuVO> dishes = menuDao.findByMenuIds(
					order.longDishesId(), orderNo);

			order.setDishes(dishes);

			// 查询个人信息
			ClientUserVO user = userDao.findByid(order.getBuyerId());
			if (user != null) {
				order.setBuyerName(user.getName());
				order.setPhone(user.getTel());
			}

		} else {
			return null;
		}

		return order;
	}

	public int count(OrderParams op) {
		return orderDAO.count(op);
	}

	@Override
	public int countAll() {
		// TODO Auto-generated method stub
		return orderDAO.countAll();
	}

	@Override
	public List<OrderVO> getOrdersByParams(OrderParams op) {
		List<OrderVO> list = orderDAO.getOrdersByParams(op);
		return list;

	}

	@Override
	public void updateOrder(OrderVO order) {
		// TODO Auto-generated method stub

	}

	@Override
	public MerchantOrderOverviewVO findOrdersByMerchantOverview(
			OrderParams order) {

		return orderDAO.findOrdersByMerchantOverview(order);
	}
	
	@Override
	public MerchantIncomeVO findMyIncome(
			OrderParams order) {
		
		return orderDAO.findMyIncome(order);
	}



}
