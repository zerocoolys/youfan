package com.youfan.services.orders;

import com.youfan.commons.Pagination;
import com.youfan.controllers.objs.MerchantOrderHeaderVO;
import com.youfan.controllers.objs.OrderVO;

import java.util.List;

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

    List<MerchantOrderHeaderVO> findOrdersByMerchant(OrderVO order);

}
