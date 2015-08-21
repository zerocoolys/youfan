package com.youfan.services.orders;

import com.youfan.commons.Pagination;
import com.youfan.controllers.objs.Order;

import java.util.List;

/**
 * Created by yousheng on 15/8/18.
 */
public interface OrderService {

	public List<Order> findAll(Pagination pagination);

	public List<Order> findByUserId(String userId);

	public Order findByOrderNo(String orderNo);

	public Order createOrder(Order order);

	public Order updateOrder(Order order);

	public Order cancelOrder(Order order);

	public Order refundOrder(Order order);

	public List<Order> findOrdersByMerchant(Order order);

}
