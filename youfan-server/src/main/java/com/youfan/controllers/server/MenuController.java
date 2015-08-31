package com.youfan.controllers.server;

import com.youfan.commons.vo.client.MenuVO;
import com.youfan.services.client.MenuService;
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
        List<MenuVO> menuList = menuService.findBySellerId(sellerId);
        Map<String, Object> menuMap = new HashMap<>();
        menuMap.put("menus", menuList);

        AbstractView jsonView = new MappingJackson2JsonView();
        jsonView.setAttributesMap(menuMap);

        return new ModelAndView(jsonView);
    }

    @RequestMapping(path = "/list/{sellerId}/{type}", method = RequestMethod.GET, produces = "application/json")
    public ModelAndView listByType(@PathVariable Long sellerId,
                                   @PathVariable String type) {
        List<MenuVO> menuList = menuService.findBySellerIdAndType(sellerId, type);
        Map<String, Object> menuMap = new HashMap<>();
        menuMap.put("menus", menuList);

        AbstractView jsonView = new MappingJackson2JsonView();
        jsonView.setAttributesMap(menuMap);

        return new ModelAndView(jsonView);
    }

    @RequestMapping(path = "/lists/{menuId}", method = RequestMethod.GET, produces = "application/json")
    public ModelAndView findMenuById(@PathVariable Long menuId) {

        MenuVO menu = menuService.findByMenuId(menuId);
        Map<String, Object> menuMap = new HashMap<>();
        menuMap.put("menu", menu);

        AbstractView jsonView = new MappingJackson2JsonView();
        jsonView.setAttributesMap(menuMap);

        return new ModelAndView(jsonView);
    }

    @RequestMapping(path = "/add", method = RequestMethod.POST, produces = "application/json")
    public void addMenu(@RequestBody MenuVO menu) {
        menuService.insert(menu);
    }

    @RequestMapping(path = "/conversion/sale", method = RequestMethod.POST, produces = "application/json")
    public void conversion(@RequestBody MenuVO menu) {
        menuService.conversion(menu);
    }

    @RequestMapping(path = "/renewal/{menuId}", method = RequestMethod.POST, produces = "application/json")
    public void update(@PathVariable Long menuId, @RequestBody MenuVO menu) {

        menuService.updateMenu(menuId, menu);

    }

    @RequestMapping(path = "/renewal/xfz/{menuId}", method = RequestMethod.POST, produces = "application/json")
    public void updateXfz(@PathVariable Long menuId, @RequestBody MenuVO menu) {

        menuService.updateXfzMenu(menuId, menu);

    }

    @RequestMapping(path = "/conversion/type/{menuId}", method = RequestMethod.POST, produces = "application/json")
    public void conversionType(@PathVariable Long menuId, @RequestBody MenuVO menu) {

        menuService.conversionType(menuId, menu);

    }

    // 改变今日余量
    @RequestMapping(path = "/conversion/restNum", method = RequestMethod.POST, produces = "application/json")
    public void conversionRestNum(@RequestBody List<MenuVO> menus) {
        menuService.conversionRestNum(menus);
    }

    // 改变每日固定库存
    @RequestMapping(path = "/conversion/stock", method = RequestMethod.POST, produces = "application/json")
    public void conversionStock(@RequestBody List<MenuVO> menus) {
        menuService.conversionStock(menus);
    }

    @RequestMapping(path = "/menus/{menuId}", method = RequestMethod.DELETE, produces = "application/json")
    public void removeMenu(@PathVariable Long menuId) {
        System.out.println(menuId);
        menuService.delete(menuId);
    }
}
