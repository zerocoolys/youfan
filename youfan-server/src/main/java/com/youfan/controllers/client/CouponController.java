package com.youfan.controllers.client;

import com.youfan.commons.vo.CouponsVO;
import com.youfan.commons.vo.client.UserVO;
import com.youfan.services.client.CouponService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by subdong on 15-8-31.
 */
@RestController
@RequestMapping(value = "coupon")
public class CouponController {
    @Resource
    private CouponService couponService;

    @RequestMapping(path = "/addCoupon", method = RequestMethod.GET, produces = "application/json")
    public void addCoupon(HttpServletResponse response, HttpServletRequest request,
                          @RequestParam(value = "userid") String userId,
                          @RequestParam(value = "couponType") String couponType) {

    }

}
