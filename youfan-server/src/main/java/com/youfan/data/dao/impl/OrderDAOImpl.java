package com.youfan.data.dao.impl;

import com.youfan.data.dao.OrderDAO;
import com.youfan.data.id.IdGenerator;
import com.youfan.data.models.OrderEntity;
import com.youfan.rest.objs.Order;
import com.youfan.services.OrderNoGenerator;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.math.BigDecimal;

/**
 * Created by yousheng on 15/8/13.
 */
@Repository("orderDAO")
public class OrderDAOImpl implements OrderDAO {

    private final String SEQ_ORDER = "ORDER";
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


    private OrderEntity createEntity(Order order) {
        OrderEntity orderEntity = new OrderEntity();


        orderEntity.setId(order.getOrderId());
        orderEntity.setBuyerId(order.getBuyerId());
        orderEntity.setSellerId(order.getSellerId());


        orderEntity.setMemo(order.getMemo());
        orderEntity.setOrderStatus(order.getOrderStatus());

        orderEntity.setPrice(BigDecimal.valueOf(order.getPrice()));
        return orderEntity;
    }
}
