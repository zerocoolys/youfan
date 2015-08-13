package com.youfan.rest;

import com.youfan.data.dao.OrderDAO;
import com.youfan.rest.objs.Order;
import com.youfan.rest.support.Response;
import com.youfan.rest.support.Responses;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

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

        orderDAO.say();
        return Responses.SUCCESS();
    }


    @RequestMapping(method = RequestMethod.GET)
    public Response list() {

        return Responses.SUCCESS();
    }

    @RequestMapping(method = RequestMethod.POST, path = "/order")
    public Response create(@RequestBody Order order) {


        // TODO 检查订单是否有效


        return Responses.SUCCESS();
    }
}
