package com.youfan.services.merchant.impl;

import com.youfan.commons.Constants;
import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.merchant.*;
import com.youfan.controllers.params.merchant.MerchantUserParams;
import com.youfan.data.dao.merchant.MerchantKitchenDAO;
import com.youfan.data.dao.merchant.MerchantUserDAO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.exceptions.UserException;
import com.youfan.services.merchant.MerchantUsersService;
import org.omg.CORBA.CODESET_INCOMPATIBLE;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static com.youfan.commons.Constants.COLLECTION_HEADPORTRAITPICURL;
import static com.youfan.commons.Constants.COLLECTION_HEALTHCERTIFICATEPICURL;
import static com.youfan.commons.Constants.COLLECTION_IDCARDPICURL;

/**
 * Created by perfection on 15-8-19.
 */
@Service("merchantUsersServer")
public class MerchantUsersServiceImpl implements MerchantUsersService {


    @Resource
    private MerchantUserDAO merchantUserDao;

    @Resource
    private MerchantKitchenDAO merchantKitchenDAO;

    @Override
    public Map login(String userName) {
        Map map = new HashMap<>();
        MerchantUserVO merchantUserVO = merchantUserDao.login(query(where("userName").is(userName)));
        //判断用户存不存在
        if (merchantUserVO == null) {
            map.put("code", "0");
            return map;
        } else {
            //判断用户是否被删除
            if (merchantUserVO.getDataStatus() == -1) {
                map.put("code", "-1");
                return map;
            } else {
                map.put("code", "1");
                map.put("merchantUserVO", merchantUserVO);
                return map;
            }
        }
    }

    @Override
    public List<MerchantKitchenInfoVO> getAllMerchantKitchenInfo() {
        return Collections.emptyList();
    }

    @Override
    public MerchantKitchenInfoVO mrFindById(String id) {
        return merchantKitchenDAO.findById(id);
    }

    @Override
    public MerchantUserVO muFindById(String id) {
        return merchantUserDao.findById(id);
    }

    @Override
    public void saveMerchantUserInfo(MerchantUserVO merchantUser) {
        Update update = new Update();
        update.set("status", merchantUser.getStatus());
        update.set("dataStatus", merchantUser.getDataStatus());
        update.set("id", merchantUser.getId());
        update.set("address", merchantUser.getAddress());
        update.set("ageRange", merchantUser.getAgeRange());
        update.set(COLLECTION_HEADPORTRAITPICURL, merchantUser.getHeadPortraitPicUrl());
        update.set(COLLECTION_HEALTHCERTIFICATEPICURL, merchantUser.getHealthCertificatePicUrl());
        update.set(COLLECTION_IDCARDPICURL, merchantUser.getIdCardPicUrl());
        update.set("realName", merchantUser.getRealName());
        update.set("sex", merchantUser.getSex());
        MerchantUserVO merchantUserVO = merchantUserDao.findAndModify(query(where("id").is(merchantUser.getId()).andOperator(where("dataStatus").nin("-1"))), update);
        if (merchantUserVO == null) {
            merchantUserDao.insert(merchantUser);
        }
    }

    public MerchantUserVO register(String userName) {
        MerchantUserVO merchantUserVO = new MerchantUserVO();
        merchantUserVO.setUserName(userName);
        merchantUserDao.saveRegisterInfo(merchantUserVO);
        MerchantUserVO merchantUserVORes = merchantUserDao.findOne(userName);
        if (merchantUserVORes == null) {
            return null;
        } else {
            return merchantUserVORes;
        }
    }

    @Override
    public MerchantKitchenInfoVO getMerchantKitchenBaseInfo(String id) {
        return merchantKitchenDAO.getMerchantKitchenBaseInfo(id);
    }

    @Override
    public MerchantKitchenInfoVO getMerchantKitchenPicInfo(Long id) {
        return null;
    }

    @Override
    public MerchantKitchenInfoVO getMerchantKitchenStoryInfo(Long id) {
        return null;
    }

