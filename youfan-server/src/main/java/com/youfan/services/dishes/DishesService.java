package com.youfan.services.dishes;

import java.util.List;

import com.youfan.controllers.objs.Dishes;

/**
 * Created on 2015-08-21.
 * 
 * @author hydm
 *
 */
public interface DishesService {
	void insert(Dishes dishes);

	List<Dishes> list(String merchantId, String dishesType);
}
