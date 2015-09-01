package com.youfan.data.dao.client;

import com.youfan.commons.vo.CouponsVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.CouponsEntity;

import java.util.List;

/**
 * Created by subdong on 15-8-31.
 */
public interface CouponDao extends MongoBaseDAO<CouponsEntity, CouponsVO, String> {

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
