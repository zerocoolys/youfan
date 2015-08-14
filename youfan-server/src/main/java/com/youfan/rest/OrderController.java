package com.youfan.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youfan.data.dao.OrderDAO;
import com.youfan.rest.objs.Order;
import com.youfan.rest.params.OrderParams;
import com.youfan.rest.support.Response;
import com.youfan.rest.support.Responses;
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

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public Response getOrder(@PathVariable String id) {

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


            Order order = new Order();

            order.setBuyerId(orderParams.getBuyerId());
            order.setSellerId(orderParams.getSellerId());
            order.setMemo(orderParams.getMemo());
            order.setOrderStatus(orderParams.getOrderStatus());

            
            orderDAO.insert(order);

        } catch (IOException e) {
            e.printStackTrace();
        }

        Response response = Responses.SUCCESS().setPayload(order);
        return response;
    }
}
