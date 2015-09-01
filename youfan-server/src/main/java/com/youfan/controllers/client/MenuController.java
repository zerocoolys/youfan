package com.youfan.controllers.client;

import com.youfan.commons.vo.client.MenuVO;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.client.MenuService;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

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
    public Response list(@PathVariable String sellerId) {
        List<MenuVO> menuList = menuService.findBySellerId(sellerId);
        return Responses.SUCCESS().setPayload(menuList);
    }

    @RequestMapping(path = "/list/{sellerId}/{type}", method = RequestMethod.GET, produces = "application/json")
    public Response listByType(@PathVariable String sellerId,
                               @PathVariable String type) {
        List<MenuVO> menuList = menuService.findBySellerIdAndType(sellerId, type);
        return Responses.SUCCESS().setPayload(menuList);
    }

    @RequestMapping(path = "/lists/{menuId}", method = RequestMethod.GET, produces = "application/json")
    public Response findMenuById(@PathVariable String menuId) {
        MenuVO menu = menuService.findByMenuId(menuId);
        return Responses.SUCCESS().setPayload(menu);
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
    public void update(@PathVariable String menuId, @RequestBody MenuVO menu) {
        menuService.updateMenu(menuId, menu);
    }

    @RequestMapping(path = "/renewal/xfz/{menuId}", method = RequestMethod.POST, produces = "application/json")
    public void updateXfz(@PathVariable String menuId, @RequestBody MenuVO menu) {
        menuService.updateXfzMenu(menuId, menu);
    }

    @RequestMapping(path = "/conversion/type/{menuId}", method = RequestMethod.POST, produces = "application/json")
    public void conversionType(@PathVariable String menuId, @RequestBody MenuVO menu) {
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
    public void removeMenu(@PathVariable String menuId) {
        menuService.delete(menuId);
    }
}
