package com.youfan.data.dao.merchant;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.controllers.params.merchant.MerchantUserParams;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.MerchantUserEntity;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;
import java.util.Map;

/**
 * Created by perfection on 15-8-19.
 */
public interface MerchantUserDAO extends MongoBaseDAO<MerchantUserEntity, MerchantUserVO, Long> {

    /**
     * 登陆
     *
     * @param query query查询语句
     * @return
     */
    MerchantUserVO login(Query query);

    /**
     * 保存注册信息
     *
     * @param merchantUserVO 用户信息
     * @return
     */
    void saveRegisterInfo(MerchantUserVO merchantUserVO);

    MerchantUserVO findOne(String userName);

    List<MerchantUserEntity> getMerchantByStatus(Integer status);

    void updateStatus(String id, Integer status);

    List<MerchantUserEntity> find(Query query);

    long count(Query query);

    MerchantUserVO findById(Long id);


    @Override
    default Class<MerchantUserEntity> getEntityClass() {
        return MerchantUserEntity.class;
    }

    @Override
    default Class<MerchantUserVO> getVOClass() {
        return MerchantUserVO.class;
    }

    /**
     * 根据id获取商家用户信息
     *
     * @param id
     * @return
     */
    MerchantUserVO getMerchantUserInfo(String id);

    /**
     * 根据商家用户信息的status来查询所有信息并分页
     *
     * @param page     　第几页，大于等于1
     * @param pageSize 　每一页的大小
     * @param query    　查询条件
     * @return
     */
    List<MerchantUserVO> pageListByStatus(Integer page, Integer pageSize, Query query);

    /**
     * 根据数据状态获取该collection的数据条数
     *
     * @param status 状态：0为未审核，1为审核，-1为删除
     * @return
     */
    Long getPageTotal(Integer status);

    MerchantUserVO findById(String id);

    List<MerchantUserVO> findPagerByParams(MerchantUserParams muParams, Pagination pager);

    long count(MerchantUserParams muParams);

    int updateById(String id, MerchantUserParams muParams);

    MerchantUserVO findAndModify(Query query, Update update);

    /**
     * 商家端厨房和个人信息申请审核
     *
     * @return
     */
    boolean approveAllInfo(Query query, Update update);

}
