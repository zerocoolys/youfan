package com.youfan.services.orders;

import com.youfan.commons.Pagination;
import com.youfan.controllers.objs.Order;

import java.util.List;

/**
 * Created by yousheng on 15/8/18.
 */
public interface OrderService {

    List<Order> findAll(Pagination pagination);

    List<Order> findByUserId(String userId, Pagination pagination);

    List<Order> findBySellerId(Long sellerId, Pagination pagination);

    Order findByOrderNo(String orderNo);

    Order createOrder(Order order);

    Order updateOrder(Order order);

    Order cancelOrder(Order order);

    Order refundOrder(Order order);

    List<Order> findOrdersByMerchant(Order order);

}
