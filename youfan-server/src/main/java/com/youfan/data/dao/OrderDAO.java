package com.youfan.data.dao;

import com.youfan.commons.Pagination;
import com.youfan.controllers.objs.MerchantOrderHeaderVO;
import com.youfan.controllers.objs.OrderVO;

import java.util.List;

/**
 * Created by yousheng on 15/8/13.
 */
public interface OrderDAO {

    String SEQ_ORDER = "ORDER";


    OrderVO insert(OrderVO orderEntity);

    OrderVO getOrderByOrderNo(String orderNo);

    List<OrderVO> findAll(Pagination pagination);

    List<OrderVO> getOrdersByBuyerId(Long buyerId, Pagination pagination);

    List<OrderVO> getOrdersBySellerId(Long sellerId, Pagination pagination);

    List<MerchantOrderHeaderVO> findMerchantOrders(OrderVO order);

}
