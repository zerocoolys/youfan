package com.youfan.services.dishes;

import java.util.List;

import com.youfan.data.models.DishesEntity;

/**
 * Created on 2015-08-21.
 * 
 * @author hydm
 *
 */
public interface DishesService {
	int insert(DishesEntity menu);

	List<DishesEntity> list(String merchantId, String dishesType);
}
