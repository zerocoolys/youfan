package com.youfan.services.server.impl;

import java.util.ArrayList;
import java.util.Collections;
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
import com.youfan.commons.vo.merchant.MerchantOrderHeaderVO;
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
	public int updateOrderStatus(OrderParams order) {
	
		if(order.getOrderStatus() == OrderStatus.ORDER_PAYED.value()) {
			order.setOrderStatus(OrderStatus.ORDER_MERCHANT_CONFIRM.value());
		} else if(order.getOrderStatus() == OrderStatus.ORDER_MERCHANT_CONFIRM.value()) {
			order.setOrderStatus(OrderStatus.ORDER_DISH_FINISHED.value());
		} else {
			return 0;
		}
		return orderDAO.updateOrderStatus(order);
	}

	@Override
	public OrderVO cancelOrder(OrderVO order) {
		return null;
	}

	@Override
	public OrderVO refundOrder(OrderVO order) {
		return null;
	}

	@Override
	public void saveOrderDishes(List<OrderDishRelVO> dishRelVOs) {
		orderDAO.saveOrderDishes(dishRelVOs);
	}
	
	@Override
	public Map<String,Integer> findOrdersByMerchantSummary(
			OrderParams order) {
		
		return 	orderDAO.findOrdersByMerchantSummary(order);
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


}
