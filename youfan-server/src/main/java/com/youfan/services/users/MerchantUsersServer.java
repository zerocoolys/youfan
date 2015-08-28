package com.youfan.services.users;

import com.youfan.controllers.objs.*;
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
    /**
     * 商家端用户登陆
     *
     * @param userName 用户名-手机号
     * @return 返回对象MerchantUserVO
     * @throws UserException
     */
    public MerchantUserVO login(String userName) throws UserException;

    /**
     * 商家密码注册，暂时提供借口但并未使用
     *
     * @param userName 用户名
     * @param passWord 密码
     * @return 返回Map--包括一个registerStatus的key和MerchantUserVO的所有属性的key
     * @throws UserException
     */
    public Map register(String userName, String passWord) throws UserException;

    /**
     * 保存或更新商家用户的个人信息
     *
     * @param merchantUser 个人信息
     * @throws UserException
     */
    public void saveMerchantUserInfo(MerchantUserVO merchantUser) throws UserException;

    /**
     * 保存或更新商家厨房的信息，不包括厨房照片和厨房故事的保存
     *
     * @param merchantKitchenInfo 商家厨房基础信息
     * @return MerchantKitchenInfoVO
     * @throws KitchenInfoException
     */
    public MerchantKitchenInfoVO saveMerchantKitchenInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    /**
     * 仅仅保存或更新厨房照片信息
     *
     * @param merchantKitchenInfo 厨房照片信息
     * @return MerchantKitchenInfoVO
     * @throws KitchenInfoException
     */
    public MerchantKitchenInfoVO saveMerchantKitchenPicInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    /**
     * 仅仅保存或更新厨房故事信息
     *
     * @param merchantKitchenInfo 厨房故事信息
     * @return MerchantKitchenInfoVO
     * @throws KitchenInfoException
     */
    public MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(MerchantKitchenInfoVO merchantKitchenInfo) throws KitchenInfoException;

    /**
     * 查询所有的商家厨房信息并分页
     *
     * @param page     第几页，值必须大于等于1
     * @param pageSize 一页的数据条数
     * @return 返回List的MerchantKitchenInfoVO对象数据
     * @throws KitchenInfoException
     */
    public List<MerchantKitchenInfoVO> pageList(Integer page, Integer pageSize) throws KitchenInfoException;

    public List<MerchantUserEntity> getMerchantByStatus(Integer status) throws UserException;

    public void checkMerchant(String parameter, Integer status);

    ;

    public long count(Query query);

    public List<MerchantUserEntity> find(Query query);

    MerchantKitchenInfoVO findById(String id);

    /**
     * 查询所有商家厨房信息
     *
     * @return 返回List的MerchantKitchenInfoVO对象数据
     */
    public List<MerchantKitchenInfoVO> getAllMerchantKitchenInfo();

    /**
     * 获取商家厨房信息，不包括厨房照片和厨房故事
     *
     * @param id 商家用户id或厨房信息id
     * @return MerchantKitchenBaseInfo对象
     * @throws KitchenInfoException
     */
    public MerchantKitchenBaseInfo getMerchantKitchenBaseInfo(Long id) throws KitchenInfoException;

    /**
     * 获取厨房照片信息
     *
     * @param id 商家用户id或厨房信息id
     * @return MerchantKitchenPicInfo对象
     * @throws KitchenInfoException
     */
    public MerchantKitchenPicInfo getMerchantKitchenPicInfo(Long id) throws KitchenInfoException;

    /**
     * 获取厨房故事信息
     *
     * @param id 商家用户id或厨房信息id
     * @return MerchantKitchenStoryInfo对象
     * @throws KitchenInfoException
     */
    public MerchantKitchenStoryInfo getMerchantKitchenStoryInfo(Long id) throws KitchenInfoException;

    /**
     * 获取商家厨房所有信息
     *
     * @param id 商家用户id或厨房信息id
     * @return MerchantKitchenInfoVO对象
     * @throws KitchenInfoException
     */
    public MerchantKitchenInfoVO getMerchantKitchenInfo(Long id) throws KitchenInfoException;

    MerchantKitchenInfoVO mrFindById(String id);

    MerchantUserVO muFindById(String id);
}
