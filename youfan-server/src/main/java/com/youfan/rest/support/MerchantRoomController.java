package com.youfan.rest.support;

import com.youfan.commons.Constants;
import com.youfan.controllers.objs.MerchantKitchenInfo;
import com.youfan.controllers.support.WebResponse;
import com.youfan.exceptions.KitchenInfoException;
import com.youfan.services.users.MerchantUsersServer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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

    @Resource
    MerchantUsersServer merchantUsersServer;


    @RequestMapping(value = "/saveMr")
    public ModelAndView saveMerchantRoom(@RequestBody MerchantKitchenInfo mr) {
        MerchantKitchenInfo merchantKitchenInfo = new MerchantKitchenInfo();
        return webResponse.write(Constants.WEB_DATA, merchantKitchenInfo);
    }


    @RequestMapping(value = "/getMrOne/{id}")
    public ModelAndView getMerchantOne(@PathVariable("id") String id) {
        MerchantKitchenInfo mkFind = merchantUsersServer.findById(id);
        if (mkFind != null) {
            return webResponse.write(Constants.WEB_DATA, mkFind);
        } else {
            return webResponse.write(Constants.WEB_DATA, null);
        }
    }

    @RequestMapping(value = "/getMrData")
    public ModelAndView getMerchantRoomData() throws KitchenInfoException {
        List<MerchantKitchenInfo> pager = merchantUsersServer.pageList(1, 10);
        List<MerchantKitchenInfo> list = new ArrayList<>();
        for (int i = 1; i < 3; i++) {
            MerchantKitchenInfo mr = new MerchantKitchenInfo();
            mr.setId(i + "");
            mr.setAddressGeoCoding("x:1234,y:4321");
            mr.setCuisine(new ArrayList<String>() {{
                add("川菜");
                add("粤菜");
            }});
            mr.setDesc("暂无说明" + i);
            mr.setDisPrice(27.0);
            mr.setDisRange(2.0);
            mr.setDistribution("只送小区" + i);
            mr.setStartTime("8:00");
            mr.setEndTime("20:00");
            mr.setGalleryFul(0);
            mr.setIsCanteen(false);
            mr.setIsTakeSelf(true);
            mr.setKitchenAddress("成都市成华区新华公园" + i);
            mr.setKitchenPicUrl(new ArrayList<String>() {{
                add("img/1.jpg");
            }});
            mr.setKitchenName("我的厨房" + i);
            mr.setPhoneNumber("15208364407");
            mr.setStatus(0);
            list.add(mr);
        }

        return webResponse.write(Constants.WEB_DATA, pager);
    }
}
