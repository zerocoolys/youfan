package com.youfan.data.dao.client;

import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.commons.vo.client.MealsAddressVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.ClientUserEntity;
import com.youfan.data.models.MealsAddressEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

/**
 * Created by icepros on 15-8-25.
 */
public interface UserDao extends MongoBaseDAO<ClientUserEntity, ClientUserVO, String> {

    /**
     * 通过电话号码和密码获取用户信息
     *
     * @param tel
     * @param pwd
     * @return
     */
    ClientUserVO getUserByTelAndPwd(String tel, String pwd);

    /**
     * 通过电话获取用户
     *
     * @param tel
     * @return
     */
    ClientUserVO getUserByTel(String tel);

    //根据用于ID查询用户
    ClientUserVO findByid(String id);

    /**
     * 更新用户
     *
     * @param
     * @param
     * @return
     */
    void update(String id, ClientUserVO clientUserVO);

    void updateMealsAddress(String id, ClientUserVO clientUserVO);

    void updateUserPwd(String id, String pwd);

    void insertMealsAddress(MealsAddressVO mealsAddressVO);

    @Override
    default Class<ClientUserEntity> getEntityClass() {
        return ClientUserEntity.class;
    }

    @Override
    default Class<ClientUserVO> getVOClass() {
        return ClientUserVO.class;
    }

    /**
     * 用户手机号和密码查询
     *
     * @param tel
     * @param password
     * @return
     */
    default Query buildQuery(String tel, String password) {
        Criteria criteria = Criteria.where("tel").is(tel);

        if (tel != null) {
            criteria.and("password").is(password);
        }

        return Query.query(criteria);
    }

    /**
     * 用户手机号查询
     *
     * @param tel
     * @return
     */
    default Query buildQueryByTel(String tel) {
        Criteria criteria = Criteria.where("tel").is(tel);
        return Query.query(criteria);
    }

    /**
     * 用户id查询
     *
     * @param id
     * @return
     */
    default Query buildQueryById(String id) {
        Criteria criteria = Criteria.where("id").is(id);
        return Query.query(criteria);
    }

}
