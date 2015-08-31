package com.youfan.services.server.impl;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.MechantMenuVO;
import com.youfan.commons.vo.MenuVO;
import com.youfan.commons.vo.MerchantOrderDetailVO;
import com.youfan.commons.vo.MerchantOrderHeaderVO;
import com.youfan.commons.vo.OrderVO;
import com.youfan.controllers.params.OrderParams;
import com.youfan.data.dao.client.MenuDAO;
import com.youfan.data.dao.server.OrderDAO;
import com.youfan.services.server.OrderService;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by yousheng on 15/8/18.
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Resource
    private OrderDAO orderDAO;

    @Resource
    private MenuDAO menuDao;


    @Override
    public List<OrderVO> findAll(Pagination pagination) {

        List<OrderVO> result = Collections.emptyList();

        return result;
    }

    @Override
    public List<OrderVO> findByUserId(String userId, Pagination pagination) {
        return null;
    }

    @Override
    public List<OrderVO> findBySellerId(Long sellerId, Pagination pagination) {
        List<OrderVO> result = new ArrayList<>();

        result.addAll(orderDAO.getOrdersBySellerId(sellerId, pagination));

        return result;
    }

    @Override
    public OrderVO findByOrderNo(String orderNo) {
        return null;
    }

    @Override
    public OrderVO createOrder(OrderVO order) {
        orderDAO.insert(order);
        return null;
    }

    @Override
    public OrderVO updateOrder(OrderVO order) {
        return null;
    }

    @Override
    public OrderVO cancelOrder(OrderVO order) {
        return null;
    }

    @Override
    public OrderVO refundOrder(OrderVO order) {
        return null;
    }

    @Override
    public List<MerchantOrderHeaderVO> findOrdersByMerchant(OrderParams parameter) {

        List<MerchantOrderHeaderVO> orders = null;
        orders = orderDAO.findMerchantOrders(parameter);

        if (orders != null && orders.size() > 0) {

            for (int i = 0; i < orders.size(); i++) {

                MerchantOrderHeaderVO order = orders.get(i);
                if (order != null) {
                    //加载头像
                    order.setImg("http://www.touxiang.cn/uploads/20140218/18-074928_617.jpg");
                    //加载菜品列表
                    if (StringUtils.isBlank(parameter.getRepastMode())) {
                        List<MechantMenuVO> dishes = menuDao.findByMenuIds(order.longDishesId());

                        List<String> dishNames = dishes.stream()
                                .map(menu -> menu.getName())
                                .collect(Collectors.toList());
                        order.setDishNames(dishNames);

                    }

                } else {
                    return orders;
                }

            }

        }

        return orders;
    }

	@Override
	public MerchantOrderDetailVO findOrderDetailByOrderNo(String orderNo) {
		
		MerchantOrderDetailVO order  = orderDAO.findOrderDetail(orderNo);
		
		
		 if (order != null) {
                List<MechantMenuVO> dishes = menuDao.findByMenuIds(order.longDishesId());

          
         } else {
             return null;
         }
		
		return order;
	}
}
