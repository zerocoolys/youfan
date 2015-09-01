package com.youfan.controllers.server;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youfan.commons.vo.MerchantOrderDetailVO;
import com.youfan.commons.vo.OrderVO;
import com.youfan.commons.vo.merchant.MerchantOrderHeaderVO;
import com.youfan.controllers.params.OrderParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.server.OrderService;
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

    Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Resource
    private OrderService orderService;


    @RequestMapping(method = RequestMethod.GET, path = "/{orderNo}")
    public Response getOrder(@PathVariable final String orderNo) {

        OrderVO order = orderService.findByOrderNo(orderNo);

        if (order == null) {

        }
        return Responses.SUCCESS();
    }

    @RequestMapping(method = RequestMethod.GET)
    public Response list() {
        return Responses.SUCCESS();
    }


    @RequestMapping(method = RequestMethod.GET, path = "/orderDetail/{orderNo}")
    public Response getOrderDetailByOrderNo(@PathVariable final String orderNo) {

        Response response = null;
        try {
            MerchantOrderDetailVO order = orderService.findOrderDetailByOrderNo(orderNo);
            if (order == null) {
                return response = Responses.FAILED().setMsg("未查询到该数据");
            }
            response = Responses.SUCCESS().setPayload(order);
        } catch (Exception e) {
            response = Responses.FAILED();
            logger.error(e.getMessage());
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/merchant")
    public Response listByMerchant(
            @RequestParam("orderStatus") int orderStatus,
            @RequestParam("sellerId") String sellerId,
            @RequestParam("repastMode") String repastMode) {
        Response response = null;
        OrderParams orderParams = new OrderParams();
        try {
            orderParams.setSellerId(sellerId);
            orderParams.setOrderStatus(orderStatus);
            orderParams.setRepastMode(repastMode);
            List<MerchantOrderHeaderVO> orders = orderService
                    .findOrdersByMerchant(orderParams);
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

    @RequestMapping(path = "/create", method = RequestMethod.POST,
            consumes = {MediaType.TEXT_PLAIN_VALUE, MediaType.APPLICATION_JSON_VALUE})
    @Transactional
    public Response create(@RequestBody String orderParamStr) {
        ObjectMapper mapper = new ObjectMapper();
        OrderParams orderParams = null;
        try {
            orderParams = mapper.readValue(orderParamStr, OrderParams.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        OrderVO order = new OrderVO();

        order.setBuyerId(orderParams.getBuyerId());
        order.setSellerId(orderParams.getSellerId());
        order.setComments(orderParams.getComments());
        order.setOrderStatus(orderParams.getOrderStatus());

        OrderVO result = orderService.createOrder(order);

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
