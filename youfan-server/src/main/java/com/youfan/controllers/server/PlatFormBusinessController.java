package com.youfan.controllers.server;

import com.youfan.commons.vo.CollectionVO;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.UserException;
import com.youfan.services.merchant.MerchantKitchenService;
import com.youfan.services.merchant.MerchantUsersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by MrDeng on 15/8/17.
 */
@RestController
@RequestMapping(path = "/pBusiness")
public class PlatFormBusinessController {

    Logger logger = LoggerFactory.getLogger(PlatFormBusinessController.class);
    @Resource
    MerchantUsersService merchantUsersService;
    @Resource
    MerchantKitchenService merchantKitchenService;

    ///////////////////////////////// 系统//////////////////////////////////////////
    ///////////////////////////////// 客户//////////////////////////////////////////
    ///////////////////////////////// 商家//////////////////////////////////////////

    /**
     * 获取置顶状态的商家信息
     *
     * @param status
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, path = "/merchant/getByStatus")
    public List<MerchantUserEntity> getByStatus(HttpServletRequest request, HttpServletResponse response) {
        try {
            Integer status = 0;
            if (request.getParameter("status") != null) {
                status = Integer.valueOf(request.getParameter("status"));
            }
            return merchantUsersService.getMerchantByStatus(status);
        } catch (UserException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return new ArrayList<MerchantUserEntity>();
    }

    /**
     * 获取分页 商家信息
     *
     * @param status
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, path = "/merchant/getMerchant/{pageNo}/{pageSize}")
    public CollectionVO<MerchantUserEntity> getMerchant(@PathVariable Integer pageNo, @PathVariable Integer pageSize,
                                                        HttpServletRequest request, HttpServletResponse response) {
        CollectionVO<MerchantUserEntity> result = null;
        try {
            Query query = new Query();
            if (request.getParameter("status") != null) {
                query.addCriteria(Criteria.where("status").is(Integer.valueOf(request.getParameter("status"))));
            }
            if (request.getParameter("userName") != null) {
                query.addCriteria(Criteria.where("userName").is(request.getParameter("userName")));
            }

            if (request.getParameter("realName") != null) {
                query.addCriteria(Criteria.where("realName").is(request.getParameter("realName")));
            }

            long count = merchantUsersService.count(query);
            query.skip((pageNo - 1) * pageSize);
            query.limit(pageSize);
            List<MerchantUserEntity> msa = merchantUsersService.find(query);
            result = new CollectionVO<MerchantUserEntity>(msa, (int) count, pageSize);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return result;
    }

    /**
     * 获取分页 商家厨房信息
     *
     * @param status
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, path = "/merchant/getKitchen/{pageNo}/{pageSize}")
    public CollectionVO<MerchantKitchenInfoEntity> getKitchen(@PathVariable Integer pageNo, @PathVariable Integer pageSize,
                                                              HttpServletRequest request, HttpServletResponse response) {
        CollectionVO<MerchantKitchenInfoEntity> result = null;
        try {
            Query query = new Query();
            if (request.getParameter("status") != null) {
                query.addCriteria(Criteria.where("status").is(Integer.valueOf(request.getParameter("status"))));
            }
            if (request.getParameter("userName") != null) {
                query.addCriteria(Criteria.where("userName").is(request.getParameter("userName")));
            }

            if (request.getParameter("realName") != null) {
                query.addCriteria(Criteria.where("realName").is(request.getParameter("realName")));
            }

            long count = merchantUsersService.count(query);
            query.skip((pageNo - 1) * pageSize);
            query.limit(pageSize);
            List<MerchantKitchenInfoEntity> msa = merchantKitchenService.find(query);
            result = new CollectionVO<MerchantKitchenInfoEntity>(msa, (int) count, pageSize);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return result;
    }

    /**
     * 商家 审核接口
     *
     * @param request
     * @param response
     * @description TODO
     * @version 1.0
     * @author QinghaiDeng
     * @update 2015年8月26日 下午5:50:28
     */
    @RequestMapping(method = RequestMethod.GET, path = "/merchant/checkMerchant")
    public void checkMerchant(HttpServletRequest request, HttpServletResponse response) {
        Integer status = 0;
        if (request.getParameter("id") != null && request.getParameter("status") != null) {
            status = Integer.valueOf(request.getParameter("status"));
            merchantUsersService.checkMerchant(request.getParameter("id"), status);
        }
    }

}
