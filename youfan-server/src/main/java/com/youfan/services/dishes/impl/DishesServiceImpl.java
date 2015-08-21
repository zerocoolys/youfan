package com.youfan.services.dishes.impl;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youfan.data.dao.DishesDAO;
import com.youfan.data.models.DishesEntity;
import com.youfan.services.dishes.DishesService;

@Service("dishesService")
public class DishesServiceImpl implements DishesService {
	private final ReentrantLock lock = new ReentrantLock();

	@Resource
	private DishesDAO dishesDao;

	@Override
	public int insert(DishesEntity menu) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<DishesEntity> list(String merchantId, String dishesType) {
		List<DishesEntity> list = dishesDao.list(merchantId, dishesType);
		if (list == null || list.isEmpty()) {
			return Collections.emptyList();
		}

		return list;
	}

}
