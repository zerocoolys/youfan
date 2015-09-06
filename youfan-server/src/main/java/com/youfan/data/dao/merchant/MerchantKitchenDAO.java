package com.youfan.data.dao.merchant;

import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.commons.Pagination;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.exceptions.KitchenInfoException;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;
import java.util.Map;

/**
 * Created by perfection on 15-8-25.
 */
public interface MerchantKitchenDAO extends MongoBaseDAO<MerchantKitchenInfoEntity, MerchantKitchenInfoVO, Long> {
    /**
     * 保存商家厨房信息
     * @param merchantKitchenInfo　厨房信息对象VO
     * @return
     * @throws KitchenInfoException
     */
    MerchantKitchenInfoVO saveMerchantKitchenInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfoVO saveMerchantKitchenPicInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    /**
     * 根据商家用户id获取对应的厨房信息
     * @param id 商家用户id
     * @return
     */
    MerchantKitchenInfoVO getMerchantKitchenBaseInfo(String id);

    /**
     * 获取所有商家厨房信息并分页
     * @param page 第几页
     * @param pageSize 一页数据条数
     * @return
     * @throws KitchenInfoException
     */
    List<MerchantKitchenInfoVO> pageList(Integer page, Integer pageSize) throws KitchenInfoException;

    /**
     * 保存商家用户的兴趣爱好
     * @param merchantKitchenInfoVO 含有兴趣爱好信息
     * @return
     */
    MerchantKitchenInfoVO saveMyHobby(MerchantKitchenInfoVO merchantKitchenInfoVO);

    long count(Query query);

    List<MerchantKitchenInfoEntity> find(Query query);

    MerchantKitchenInfoVO findById(String id);

    /**
     * 通过店铺名称模糊查询
     * @param merchantName
     * @return
     */
    List<MerchantKitchenInfoVO> conditionalSearch(String merchantName);



    @Override
    default Class<MerchantKitchenInfoEntity> getEntityClass() {
        return MerchantKitchenInfoEntity.class;
    }

    @Override
    default Class<MerchantKitchenInfoVO> getVOClass() {
        return MerchantKitchenInfoVO.class;
    }
}
