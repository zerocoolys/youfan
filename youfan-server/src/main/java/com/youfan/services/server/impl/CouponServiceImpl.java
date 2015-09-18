package com.youfan.services.server.impl;

import com.youfan.commons.vo.client.CouponOrCouponTypeVo;
import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.commons.vo.server.CouponTypeVO;
import com.youfan.controllers.params.server.CouponParams;
import com.youfan.data.dao.server.CouponTypeDAO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.services.merchant.MerchantKitchenService;
import com.youfan.utils.ObjectUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youfan.commons.vo.server.CouponVO;
import com.youfan.data.dao.server.CouponDAO;
import com.youfan.data.models.CouponEntity;
import com.youfan.services.impl.MongoServiceImpl;
import com.youfan.services.server.CouponService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service("couponService")
public class CouponServiceImpl extends MongoServiceImpl<CouponEntity, CouponVO> implements CouponService {

    @Resource
    private CouponDAO couponDAO;
    @Resource
    private MerchantKitchenService merchantKitchenService;

    @Autowired
    public CouponServiceImpl(CouponDAO couponDAO) {
        super(couponDAO);
    }

    @Override
    public List<CouponOrCouponTypeVo> getMyCouponByuserId(String userid) {
        CouponParams cp = new CouponParams();
        cp.setUserId(userid);
        cp.setStatus(0);
        List<CouponVO> collect = couponDAO.findPagerByParams(cp, null);

        return collect.stream().map(e -> {
            CouponOrCouponTypeVo typeVo = new CouponOrCouponTypeVo();
            typeVo.setId(e.getId());
            typeVo.setUserId(e.getUserId());
            typeVo.setIfAll(e.getIfAll() ? "通用卷" : "指定卷");
            typeVo.setKitchenId(e.getKitchenId() != null ? e.getKitchenId() : "");
            if (Objects.isNull(e.getKitchenId())) {
                MerchantKitchenInfoVO infoVO = merchantKitchenService.findById(e.getKitchenId());
                typeVo.setKitchenName(infoVO.getKitchenName());
            } else {
                typeVo.setKitchenName("");
            }
            typeVo.setValidityTime(e.getValidityTime());
            typeVo.setCreateTime(e.getCreateTime());
            typeVo.setActiveId(e.getActiveId());
            if (e.getType().equals("-")) {
                typeVo.setType("￥");
            } else if (e.getType().equals("-") && e.getDetails().size() > 1) {
                typeVo.setType("^");
            } else if (e.getType().equals("*")) {
                typeVo.setType("折");
            } else if (e.getType().equals("*") && e.getDetails().size() > 1) {
                typeVo.setType("^");
            }

            typeVo.setDetails(e.getDetails());
            return typeVo;
        }).collect(Collectors.toList());


    }
}
