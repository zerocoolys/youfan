package com.youfan.data.dao.server;

import java.util.List;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.OrderVO;
import com.youfan.commons.vo.merchant.MerchantOrderHeaderVO;
import com.youfan.controllers.params.OrderParams;

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

    List<MerchantOrderHeaderVO> findMerchantOrders(OrderParams order);

    
    int countAll();
	int count(OrderParams op);
	
	List<OrderVO> getOrdersByParams (OrderParams op,Pagination p);

}
