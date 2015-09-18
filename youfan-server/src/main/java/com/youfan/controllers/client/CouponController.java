package com.youfan.controllers.client;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.youfan.commons.vo.ConditionVO;
import com.youfan.commons.vo.client.CouponOrCouponTypeVo;
import com.youfan.commons.vo.server.CouponVO;
import com.youfan.controllers.params.server.CouponParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.server.CouponService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by subdong on 15-8-31.
 */
@RestController
@RequestMapping(value = "coupon")
public class CouponController {

    @Resource
    private CouponService couponService;


    @RequestMapping(path = "/getCouponInfo/{userid}", method = RequestMethod.GET, produces = "application/json")
    public Response addCoupon(@PathVariable String userid) {


        List<CouponOrCouponTypeVo> couponVOs = couponService.getMyCouponByuserId(userid);

        if (couponVOs.size() > 0) {
            return Responses.SUCCESS().setPayload(couponVOs).setCode(1);
        } else {
            return Responses.FAILED().setPayload(couponVOs).setCode(0).setMsg("sorry,No query to the data!");
        }
    }

}
