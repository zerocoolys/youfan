package com.youfan.data.dao;

import com.youfan.data.models.OrderEntity;
import com.youfan.rest.objs.Order;

/**
 * Created by yousheng on 15/8/13.
 */
public interface OrderDAO {
    Order insert(Order orderEntity);
}
