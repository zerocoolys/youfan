package com.youfan.services.server;

import com.youfan.commons.vo.client.CouponOrCouponTypeVo;
import com.youfan.commons.vo.server.CouponVO;
import com.youfan.data.models.CouponEntity;
import com.youfan.services.MongoService;

import java.util.List;

public interface CouponService extends MongoService<CouponEntity, CouponVO>{

    List<CouponOrCouponTypeVo> getMyCouponByuserId(String userid);

}
