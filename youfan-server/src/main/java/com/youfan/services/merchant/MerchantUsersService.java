package com.youfan.services.merchant;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.merchant.*;
import com.youfan.controllers.params.merchant.MerchantUserParams;
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
     * @return Map code -1账户被删除，0账户不存在，1登陆成功
     */
    public Map login(String userName);

    /**
     * 商家密码注册
     *
     * @param userName 用户名
     * @return 返回Map--包括一个registerStatus的key和MerchantUserVO的所有属性的key
     */
    public MerchantUserVO register(String userName);

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
    CollectionVO merchantKitchenInfoPageListByStatus(Integer page, Integer pageSize, Integer status);

    /**
     * 根据商家用户信息的status来查询所有信息并分页
     *
     * @param page     　第几页，大于等于1
     * @param pageSize 　每一页的大小
     * @param status   　状态：0为未审核，1为审核，-1为删除
     * @return total为数据总条数，pageData每一页的数据
     */
    CollectionVO merchantUserInfoPageListByStatus(Integer page, Integer pageSize, Integer status);

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

    /**
     * 通过店铺名称模糊查询
     *
     * @param merchantName
     * @return
     */
    List<MerchantKitchenInfoVO> conditionalSearch(String merchantName);

    /**
     * 根据商家用户ID 修改商家信息
     *
     * @param id
     * @param muParams
     * @return
     * @description TODO
     * @version 1.0
     * @author QinghaiDeng
     * @update 2015年9月10日 下午5:16:53
     */
    int updateById(String id, MerchantUserParams muParams);

    /**
     * @param muParams
     * @param pager
     * @return
     * @description 商家信息分页 多条件与查询
     * @version 1.0
     * @author QinghaiDeng
     * @update 2015年9月10日 下午4:12:02
     */
    List<MerchantUserVO> getPagerByParams(MerchantUserParams muParams, Pagination pager);

    /**
     * @param muParams
     * @return
     * @description 非删除数据中 查询条件下记录条数 参数中不设置时count所有
     * @version 1.0
     * @author QinghaiDeng
     * @update 2015年9月10日 下午4:20:39
     */
    long count(MerchantUserParams muParams);

    /**
     * 个人信息申请审核
     *
     * @param id     个人信息id
     * @param status 审核状态
     * @return
     */
    boolean approveMerchantUserInfo(String id, Integer status);

    /**
     * 商家端厨房申请审核
     *
     * @param id     商家信息id
     * @param status 审核状态
     * @return
     */
    boolean approveMerchantKitchenInfo(String id, Integer status);
}
