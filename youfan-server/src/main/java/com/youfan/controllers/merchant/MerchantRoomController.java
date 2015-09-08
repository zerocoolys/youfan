package com.youfan.controllers.merchant;

import com.youfan.commons.Pagination;
import com.youfan.commons.ResponseConstants;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.merchant.MerchantKitchenInfoVO;
import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.services.merchant.MerchantKitchenService;
import com.youfan.services.merchant.MerchantUsersService;
import org.springframework.context.annotation.Scope;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by xiaowei on 15-8-25.
 */
@RestController
@Scope("prototype")
@RequestMapping(value = "/mr")
public class MerchantRoomController implements ResponseConstants {


    @Resource
    MerchantUsersService merchantUsersService;

    @Resource
    MerchantKitchenService merchantKitchenService;


    @RequestMapping(value = "/saveMr")
    public Response saveMerchantRoom(@RequestBody MerchantKitchenInfoVO mr) {
        MerchantKitchenInfoVO merchantKitchenInfo = new MerchantKitchenInfoVO();
        return Responses.SUCCESS().setPayload(merchantKitchenInfo);
    }


    @RequestMapping(value = "/getMrOne/{id}")
    public Response getMerchantOne(@PathVariable("id") String id) {
        MerchantKitchenInfoVO mkFind = merchantUsersService.mrFindById(id);
        if (mkFind != null) {
            return Responses.SUCCESS().setPayload(mkFind);
        } else {
            return Responses.FAILED().setMsg("Data Not Found!");
        }
    }

    @RequestMapping(value = "/getMrData", method = RequestMethod.GET)
    public Response getMerchantRoomData(@RequestParam double lng, @RequestParam double lat) throws KitchenInfoException {
        List<MerchantKitchenInfoVO> pager = merchantUsersService.pageList(1, 10);
//        List<MerchantKitchenInfoVO> customList=new ArrayList<>();
//        for (int i=0;i<5;i++){
//            MerchantKitchenInfoVO merchantKitchenInfoVO=new MerchantKitchenInfoVO();
//            merchantKitchenInfoVO.setHeadImg("img/avatar.jpg");
//            merchantKitchenInfoVO.setStatus(0);
//            customList.add(merchantKitchenInfoVO);
//        }
        return Responses.SUCCESS().setPayload(pager);
    }

    @RequestMapping(value = "/getMuOne/{id}")
    public Response getMerchantUserById(@PathVariable("id") String merchantId) {
        MerchantUserVO merchantUser = merchantUsersService.muFindById(merchantId);
        return Responses.SUCCESS().setPayload(merchantUser);
    }

    @RequestMapping(value = "/getKitchenByName/{kitName}", method = RequestMethod.GET)
    public Response getKitchenByName(@PathVariable String kitName) {
        List<MerchantKitchenInfoVO> merchantKitchenInfoVOs = merchantUsersService.conditionalSearch(kitName);

        return Responses.SUCCESS().setPayload(merchantKitchenInfoVOs);
    }

    @RequestMapping(value = "/getGeographical", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getGeographical(@RequestBody Pagination p) {
        CollectionVO<MerchantKitchenInfoVO> merchantKitchenInfoVOs = null;
        try {
            merchantKitchenInfoVOs = merchantKitchenService.geographicalSearch(p);
            System.out.println("");
            return Responses.SUCCESS().setPayload(merchantKitchenInfoVOs);
        } catch (Exception e) {
            e.printStackTrace();
            return Responses.FAILED();
        }
    }
}
