package com.youfan.services.users;

import com.youfan.controllers.objs.MerchantKitchenInfoVO;
import com.youfan.controllers.objs.MerchantUserVO;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.exceptions.UserException;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;
import java.util.Map;

/**
 * Created by perfection on 15-8-24.
 */
public interface MerchantUsersServer {
    public MerchantUserVO login(String userName) throws UserException;

    public Map register(String userName, String passWord) throws UserException;

    public void saveMerchantUserInfo(MerchantUserVO merchantUser) throws UserException;

    MerchantKitchenInfoVO saveMerchantKitchenInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfoVO saveMerchantKitchenPicInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    List<MerchantKitchenInfoVO> pageList(Integer page, Integer pageSize) throws KitchenInfoException;

    public List<MerchantUserEntity> getMerchantByStatus(Integer status) throws UserException;

    public void checkMerchant(String parameter, Integer status);

    ;

    List<MerchantKitchenInfoVO> getAllMerchantKitchenInfo();

    public long count(Query query);

    public List<MerchantUserEntity> find(Query query);

    MerchantKitchenInfoVO mrFindById(String id);

    MerchantUserVO muFindById(String id);
}
