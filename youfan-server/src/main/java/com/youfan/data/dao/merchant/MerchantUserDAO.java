package com.youfan.data.dao.merchant;

import com.youfan.commons.vo.MerchantUserVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.MerchantUserEntity;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;
import java.util.Map;

/**
 * Created by perfection on 15-8-19.
 */
public interface MerchantUserDAO extends MongoBaseDAO<MerchantUserEntity, MerchantUserVO, Long> {
    MerchantUserVO login(String userName);

    Map<String, String> register(String userName, String passWord);

    MerchantUserVO saveMerchantUserInfo(MerchantUserVO merchantUser);

    List<MerchantUserEntity> getMerchantByStatus(Integer status);

    void updateStatus(String id, Integer status);

    List<MerchantUserEntity> find(Query query);

    long count(Query query);

    MerchantUserVO findById(String id);


    @Override
    default Class<MerchantUserEntity> getEntityClass() {
        return MerchantUserEntity.class;
    }

    @Override
    default Class<MerchantUserVO> getVOClass() {
        return MerchantUserVO.class;
    }
}
