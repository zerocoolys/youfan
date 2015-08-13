package com.youfan.rest;

import com.youfan.rest.models.Order;
import com.youfan.rest.support.Response;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by yousheng on 15/8/13.
 */
@RestController
public class OrderController {


    @RequestMapping(method = RequestMethod.POST, path = "/order")
    public Response create(@RequestBody Order order) {


        return new Response(0);
    }
}