    @Override
    public MerchantUserVO getMerchantUserInfo(String id) {
        return merchantUserDao.getMerchantUserInfo(id);
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenInfo(MerchantKitchenInfoVO merchantKitchenInfo) {
        Update update = new Update();

        update.set("cuisine", merchantKitchenInfo.getCuisine());
        update.set("desc", merchantKitchenInfo.getDesc());
        update.set("disPrice", merchantKitchenInfo.getDisPrice());
        update.set("disRange", merchantKitchenInfo.getDisRange());
        update.set("deliveryExplain", merchantKitchenInfo.getDeliveryExplain());
        update.set("endTime", merchantKitchenInfo.getEndTime());
        update.set("kitchenAddress", merchantKitchenInfo.getKitchenAddress());
        update.set("kitchenName", merchantKitchenInfo.getKitchenName());
        update.set("phoneNumber", merchantKitchenInfo.getPhoneNumber());
        update.set("startTime", merchantKitchenInfo.getStartTime());
        update.set("galleryFul", merchantKitchenInfo.getGalleryFul());
        update.set("isCanteen", merchantKitchenInfo.isCanteen());
        update.set("isDelivery", merchantKitchenInfo.isDelivery());
        update.set("isTakeSelf", merchantKitchenInfo.isTakeSelf());
        update.set("location", merchantKitchenInfo.getLocation());
        update.set("status", merchantKitchenInfo.getStatus());
        update.set("dataStatus", merchantKitchenInfo.getDataStatus());

        List<MerchantKitchenInfoEntity> merchantKitchenInfoEntityList = merchantKitchenDAO.find(query(where("id").
                is(merchantKitchenInfo.getId())));
        if (merchantKitchenInfoEntityList.size() == 0) {
            merchantKitchenDAO.insert(merchantKitchenInfo);
            MerchantKitchenInfoVO merchantKitchenInfoVO = merchantKitchenDAO.findById(merchantKitchenInfo.getId());
            if (merchantKitchenInfoVO == null) {
                return null;
            } else {
                return merchantKitchenInfoVO;
            }
        } else {
            MerchantKitchenInfoVO merchantKitchenInfoVO = merchantKitchenDAO.convertToVO(merchantKitchenInfoEntityList.
                    get(0));
            if (merchantKitchenInfoVO.getDataStatus() == -1) {
                return null;
            } else {
                MerchantKitchenInfoVO merchantKitchenInfoRes = merchantKitchenDAO.
                        saveMerchantKitchenInfo(query(where("id").
                                is(merchantKitchenInfo.getId()).andOperator(where("dataStatus").nin("-1"))), update);
                if (merchantKitchenInfoRes == null) {
                    return null;
                } else {
                    return merchantKitchenInfoRes;
                }
            }
        }

    }

    @Override
    public List<MerchantKitchenInfoVO> pageList(Integer page, Integer pageSize) {
        return merchantKitchenDAO.pageList(page, pageSize);
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenPicInfo(MerchantKitchenInfoVO merchantKitchenInfo) {
        Update update = new Update();

        update.set("kitchenPicUrl", merchantKitchenInfo.getKitchenPicUrl());
        update.set("status", merchantKitchenInfo.getStatus());
        update.set("dataStatus", merchantKitchenInfo.getDataStatus());
        MerchantKitchenInfoVO merchantKitchenInfoVO = merchantKitchenDAO.saveMerchantKitchenPicInfo(query(where("id").
                is(merchantKitchenInfo.getId()).andOperator(where("dataStatus").nin("-1"))), update);
        if (merchantKitchenInfoVO == null) {
            merchantKitchenDAO.insert(merchantKitchenInfo);
            List<MerchantKitchenInfoEntity> merchantKitchenInfoEntityList = merchantKitchenDAO.find(query(where("id").
                    is(merchantKitchenInfo.getId()).andOperator(where("dataStatus").nin("-1"))));
            if (merchantKitchenInfoEntityList.size() == 0) {
                return null;
            } else {
                return merchantKitchenDAO.convertToVO(merchantKitchenInfoEntityList.get(0));
            }
        } else {
            return merchantKitchenInfoVO;
        }
    }

    @Override
    public MerchantKitchenInfoVO saveMerchantKitchenStoryInfo(MerchantKitchenInfoVO merchantKitchenInfo) {

        Update update = new Update();

        update.set("kitchenStoryName", merchantKitchenInfo.getKitchenStoryName());
        update.set("kitchenStoryContent", merchantKitchenInfo.getKitchenStoryContent());
        update.set("status", merchantKitchenInfo.getStatus());
        update.set("dataStatus", merchantKitchenInfo.getDataStatus());
        MerchantKitchenInfoVO merchantKitchenInfoVO = merchantKitchenDAO.
                saveMerchantKitchenStoryInfo(query(where("id").is(merchantKitchenInfo.getId()).
                        andOperator(where("dataStatus").nin("-1"))), update);
        if (merchantKitchenInfoVO == null) {
            merchantKitchenDAO.insert(merchantKitchenInfo);
            return merchantKitchenDAO.convertToVO(merchantKitchenDAO.find(query(where("id").
                    is(merchantKitchenInfo.getId()).andOperator(where("dataStatus").nin("-1")))).get(0));
        } else {
            return merchantKitchenInfoVO;
        }
    }

    @Override
    public List<MerchantUserEntity> getMerchantByStatus(Integer status) throws UserException {
        return merchantUserDao.getMerchantByStatus(status);

    }

    @Override
    public void checkMerchant(String id, Integer status) {
        merchantUserDao.updateStatus(id, status);
    }

    @Override
    public long count(Query query) {
        return merchantUserDao.count(query);
    }

    @Override
    public MerchantKitchenInfoVO findById(String id) {
        return null;
    }

    @Override
    public List<MerchantUserEntity> find(Query query) {
        return merchantUserDao.find(query);
    }

    @Override
    public MerchantKitchenInfoVO saveMyHobby(MerchantKitchenInfoVO merchantKitchenInfoVO) {
        Update update = new Update();
        update.set("hobby", merchantKitchenInfoVO.getHobby());
        update.set("status", merchantKitchenInfoVO.getStatus());
        update.set("dataStatus", merchantKitchenInfoVO.getDataStatus());
        MerchantKitchenInfoVO merchantKitchenInfo = merchantKitchenDAO.
                saveMyHobby(query(where("id").is(merchantKitchenInfoVO.getId()).
                        andOperator(where("dataStatus").nin("-1"))), update);
        if (merchantKitchenInfo == null) {
            merchantKitchenDAO.insert(merchantKitchenInfoVO);
            return merchantKitchenDAO.convertToVO(merchantKitchenDAO.find(query(where("id").
                    is(merchantKitchenInfoVO.getId()).andOperator(where("dataStatus").nin("-1")))).get(0));
        } else {
            return merchantKitchenInfo;
        }
    }

    @Override
    public List<MerchantKitchenInfoVO> conditionalSearch(String merchantName) {
        List<MerchantKitchenInfoVO> merchantKitchenInfoVOs = new ArrayList<>(merchantKitchenDAO.conditionalSearch(merchantName));
        return merchantKitchenInfoVOs;
    }

    @Override
    public CollectionVO merchantKitchenInfoPageListByStatus(Integer page, Integer pageSize, Integer status) {
        Long count = merchantKitchenDAO.getPageTotal(status);
        CollectionVO collectionVO = new CollectionVO();
        collectionVO.setPageSize(pageSize);
        collectionVO.setRecordCnt(Integer.parseInt(count.toString()));
        collectionVO.setPageCnt(Integer.parseInt(count.toString()) % pageSize > 0 ? Integer.parseInt(count.toString()) / pageSize + 1 : Integer.parseInt(count.toString()) / pageSize);

        collectionVO.addAll(merchantKitchenDAO.pageListByStatus(page, pageSize, query(where("status").is(status))));
        return collectionVO;
    }

    @Override
    public CollectionVO merchantUserInfoPageListByStatus(Integer page, Integer pageSize, Integer status) {
        Long count = merchantUserDao.getPageTotal(status);
        CollectionVO collectionVO = new CollectionVO();
        collectionVO.setPageSize(pageSize);
        collectionVO.setRecordCnt(Integer.parseInt(count.toString()));
        collectionVO.setPageCnt(Integer.parseInt(count.toString()) % pageSize > 0 ? Integer.parseInt(count.toString()) / pageSize + 1 : Integer.parseInt(count.toString()) / pageSize);
        collectionVO.addAll(merchantUserDao.pageListByStatus(page, pageSize, query(where("status").is(status))));
        return collectionVO;
    }

    @Override
    public List<MerchantUserVO> getPagerByParams(MerchantUserParams muParams, Pagination pager) {
        return merchantUserDao.findPagerByParams(muParams, pager);
    }

    @Override
    public long count(MerchantUserParams muParams) {
        return merchantUserDao.count(muParams);
    }

    @Override
    public int updateById(String id, MerchantUserParams muParams) {
        // TODO Auto-generated method stub
        return merchantUserDao.updateById(id, muParams);
    }

    @Override
    public boolean approveMerchantUserInfo(String id, Integer status) {
        Update update = new Update();
        update.set("status", status);
        boolean isChangeMerchantUserId = merchantUserDao.approveAllInfo(query(where("id").is(id).andOperator(where("dataStatus").nin("-1"))), update);
        if (!isChangeMerchantUserId) {
            MerchantUserVO merchantUserVO = new MerchantUserVO();
            merchantUserVO.setId(id);
            merchantUserVO.setStatus(0);
            merchantUserDao.insert(merchantUserVO);
            return true;
        } else {
            return true;
        }

    }

    @Override
    public boolean approveMerchantKitchenInfo(String id, Integer status) {
        Update update = new Update();
        update.set("status", status);
        boolean isChangeMerchantKitchenId = merchantKitchenDAO.approveAllInfo(query(where("id").is(id).andOperator(where("dataStatus").nin("-1"))), update);
        if (!isChangeMerchantKitchenId) {
            MerchantKitchenInfoVO merchantKitchenInfoVO = new MerchantKitchenInfoVO();
            merchantKitchenInfoVO.setId(id);
            merchantKitchenInfoVO.setStatus(0);
            merchantKitchenDAO.insert(merchantKitchenInfoVO);
            return true;
        } else {
            return true;
        }
    }

}
