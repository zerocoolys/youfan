package com.youfan.data.dao;

import com.youfan.commons.Pagination;
import com.youfan.controllers.objs.Order;

import java.util.List;

/**
 * Created by yousheng on 15/8/13.
 */
public interface OrderDAO {
    Order insert(Order orderEntity);

    Order getOrderByOrderNo(String orderNo);

    List<Order> findAll(Pagination pagination);

    List<Order> findOrders(Order order);
    
    
}
