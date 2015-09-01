package com.youfan.services.client.impl;

import com.youfan.commons.vo.CouponsVO;
import com.youfan.data.dao.client.CouponDao;
import com.youfan.services.client.CouponService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by subdong on 15-8-31.
 */
@Service
public class CouponServiceImpl implements CouponService {

    @Resource
    private CouponDao couponDao;


    @Override
    public void insert(CouponsVO couponsVO) {
        couponDao.insert(couponsVO);
    }

    @Override
    public void delete(String s) {
        couponDao.delete(s);
    }

    @Override
    public void update(CouponsVO couponsVO) {
        couponDao.update(couponsVO);
    }

    @Override
    public List<CouponsVO> findUserId(Long userId) {
        List<CouponsVO> couponsVOs = couponDao.findUserId(userId);
        return couponsVOs;
    }

    @Override
    public boolean updateStatus(Long couponsid) {
        boolean b = couponDao.updateStatus(couponsid);
        return b;
    }
}
