package com.youfan.services.users;

import com.youfan.controllers.objs.MerchantKitchenInfo;
import com.youfan.controllers.objs.MerchantUser;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.exceptions.UserException;
import org.springframework.stereotype.Component;

/**
 * Created by perfection on 15-8-24.
 */
public interface MerchantUsersServer {
    public MerchantUser login(String userName, String passWord) throws UserException;

    public MerchantUser register(String userName, String passWord) throws UserException;

    public void saveMerchantUserInfo(MerchantUser merchantUser) throws UserException;

    MerchantKitchenInfo saveMerchantKitchenInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfo saveMerchantKitchenPicInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfo saveMerchantKitchenStoryInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException;
}
