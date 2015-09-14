package com.youfan.data.dao.merchant;

import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.commons.Pagination;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.exceptions.KitchenInfoException;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;
import java.util.Map;

/**
 * Created by perfection on 15-8-25.
 */
public interface MerchantKitchenDAO extends MongoBaseDAO<MerchantKitchenInfoEntity, MerchantKitchenInfoVO, Long> {
    /**
     * 保存商家厨房信息
     *
     * @return
     * @throws KitchenInfoException
     */
    MerchantKitchenInfoVO saveMerchantKitchenInfo(Query query, Update update);

    /**
     * 保存厨房照片
     *
     * @param query  查询条件
     * @param update 　更新语句
     * @return
     */
    MerchantKitchenInfoVO saveMerchantKitchenPicInfo(Query query, Update update);

    /**
     * 保存厨房故事
     *
     * @param query  查询条件
     * @param update 　更新语句
     * @return
     */
    MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(Query query, Update update);

    /**
     * 根据商家用户id获取对应的厨房信息
     *
     * @param id 商家用户id
     * @return
     */
    MerchantKitchenInfoVO getMerchantKitchenBaseInfo(String id);

    /**
     * 获取所有商家厨房信息并分页
     *
     * @param page     第几页
     * @param pageSize 一页数据条数
     * @return
     * @throws KitchenInfoException
     */
    List<MerchantKitchenInfoVO> pageList(Integer page, Integer pageSize);

    /**
     * 根据厨房信息的status来查询所有信息并分页
     *
     * @param page     　第几页，大于等于1
     * @param pageSize 　每一页的大小
     * @param query    　查询条件
     * @return
     */
    List<MerchantKitchenInfoVO> pageListByStatus(Integer page, Integer pageSize, Query query);

    /**
     * 根据数据状态获取该collection的数据条数
     *
     * @param status 状态：0为未审核，1为审核，-1为删除
     * @return
     */
    Long getPageTotal(Integer status);

    /**
     * 保存商家用户的兴趣爱好
     *
     * @param query  查询条件
     * @param update 　更新语句
     * @return
     */
    MerchantKitchenInfoVO saveMyHobby(Query query, Update update);

    long count(Query query);

    List<MerchantKitchenInfoEntity> find(Query query);

    MerchantKitchenInfoVO findById(String id);

    /**
     * 通过店铺名称模糊查询
     *
     * @param merchantName
     * @return
     */
    List<MerchantKitchenInfoVO> conditionalSearch(String merchantName);

    /**
     * 更具用户的当前位置查询商家3公里以内的所有店铺
     *
     * @return
     */
    CollectionVO<MerchantKitchenInfoVO> getGeographicalSearch(Pagination pagination);

    @Override
    default Class<MerchantKitchenInfoEntity> getEntityClass() {
        return MerchantKitchenInfoEntity.class;
    }

    @Override
    default Class<MerchantKitchenInfoVO> getVOClass() {
        return MerchantKitchenInfoVO.class;
    }

    /**
     * 商家端厨房和个人信息申请审核
     *
     * @return
     */
    boolean approveAllInfo(Query query, Update update);
}
