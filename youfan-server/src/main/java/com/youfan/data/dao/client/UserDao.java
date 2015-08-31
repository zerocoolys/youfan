package com.youfan.data.dao.client;

import com.youfan.commons.vo.UserClientVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.UserClientEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

/**
 * Created by icepros on 15-8-25.
 */
public interface UserDao extends MongoBaseDAO<UserClientEntity, UserClientVO, Long> {

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


    default Query buildQuery(String tel, String loginPwd) {
        Criteria criteria = Criteria.where("tel").is(tel);

        if (tel != null) {
            criteria.and("loginPwd").is(loginPwd);
        }

        return Query.query(criteria);
    }
}
