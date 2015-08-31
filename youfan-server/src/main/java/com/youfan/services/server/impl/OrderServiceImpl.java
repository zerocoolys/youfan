package com.youfan.services.server.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.OrderVO;
import com.youfan.commons.vo.client.MenuVO;
import com.youfan.commons.vo.merchant.MerchantOrderHeaderVO;
import com.youfan.controllers.params.OrderParams;
import com.youfan.data.dao.client.MenuDAO;
import com.youfan.data.dao.server.OrderDAO;
import com.youfan.services.server.OrderService;

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
                        List<MenuVO> menus = menuDao.findByMenuIds(order.longDishesId());


                        List<String> r = menus.stream()
                                .map(menu -> menu.getName())
                                .collect(Collectors.toList());


                        System.out.println(r.toString());


                    }

                } else {
                    return orders = null;
                }

            }

        }

        return orders;
    }

	@Override
	public int count(OrderParams op) {
		return orderDAO.count(op);		
	}

	@Override
	public int countAll() {
		// TODO Auto-generated method stub
		return orderDAO.countAll();
	}

	@Override
	public CollectionVO<OrderVO> getOrdersByParams(OrderParams op, Pagination p) {
		// TODO Auto-generated method stub
		CollectionVO<OrderVO> vo= new CollectionVO<OrderVO>();
		vo.addAll(orderDAO.getOrdersByParams(op, p));
		return vo;
	}
}
