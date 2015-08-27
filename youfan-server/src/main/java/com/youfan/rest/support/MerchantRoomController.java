package com.youfan.rest.support;

import com.youfan.commons.Constants;
import com.youfan.controllers.objs.MerchantKitchenInfo;
import com.youfan.controllers.support.WebResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by xiaowei on 15-8-25.
 */
@Controller
@RequestMapping(value = "/mr")
public class MerchantRoomController {

    @Resource
    WebResponse webResponse;


    @RequestMapping(value = "/saveMr")
    public ModelAndView saveMerchantRoom(@RequestBody MerchantKitchenInfo mr) {
        MerchantKitchenInfo merchantKitchenInfo = new MerchantKitchenInfo();
        return webResponse.write(Constants.WEB_DATA, merchantKitchenInfo);
    }

    @RequestMapping(value = "/getMrData")
    public ModelAndView getMerchantRoomData() {
        List<MerchantKitchenInfo> list = new ArrayList<>();
        return webResponse.write(Constants.WEB_DATA, list);
    }
}
