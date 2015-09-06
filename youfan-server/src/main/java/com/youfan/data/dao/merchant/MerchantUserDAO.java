package com.youfan.data.dao.merchant;

import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.MerchantUserEntity;

import org.springframework.data.mongodb.core.query.Query;

import java.util.List;
import java.util.Map;

/**
 * Created by perfection on 15-8-19.
 */
public interface MerchantUserDAO extends MongoBaseDAO<MerchantUserEntity, MerchantUserVO, Long> {
    /**
     * 登陆
     *
     * @param userName 用户名手机号码
     * @return
     */
    MerchantUserVO login(String userName);

    /**
     * 注册
     *
     * @param userName
     * @param passWord
     * @return
     */
    Map<String, String> register(String userName, String passWord);

    /**
     * 保存商家用户个人信息
     *
     * @param merchantUser
     * @return
     */
    MerchantUserVO saveMerchantUserInfo(MerchantUserVO merchantUser);

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

}
