package com.youfan.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youfan.controllers.objs.Order;
import com.youfan.controllers.params.OrderParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.orders.OrderService;
import com.youfan.utils.JsonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

/**
 * Created by yousheng on 15/8/13.
 */
@RestController
@RequestMapping(path = "/orders")
public class OrderController {

	@Resource
	private OrderService orderService;
	Logger logger = LoggerFactory.getLogger(OrderController.class);

	@RequestMapping(method = RequestMethod.GET, path = "/{orderNo}")
	public Response getOrder(@PathVariable final String orderNo) {

		Order order = orderService.findByOrderNo(orderNo);

		if (order == null) {

		}
		return Responses.SUCCESS();
	}

	@RequestMapping(method = RequestMethod.GET)
	public Response list() {

		return Responses.SUCCESS();
	}

	@RequestMapping(method = RequestMethod.GET, path = "/merchants/{merchantInfo}")
	public Response listByMerchant(@PathVariable String merchantInfo) {
		Response response = null;
		try {
			Order order = JsonUtil.json2pojo(merchantInfo, Order.class);
			List<Order> orders = orderService.findOrdersByMerchant(order);
			response = Responses.SUCCESS().setPayload(orders);
		} catch (Exception e) {
			response = Responses.FAILED();
			logger.error(e.getMessage());
		}

		return response;

	}

	@RequestMapping(method = RequestMethod.GET, path = "/users/{userId}")
	public Response listByUserId(@PathVariable String userId) {
		return Responses.SUCCESS();
	}

	@RequestMapping(path = "/create", method = RequestMethod.POST, consumes = {
			MediaType.TEXT_PLAIN_VALUE, MediaType.APPLICATION_JSON_VALUE })
	@Transactional
	public Response create(@RequestBody String orderParamStr) {
		ObjectMapper mapper = new ObjectMapper();
		OrderParams orderParams = null;
		try {
			orderParams = mapper.readValue(orderParamStr, OrderParams.class);
		} catch (IOException e) {
			e.printStackTrace();
		}
		Order order = new Order();

		order.setBuyerId(orderParams.getBuyerId());
		order.setSellerId(orderParams.getSellerId());
		order.setComments(orderParams.getComments());
		order.setOrderStatus(orderParams.getOrderStatus());

		Order result = orderService.createOrder(order);

		Response response = null;
		if (result == null) {
			response = Responses.FAILED();
		} else {
			response = Responses.SUCCESS().setPayload(result);
		}

		return response;

	}

	@RequestMapping(method = RequestMethod.POST, params = "/{orderNo}")
	public Response refund(@PathVariable String orderNo,
			@RequestBody String orderInfo) {

		return Responses.SUCCESS();
	}

}
