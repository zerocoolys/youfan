package com.youfan.data.dao;

import com.youfan.controllers.objs.Order;

/**
 * Created by yousheng on 15/8/13.
 */
public interface OrderDAO {
    Order insert(Order orderEntity);

    Order getOrderByOrderNo(String orderNo);
}
