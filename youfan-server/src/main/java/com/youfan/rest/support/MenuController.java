package com.youfan.rest.support;

import com.alibaba.fastjson.JSON;
import com.youfan.data.models.MenuEntity;
import com.youfan.services.menus.MenuService;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.AbstractView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
@RestController
@Scope("prototype")
@RequestMapping("/menu")
public class MenuController {

    @Resource
    private MenuService menuService;

    @RequestMapping(path = "/list/{sellerId}", method = RequestMethod.GET, produces = "application/json")
    public ModelAndView list(@PathVariable Long sellerId) {
        List<MenuEntity> menuList = menuService.list(sellerId);
        Map<String, Object> menuMap = new HashMap<>();
        menuMap.put("menus", JSON.toJSONString(menuList));

        AbstractView jsonView = new MappingJackson2JsonView();
        jsonView.setAttributesMap(menuMap);

        return new ModelAndView(jsonView);
    }

    @RequestMapping(path = "/add", method = RequestMethod.POST, produces = "application/json")
    public void add(@RequestBody List<MenuEntity> menuEntities) {
        menuService.insert(menuEntities);
    }
}
