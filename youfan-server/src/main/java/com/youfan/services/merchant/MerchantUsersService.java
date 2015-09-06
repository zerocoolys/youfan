package com.youfan.services.merchant;

import com.youfan.commons.vo.merchant.*;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.exceptions.UserException;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;
import java.util.Map;

/**
 * Created by perfection on 15-8-24.
 */
public interface MerchantUsersService {
    /**
     * 商家端用户登陆
     *
     * @param userName 用户名-手机号
     * @return 返回对象MerchantUserVO
     */
    public MerchantUserVO login(String userName);

    /**
     * 商家密码注册，暂时提供借口但并未使用
     *
     * @param userName 用户名
     * @param passWord 密码
     * @return 返回Map--包括一个registerStatus的key和MerchantUserVO的所有属性的key
     */
    public Map register(String userName, String passWord);

    /**
     * 保存或更新商家用户的个人信息
     *
     * @param merchantUser 个人信息
     */
    public void saveMerchantUserInfo(MerchantUserVO merchantUser);

    /**
     * 保存或更新商家厨房的信息，不包括厨房照片和厨房故事的保存
     *
     * @param merchantKitchenInfo 商家厨房基础信息
     * @return MerchantKitchenInfoVO
     */
    public MerchantKitchenInfoVO saveMerchantKitchenInfo(MerchantKitchenInfoVO merchantKitchenInfo);

    /**
     * 仅仅保存或更新厨房照片信息
     *
     * @param merchantKitchenInfo 厨房照片信息
     * @return MerchantKitchenInfoVO
     */
    public MerchantKitchenInfoVO saveMerchantKitchenPicInfo(MerchantKitchenInfoVO merchantKitchenInfo);

    /**
     * 仅仅保存或更新厨房故事信息
     *
     * @param merchantKitchenInfo 厨房故事信息
     * @return MerchantKitchenInfoVO
     */
    public MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(MerchantKitchenInfoVO merchantKitchenInfo);

    /**
     * 查询所有的商家厨房信息并分页
     *
     * @param page     第几页，值必须大于等于1
     * @param pageSize 一页的数据条数
     * @return 返回List的MerchantKitchenInfoVO对象数据
     */
    public List<MerchantKitchenInfoVO> pageList(Integer page, Integer pageSize);

    /**
     * 根据厨房信息的status来查询所有信息并分页
     *
     * @param page     　第几页，大于等于1
     * @param pageSize 　每一页的大小
     * @param status   　状态：0为未审核，1为审核，-1为删除
     * @return total为数据总条数，pageData每一页的数据
     */
    Map MerchantKitchenInfoPageListByStatus(Integer page, Integer pageSize, Integer status);

    /**
     * 根据商家用户信息的status来查询所有信息并分页
     *
     * @param page     　第几页，大于等于1
     * @param pageSize 　每一页的大小
     * @param status   　状态：0为未审核，1为审核，-1为删除
     * @return total为数据总条数，pageData每一页的数据
     */
    Map MerchantUserInfoPageListByStatus(Integer page, Integer pageSize, Integer status);

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
     * @return MerchantKitchenInfoVO对象
     */
    public MerchantKitchenInfoVO getMerchantKitchenBaseInfo(String id);

    /**
     * 获取厨房照片信息
     *
     * @param id 商家用户id或厨房信息id
     * @return MerchantKitchenInfoVO对象
     */
    public MerchantKitchenInfoVO getMerchantKitchenPicInfo(Long id);

    /**
     * 获取厨房故事信息
     *
     * @param id 商家用户id或厨房信息id
     * @return MerchantKitchenInfoVO对象
     */
    public MerchantKitchenInfoVO getMerchantKitchenStoryInfo(Long id);

    /**
     * 获取商家厨房所有信息
     *
     * @param id 商家用户id或厨房信息id
     * @return MerchantUserVO对象
     */
    public MerchantUserVO getMerchantUserInfo(String id);

    MerchantKitchenInfoVO mrFindById(String id);

    MerchantUserVO muFindById(String id);

    /**
     * 保存商家用户的个人兴趣爱好
     *
     * @param merchantKitchenInfoVO 商家用户个人兴趣爱好VO
     * @return
     */
    public MerchantKitchenInfoVO saveMyHobby(MerchantKitchenInfoVO merchantKitchenInfoVO);
}
