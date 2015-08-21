package com.youfan.rest.support;

import com.youfan.controllers.objs.Dishes;
import com.youfan.services.dishes.DishesService;

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
 * Created on 2015-08-21.
 *
 * @author hydm
 */
@RestController
@Scope("prototype")
@RequestMapping("/dishes")
public class DishesController {

	@Resource
	private DishesService dishesService;

	@RequestMapping(path = "/list/{dishesType}/{merchantId}", method = RequestMethod.GET, produces = "application/json")
	public ModelAndView list(@PathVariable String dishesType,
			@PathVariable String merchantId) {
		List<Dishes> dishesList = dishesService.list(merchantId,
				dishesType);
		Map<String, Object> menuMap = new HashMap<>();
		menuMap.put("dishes", dishesList);

		AbstractView jsonView = new MappingJackson2JsonView();
		jsonView.setAttributesMap(menuMap);

		return new ModelAndView(jsonView);
	}

	@RequestMapping(path = "", method = RequestMethod.POST, produces = "application/json")
	public void add(@RequestBody Dishes dishes) {
		dishesService.insert(dishes);
	}
}
