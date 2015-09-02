package com.youfan.services.server;

import java.util.List;

import com.youfan.commons.Pagination;

import com.youfan.commons.vo.MerchantOrderDetailVO;

import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.OrderVO;
import com.youfan.commons.vo.merchant.MerchantOrderHeaderVO;
import com.youfan.controllers.params.OrderParams;

/**
 * Created by yousheng on 15/8/18.
 */
public interface OrderService {

    List<OrderVO> findAll(Pagination pagination);

    List<OrderVO> findByUserId(String userId, Pagination pagination);

    List<OrderVO> findBySellerId(Long sellerId, Pagination pagination);

    OrderVO findByOrderNo(String orderNo);

    OrderVO createOrder(OrderVO order);

    OrderVO updateOrder(OrderVO order);

    OrderVO cancelOrder(OrderVO order);

    OrderVO refundOrder(OrderVO order);

    List<MerchantOrderHeaderVO> findOrdersByMerchant(OrderParams order);
    
    MerchantOrderDetailVO findOrderDetailByOrderNo(String orderNo);
    

	int count(OrderParams op);

	int countAll();
	
	CollectionVO<OrderVO> getOrdersByParams (OrderParams op);
	
	int updateOrderStatus(OrderParams order);
}
