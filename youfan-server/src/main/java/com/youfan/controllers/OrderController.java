package com.youfan.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youfan.controllers.objs.Order;
import com.youfan.controllers.params.OrderParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.data.dao.OrderDAO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.IOException;

/**
 * Created by yousheng on 15/8/13.
 */
@RestController
@RequestMapping(path = "/orders")
public class OrderController {


    @Resource
    private OrderDAO orderDAO;

    @RequestMapping(method = RequestMethod.GET, path = "/{orderNo}")
    public Response getOrder(@PathVariable String orderNo) {

        Order order = orderDAO.getOrderByOrderNo(orderNo);

        if (order == null) {

        }
        return Responses.SUCCESS();
    }


    @RequestMapping(method = RequestMethod.GET)
    public Response list() {

        return Responses.SUCCESS();
    }

    @RequestMapping(method = RequestMethod.POST, consumes = {MediaType.TEXT_PLAIN_VALUE, MediaType.APPLICATION_JSON_VALUE})
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
        order.setMemo(orderParams.getMemo());
        order.setOrderStatus(orderParams.getOrderStatus());

        Order result = orderDAO.insert(order);

        Response response = null;
        if (result == null) {
            response = Responses.FAILED();
        } else {
            response = Responses.SUCCESS().setPayload(result);
        }

        return response;

    }
}
