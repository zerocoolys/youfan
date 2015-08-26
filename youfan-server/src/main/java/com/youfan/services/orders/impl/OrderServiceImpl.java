package com.youfan.services.orders.impl;

import com.youfan.commons.Pagination;
import com.youfan.controllers.objs.Menu;
import com.youfan.controllers.objs.MerchantOrderHeader;
import com.youfan.controllers.objs.Order;
import com.youfan.data.dao.MenuDAO;
import com.youfan.data.dao.OrderDAO;
import com.youfan.services.orders.OrderService;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by yousheng on 15/8/18.
 */
@Service
public class OrderServiceImpl implements OrderService {

	@Resource
	private OrderDAO orderDAO;
	
	@Resource
	private MenuDAO menuDao;
	

	@Override
	public List<Order> findAll(Pagination pagination) {

		List<Order> result = Collections.emptyList();

		return result;
	}

	@Override
	public List<Order> findByUserId(String userId, Pagination pagination) {
		return null;
	}

	@Override
	public List<Order> findBySellerId(Long sellerId, Pagination pagination) {
		List<Order> result = new ArrayList<>();

		result.addAll(orderDAO.getOrdersBySellerId(sellerId, pagination));

		return result;
	}

	@Override
	public Order findByOrderNo(String orderNo) {
		return null;
	}

	@Override
	public Order createOrder(Order order) {
		orderDAO.insert(order);
		return null;
	}

	@Override
	public Order updateOrder(Order order) {
		return null;
	}

	@Override
	public Order cancelOrder(Order order) {
		return null;
	}

	@Override
	public Order refundOrder(Order order) {
		return null;
	}

	@Override
	public List<MerchantOrderHeader> findOrdersByMerchant(Order parameter) {

		List<MerchantOrderHeader> orders = null;
		orders = orderDAO.findMerchantOrders(parameter);

		if (orders != null && orders.size() > 0) {

			for (int i = 0; i < orders.size(); i++) {

				
				MerchantOrderHeader order = orders.get(i);
				if (order != null) {
					//加载头像
					order.setImg("http://www.touxiang.cn/uploads/20140218/18-074928_617.jpg");
					//加载菜品列表
					if(StringUtils.isBlank(parameter.getRepastMode())) {
						List<Menu> menus = menuDao.findByMenuIds(order.longDishesId());
		
					
						  List<String> r = menus.stream()
					                .map(menu -> menu.getName())        
					                .collect(Collectors.toList());
						
					
					      System.out.println(r.toString());
					
						
					}
				
				} else {
					return orders = null;
				}
				
			}

		}

		return orders;
	}
}
