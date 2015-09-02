package com.youfan.controllers.client;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by subdong on 15-8-31.
 */
@RestController
@RequestMapping(value = "coupon")
public class CouponController {

    @RequestMapping(path = "/addCoupon", method = RequestMethod.GET, produces = "application/json")
    public void addCoupon(HttpServletResponse response, HttpServletRequest request,
                          @RequestParam(value = "userid") String userId,
                          @RequestParam(value = "couponType") String couponType) {

    }

}
