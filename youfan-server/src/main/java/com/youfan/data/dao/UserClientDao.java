package com.youfan.data.dao;

import com.youfan.controllers.objs.UserClientVO;
import com.youfan.data.models.UserClientEntity;

/**
 * Created by icepros on 15-8-25.
 */
public interface UserClientDao extends MongoBaseDAO<UserClientEntity, UserClientVO, Long> {

    String SEQ_LOGIN = "LOGIN";


    //通过电话号码和密码获取用户信息
    UserClientVO getUserByTelAndPwd(String tel, String pwd);
    //更新密码
    UserClientVO updateUserPwd(String pwd);


    @Override
    default Class<UserClientEntity> getEntityClass() {
        return UserClientEntity.class;
    }

    @Override
    default Class<UserClientVO> getVOClass() {
        return UserClientVO.class;
    }


}
