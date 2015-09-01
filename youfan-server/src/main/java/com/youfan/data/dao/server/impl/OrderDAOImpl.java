package com.youfan.data.dao.server.impl;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.youfan.commons.OrderNoGenerator;
import com.youfan.commons.Pagination;
import com.youfan.commons.vo.MerchantOrderDetailVO;
import com.youfan.commons.vo.OrderVO;
import com.youfan.commons.vo.merchant.MerchantOrderHeaderVO;
import com.youfan.controllers.params.OrderParams;
import com.youfan.data.dao.server.OrderDAO;
import com.youfan.data.models.OrderDishRelEntity;
import com.youfan.data.models.OrderEntity;
import com.youfan.data.support.IdGenerator;

import java.util.HashMap;
import java.util.Map;

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
	public OrderVO insert(OrderVO order) {

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
	public OrderVO getOrderByOrderNo(String orderNo) {

		OrderEntity orderEntity = sqlSession.selectOne("getOrderByOrderNo",
				orderNo);

		OrderVO order = createObject(orderEntity);
		List<OrderDishRelEntity> dishList = sqlSession.selectList(
				"getOrderItemsByOrderNo", orderNo);

		return null;
	}

	@Override
	public List<OrderVO> findAll(Pagination pagination) {
		List<OrderVO> list = sqlSession.selectList("findAllByPagination",
				pagination);

		return list;
	}

	@Override
	public List<OrderVO> getOrdersByBuyerId(Long buyerId, Pagination pagination) {
		List<OrderVO> orders = sqlSession.selectList("getOrdersByBuyerId",
				pagination);

		return orders;
	}

	@Override
	public List<OrderVO> getOrdersBySellerId(Long sellerId,
			Pagination pagination) {
		List<OrderVO> orders = sqlSession.selectList("getOrdersBySellerId",
				pagination);

		return orders;
	}

	private OrderEntity createEntity(OrderVO order) {
		OrderEntity orderEntity = new OrderEntity();

		orderEntity.setId(order.getId());
		orderEntity.setBuyerId(order.getBuyerId());
		orderEntity.setSellerId(order.getSellerId());
		orderEntity.setPrice(BigDecimal.valueOf(order.getPrice()));
		orderEntity.setOrderStatus(order.getOrderStatus());

		orderEntity.setOrderTime(Timestamp.from(Instant.now()));
		orderEntity.setRepastTime(Timestamp.from(order.getRepastTime()
				.toInstant()));
		orderEntity.setRepastMode(order.getRepastMode());
		orderEntity.setRepastAddress(order.getRepastAddress());
		orderEntity.setCoupons(BigDecimal.valueOf(order.getCoupons()));
		orderEntity.setComments(order.getComments());

		return orderEntity;
	}

	private OrderVO createObject(OrderEntity orderEntity) {
		OrderVO order = new OrderVO();

		order.setId(orderEntity.getId());
		order.setOrderNo(orderEntity.getOrderNo());
		order.setBuyerId(orderEntity.getBuyerId());
		order.setSellerId(orderEntity.getSellerId());

		order.setComments(orderEntity.getComments());
		order.setOrderStatus(orderEntity.getOrderStatus());

		order.setPrice(orderEntity.getPrice()
				.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
		order.setCoupons(orderEntity.getCoupons()
				.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());

		order.setOrderTime(orderEntity.getOrderTime());
		order.setRepastTime(orderEntity.getRepastTime());
		order.setRepastMode(orderEntity.getRepastMode());
		order.setRepastAddress(orderEntity.getRepastAddress());

		return order;
	}

	@Override
	public List<MerchantOrderHeaderVO> findMerchantOrders(OrderParams order) {
		OrderEntity orderEntity = new OrderEntity();
		orderEntity.setOrderStatus(order.getOrderStatus());
		orderEntity.setSellerId(order.getSellerId());
		orderEntity.setRepastMode(order.getRepastMode());

		List<MerchantOrderHeaderVO> orders = sqlSession.selectList(
				"findOrders", orderEntity);

		return orders;
	}

	@Override
	public MerchantOrderDetailVO findOrderDetail(String orderNo) {

		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put("orderNo", orderNo);

		MerchantOrderDetailVO order = sqlSession.selectOne("findOrderDetail",
				parameter);

		return order;
	}

	@Override
	public int count(OrderParams op) {
		List<Object> lenO = sqlSession.selectList("count");
		return Integer.parseInt(lenO.get(0).toString());
	}

	@Override
	public int countAll() {
		List<Object> lenO = sqlSession.selectList("countAll");
		return Integer.parseInt(lenO.get(0).toString());
	}

	@Override
	public List<OrderVO> getOrdersByParams(OrderParams op) {
		return sqlSession.selectList("getOrdersByParams", op);
	}

	@Override
	public int updateOrderStatus(OrderParams order) {
		
		
		return sqlSession.update("updateOrder", order);
	}

}
