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
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

/**
 * Created by yousheng on 15/8/13.
 */
@Repository("orderDAO")
public class OrderDAOImpl implements OrderDAO {

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

        OrderEntity orderEntity = sqlSession.selectOne("getOrderByOrderNo",
                orderNo);

        Order order = createObject(orderEntity);
        List<OrderDishRelEntity> dishList = sqlSession.selectList(
                "getOrderItemsByOrderNo", orderNo);

        return null;
    }

    @Override
    public List<Order> findAll(Pagination pagination) {
        List<Order> list = sqlSession.selectList("findAllByPagination", pagination);

        return list;
    }

    @Override
    public List<Order> getOrdersByBuyerId(Long buyerId, Pagination pagination) {
        List<Order> orders = sqlSession.selectList("getOrdersByBuyerId", pagination);

        return orders;
    }

    @Override
    public List<Order> getOrdersBySellerId(Long sellerId, Pagination pagination) {
        List<Order> orders = sqlSession.selectList("getOrdersBySellerId", pagination);

        return orders;
    }


    private OrderEntity createEntity(Order order) {
        OrderEntity orderEntity = new OrderEntity();

        orderEntity.setId(order.getId());
        orderEntity.setBuyerId(order.getBuyerId());
        orderEntity.setSellerId(order.getSellerId());
        orderEntity.setPrice(BigDecimal.valueOf(order.getPrice()));
        orderEntity.setOrderStatus(order.getOrderStatus());

        orderEntity.setOrderTime(Timestamp.from(Instant.now()));
        orderEntity.setRepastTime(Timestamp.from(order.getRepastTime().toInstant()));
        orderEntity.setRepastMode(order.getRepastMode());
        orderEntity.setRepastAddress(order.getRepastAddress());
        orderEntity.setCoupons(BigDecimal.valueOf(order.getCoupons()));
        orderEntity.setComments(order.getComments());

        return orderEntity;
    }

    private Order createObject(OrderEntity orderEntity) {
        Order order = new Order();

        order.setId(orderEntity.getId());
        order.setOrderNo(orderEntity.getOrderNo());
        order.setBuyerId(orderEntity.getBuyerId());
        order.setSellerId(orderEntity.getSellerId());

        order.setComments(orderEntity.getComments());
        order.setOrderStatus(orderEntity.getOrderStatus());

        order.setPrice(orderEntity.getPrice().setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
        order.setCoupons(orderEntity.getCoupons().setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());

        order.setOrderTime(orderEntity.getOrderTime());
        order.setRepastTime(orderEntity.getRepastTime());
        order.setRepastMode(orderEntity.getRepastMode());
        order.setRepastAddress(orderEntity.getRepastAddress());

        return order;
    }

    @Override
    public List<Order> findOrders(Order order) {

        return null;
    }

}
