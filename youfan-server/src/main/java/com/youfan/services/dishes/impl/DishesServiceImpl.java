package com.youfan.services.dishes.impl;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youfan.controllers.objs.Dishes;
import com.youfan.data.dao.DishesDAO;
import com.youfan.services.dishes.DishesService;

@Service("dishesService")
public class DishesServiceImpl implements DishesService {
	private final ReentrantLock lock = new ReentrantLock();

	@Resource
	private DishesDAO dishesDao;

	@Override
	public void insert(Dishes dishes) {
		dishesDao.insert(dishes);
	}

	@Override
	public List<Dishes> list(String merchantId, String dishesType) {
		List<Dishes> list = dishesDao.list(merchantId, dishesType);
		if (list == null || list.isEmpty()) {
			return Collections.emptyList();
		}

		return list;
	}

}
