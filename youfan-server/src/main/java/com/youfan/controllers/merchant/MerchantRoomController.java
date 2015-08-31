package com.youfan.controllers.merchant;

import com.youfan.commons.Constants;
import com.youfan.commons.vo.MerchantKitchenInfoVO;
import com.youfan.commons.vo.MerchantUserVO;
import com.youfan.controllers.support.WebResponse;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.services.merchant.MerchantUsersService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by xiaowei on 15-8-25.
 */
@Controller
@RequestMapping(value = "/mr")
public class MerchantRoomController {

    @Resource
    WebResponse webResponse;

    @Resource
    MerchantUsersService merchantUsersService;


    @RequestMapping(value = "/saveMr")
    public ModelAndView saveMerchantRoom(@RequestBody MerchantKitchenInfoVO mr) {
        MerchantKitchenInfoVO merchantKitchenInfo = new MerchantKitchenInfoVO();
        return webResponse.write(Constants.WEB_DATA, merchantKitchenInfo);
    }


    @RequestMapping(value = "/getMrOne/{id}")
    public ModelAndView getMerchantOne(@PathVariable("id") String id) {
        MerchantKitchenInfoVO mkFind = merchantUsersService.mrFindById(id);
        if (mkFind != null) {
            return webResponse.write(Constants.WEB_DATA, mkFind);
        } else {
            return webResponse.write(Constants.WEB_DATA, null);
        }
    }

    @RequestMapping(value = "/getMrData")
    public ModelAndView getMerchantRoomData() throws KitchenInfoException {
        List<MerchantKitchenInfoVO> pager = merchantUsersService.pageList(1, 10);
        return webResponse.write(Constants.WEB_DATA, pager);
    }

    @RequestMapping(value = "/getMuOne/{id}")
    public ModelAndView getMerchantUserById(@PathVariable("id") String merchantId) {
        MerchantUserVO merchantUser = merchantUsersService.muFindById(merchantId);
        return webResponse.write(Constants.WEB_DATA, merchantUser);
    }
}
