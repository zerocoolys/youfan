package com.youfan.data.dao.impl;

import com.youfan.commons.OrderNoGenerator;
import com.youfan.commons.Pagination;
import com.youfan.controllers.objs.Order;
import com.youfan.data.dao.OrderDAO;
import com.youfan.data.id.IdGenerator;
import com.youfan.data.models.OrderDishRelEntity;
import com.youfan.data.models.OrderEntity;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by yousheng on 15/8/13.
 */
@Repository("orderDAO")
public class OrderDAOImpl implements OrderDAO {

    private static final String SEQ_ORDER = "ORDER";

    @Resource
    private IdGenerator idGenerator;

    @Resource
    private SqlSession sqlSession;


    @Override
    public Order insert(Order order) {

        OrderEntity orderEntity = createEntity(order);

        long no = idGenerator.next(SEQ_ORDER);

        String orderNo = OrderNoGenerator.orderNo(no);

        orderEntity.setOrderNo(orderNo);

        int ret = sqlSession.insert("createOrder", orderEntity);
        if (ret == 0) {
            return null;
        }

        order.setOrderNo(orderEntity.getOrderNo());
        return order;
    }

    @Override
    public Order getOrderByOrderNo(String orderNo) {

        OrderEntity orderEntity = sqlSession.selectOne("getOrderByOrderNo", orderNo);

        Order order = createObject(orderEntity);
        List<OrderDishRelEntity> dishList = sqlSession.selectList("getOrderItemsByOrderNo", orderNo);

        return null;
    }

    @Override
    public List<Order> findAll(Pagination pagination) {

		List<Order> list = sqlSession.selectList("findAllByPagination", pagination);


        return list;
    }


    private OrderEntity createEntity(Order order) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setId(order.getId());
        orderEntity.setBuyerId(order.getBuyerId());
        orderEntity.setSellerId(order.getSellerId());

        orderEntity.setComments(order.getComments());
        orderEntity.setOrderStatus(order.getOrderStatus());

        orderEntity.setPrice(BigDecimal.valueOf(order.getPrice()));
        return orderEntity;
    }

    private Order createObject(OrderEntity orderEntity) {
        Order order = new Order();
        orderEntity.setId(order.getId());
        orderEntity.setBuyerId(order.getBuyerId());
        orderEntity.setSellerId(order.getSellerId());

        orderEntity.setComments(order.getComments());
        orderEntity.setOrderStatus(order.getOrderStatus());

        orderEntity.setPrice(BigDecimal.valueOf(order.getPrice()));
        return order;
    }

	@Override
	public List<Order> findOrdersByMerchantId(String merchantId) {

		return null;
	}
}
