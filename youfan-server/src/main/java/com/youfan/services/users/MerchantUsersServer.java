package com.youfan.services.users;

import java.util.List;
import java.util.Map;

import com.youfan.controllers.objs.MerchantKitchenInfo;
import com.youfan.controllers.objs.MerchantUser;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.exceptions.UserException;

/**
 * Created by perfection on 15-8-24.
 */
public interface MerchantUsersServer {
    public MerchantUser login(String userName, String passWord) throws UserException;

    public Map register(String userName, String passWord) throws UserException;

    public void saveMerchantUserInfo(MerchantUser merchantUser) throws UserException;

    MerchantKitchenInfo saveMerchantKitchenInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfo saveMerchantKitchenPicInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfo saveMerchantKitchenStoryInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException;

	public List<MerchantUserEntity> getMerchantByStatus(Integer status)throws UserException;

	public void checkMerchant(String parameter, Integer status);;
}
