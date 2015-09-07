package com.youfan.services.server;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.MerchantOrderDetailVO;
import com.youfan.commons.vo.merchant.MerchantOrderHeaderVO;
import com.youfan.commons.vo.server.OrderDishRelVO;
import com.youfan.commons.vo.server.OrderVO;
import com.youfan.controllers.params.OrderParams;

import java.util.List;

/**
 * Created by yousheng on 15/8/18.
 */
public interface OrderService {

    List<OrderVO> findAll(Pagination pagination);

    List<OrderVO> findByUserId(String userId, Pagination pagination);

    List<OrderVO> findBySellerId(String sellerId, Pagination pagination);

    OrderVO findOrderById(Long id);

    OrderVO findByOrderNo(String orderNo);

    OrderVO createOrder(OrderVO order);

    void updateOrder(OrderVO order);

    OrderVO cancelOrder(OrderVO order);

    OrderVO refundOrder(OrderVO order);

    void saveOrderDishes(List<OrderDishRelVO> dishRelVOs);

    List<MerchantOrderHeaderVO> findOrdersByMerchant(OrderParams order);

    MerchantOrderDetailVO findOrderDetailByOrderNo(String orderNo);

    int count(OrderParams op);

    int countAll();

    List<OrderVO> getOrdersByParams(OrderParams op);

    int updateOrderStatus(OrderParams order);

}
