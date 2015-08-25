package com.youfan.rest.support;

import com.youfan.controllers.objs.Menu;
import com.youfan.services.menus.MenuService;
import com.youfan.utils.JSONUtils;
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
		List<Menu> menuList = menuService.findBySellerId(sellerId);
		Map<String, Object> menuMap = new HashMap<>();
		menuMap.put("menus", JSONUtils.getJsonString(menuList));

		AbstractView jsonView = new MappingJackson2JsonView();
		jsonView.setAttributesMap(menuMap);

		return new ModelAndView(jsonView);
	}

	@RequestMapping(path = "/list/{sellerId}/{type}", method = RequestMethod.GET, produces = "application/json")
	public ModelAndView listByType(@PathVariable Long sellerId,
			@PathVariable String type) {
		List<Menu> menuList = menuService.findBySellerIdAndType(sellerId, type);
		Map<String, Object> menuMap = new HashMap<>();
		menuMap.put("menus", menuList);

		AbstractView jsonView = new MappingJackson2JsonView();
		jsonView.setAttributesMap(menuMap);

		return new ModelAndView(jsonView);
	}

	@RequestMapping(path = "", method = RequestMethod.POST, produces = "application/json")
	public void addMenu(@RequestBody Menu menu) {
		menuService.insert(menu);
	}

	@RequestMapping(path = "/add", method = RequestMethod.POST, produces = "application/json")
	public void add(@RequestBody List<Menu> menus) {
		menuService.insert(menus);
	}
}
