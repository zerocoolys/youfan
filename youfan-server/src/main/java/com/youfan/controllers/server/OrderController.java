package com.youfan.controllers.server;

import com.youfan.commons.Constants;
import com.youfan.commons.OrderStatus;
import com.youfan.commons.Pagination;
import com.youfan.commons.vo.MerchantOrderDetailVO;
import com.youfan.commons.vo.client.MenuVO;
import com.youfan.commons.vo.merchant.MerchantOrderHeaderVO;
import com.youfan.commons.vo.server.OrderDishRelVO;
import com.youfan.commons.vo.server.OrderVO;
import com.youfan.controllers.params.OrderParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.client.MenuService;
import com.youfan.services.server.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
<<<<<<< HEAD





=======
>>>>>>> 32279d0f482bf5f4c5845f74dbd5182f6a730e24
import java.util.*;

import static com.youfan.commons.OrderStatus.ORDER_WAIT_FOR_PAY;

/**
 * Created by yousheng on 15/8/13.
 */
@RestController
@RequestMapping(path = "/orders")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);


    @Resource
    private OrderService orderService;

    @Resource
    private MenuService menuService;


    @RequestMapping(method = RequestMethod.GET, path = "/users/{userId}")
    public Response listByUserId(@PathVariable String userId) {
        return Responses.SUCCESS();
    }

    /**
     * 修改订单状态
     *
     * @param orderNo
     * @return
     */
    @RequestMapping(value = "/merchant/{orderNo}", method = RequestMethod.POST)
    public Response updateOrderStatus(@PathVariable final String orderNo,
                                      int orderStatus) {

        Response response = null;
        OrderParams order = new OrderParams();
        order.setOrderNo(orderNo);
        order.setOrderStatus(orderStatus);

        try {
            int tag = orderService.updateOrderStatus(order);
            if (tag == 1) {
                response = Responses.SUCCESS();
            } else {
                response = Responses.FAILED();
            }
        } catch (Exception e) {
            response = Responses.FAILED();
            logger.error(e.getMessage());
        }

        return response;
    }

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
            List<Integer> orderStatusList = null;
            if(orderParams.getOrderStatus() == Constants.ORDER_STATUS_REFUND) {
            	orderStatusList = new ArrayList<Integer>();
            	orderStatusList.add(OrderStatus.ORDER_STEP2_CLIENT_WITHDRAW_PAYED.value());
            	orderStatusList.add(OrderStatus.ORDER_STEP2_MERCHANT_WITHDRAW_PAYED.value());
            	orderStatusList.add(OrderStatus.ORDER_STEP3_CLIENT_WITHDRAW_PAYED.value());
            	orderStatusList.add(OrderStatus.ORDER_STEP3_MERCHANT_WITHDRAW_PAYED.value());
            	orderParams.setOrderStatusList(orderStatusList);
            } else if(orderParams.getOrderStatus() == Constants.ORDER_STATUS_COMPLETE_REFUND) {
            	orderStatusList = new ArrayList<Integer>();
            	orderStatusList.add(OrderStatus.ORDER_WITHDRAW_PAYED.value());
            	orderStatusList.add(OrderStatus.ORDER_WITHDRAW_COD.value());
            	orderParams.setOrderStatusList(orderStatusList);
            }
            
            
            List<MerchantOrderHeaderVO> orders = orderService
                    .findOrdersByMerchant(orderParams);
            response = Responses.SUCCESS().setPayload(orders);
        } catch (Exception e) {
            response = Responses.FAILED();
            logger.error(e.getMessage());
        }

        return response;

    }


    @RequestMapping(method = RequestMethod.POST, path = "/users/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Response listByUserId(@PathVariable String userId, @RequestBody OrderParams orderParams) {
        Pagination pagination = new Pagination();
        pagination.setPageNo(orderParams.getPageNo());
        pagination.setPageSize(orderParams.getPageSize());
        Map<String, Object> pageParamsMap = orderParams.getParams();
        if (pageParamsMap == null)
            pageParamsMap = new HashMap<>();

        pageParamsMap.put("start", pagination.getStart());
        pageParamsMap.put("end", pagination.getEnd());
        pageParamsMap.put("userId", userId);
        pageParamsMap.put("orderBy", orderParams.getOrderBy());
        pageParamsMap.put("sort", orderParams.getAsc());
        pagination.setParams(pageParamsMap);

        List<OrderVO> result = orderService.findByUserId(userId, pagination);

        return Responses.SUCCESS().setPayload(result);
    }

    @RequestMapping(method = RequestMethod.POST, produces = {MediaType.APPLICATION_FORM_URLENCODED_VALUE, MediaType.APPLICATION_JSON_VALUE})
//    @Transactional
    public Response create(@RequestBody OrderParams orderParams) {
        OrderVO order = new OrderVO();

        order.setBuyerId(orderParams.getBuyerId());
        order.setSellerId(orderParams.getSellerId());
        order.setOrderStatus(ORDER_WAIT_FOR_PAY.value());
        order.setOrgPrice(orderParams.getOriginalPrice());
        order.setDiscountPrice(orderParams.getDiscountPrice());
        order.setOrderTime(new Date());
        order.setRepastTime(orderParams.getRepastTime());
        order.setRepastMode(orderParams.getRepastMode());
        order.setRepastAddress(orderParams.getRepastAddress());
        order.setCouponId(orderParams.getCouponId());
        order.setComments(orderParams.getComments());

        // 订购的菜品信息
        List<OrderDishRelVO> orderDishRelVOList = new ArrayList<>();
        // 菜品余量信息
        List<MenuVO> menuVOList = new ArrayList<>();
        orderParams.getItemMap().forEach((k, v) -> {
            MenuVO menuVO = new MenuVO();
            menuVO.setId(k);
            menuVO.setRestNum(v[1]);
            menuVOList.add(menuVO);

            OrderDishRelVO orderDishRelVO = new OrderDishRelVO();
            orderDishRelVO.setItemId(k);
            orderDishRelVO.setCount(v[0]);
            orderDishRelVOList.add(orderDishRelVO);
        });

        // 创建订单
        OrderVO result = orderService.createOrder(order);

        // 存储当前订单的菜品信息
        for (OrderDishRelVO orderDishRelVO : orderDishRelVOList) {
            orderDishRelVO.setOrderNo(result.getOrderNo());
            orderDishRelVO.setDataStatus(1);
        }
        orderService.saveOrderDishes(orderDishRelVOList);

        Response response;
        if (result == null) {
            response = Responses.FAILED();
        } else {
            response = Responses.SUCCESS().setPayload(result);

            // 修改商家菜品余量
            menuService.conversionRestNum(menuVOList);
            // TODO 若使用优惠券元需要修改优惠券状态
        }

        return response;

    }

    @RequestMapping(method = RequestMethod.POST, params = "/{orderNo}")
    public Response refund(@PathVariable String orderNo,
                           @RequestBody String orderInfo) {

        return Responses.SUCCESS();
    }
    
    
    @RequestMapping(method = RequestMethod.GET, path = "/merchant/summary")
    public Response listByMerchantSummary( @RequestParam("sellerId") String sellerId) {
        Response response = null;
        OrderParams orderParams = new OrderParams();
        try {
            orderParams.setSellerId(sellerId);
            List<MerchantOrderHeaderVO> orders = orderService
                    .findOrdersByMerchant(orderParams);
            response = Responses.SUCCESS().setPayload(orders);
        } catch (Exception e) {
            response = Responses.FAILED();
            logger.error(e.getMessage());
        }

        return response;

    }
 

}
