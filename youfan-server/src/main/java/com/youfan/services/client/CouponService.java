package com.youfan.services.client;

import com.youfan.commons.vo.CouponsVO;

import java.util.List;

/**
 * Created by subdong on 15-8-31.
 */
public interface CouponService {


    void insert(CouponsVO couponsVO);

    void delete(String s);

    void update(CouponsVO couponsVO);

    /**
     * 通过用户id查询所有的优惠卷
     * @param userId
     * @return
     */
    List<CouponsVO> findUserId(Long userId);

    /**
     * 通过id更新优惠卷使用情况
     * @param couponsid
     * @return
     */
    boolean updateStatus(Long couponsid);
}
