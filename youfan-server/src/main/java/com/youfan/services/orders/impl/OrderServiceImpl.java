package com.youfan.services.orders.impl;

import com.youfan.commons.Pagination;
import com.youfan.controllers.objs.Order;
import com.youfan.data.dao.OrderDAO;
import com.youfan.services.orders.OrderService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by yousheng on 15/8/18.
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Resource
    private OrderDAO orderDAO;


    @Override
    public List<Order> findAll(Pagination pagination) {

        List<Order> result = Collections.emptyList();

        result.addAll(orderDAO.findAll(pagination));

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
}
