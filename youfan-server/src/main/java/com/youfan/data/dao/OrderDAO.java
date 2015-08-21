package com.youfan.data.dao;

import com.youfan.commons.Pagination;
import com.youfan.controllers.objs.Order;

import java.util.List;

/**
 * Created by yousheng on 15/8/13.
 */
public interface OrderDAO {

    String SEQ_ORDER = "ORDER";


    Order insert(Order orderEntity);

    Order getOrderByOrderNo(String orderNo);

    List<Order> findAll(Pagination pagination);

    List<Order> getOrdersByBuyerId(Long buyerId, Pagination pagination);

    List<Order> getOrdersBySellerId(Long sellerId, Pagination pagination);
}
