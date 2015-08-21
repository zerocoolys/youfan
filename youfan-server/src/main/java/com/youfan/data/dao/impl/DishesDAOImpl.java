package com.youfan.data.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.youfan.data.dao.DishesDAO;
import com.youfan.data.models.DishesEntity;
import com.youfan.data.models.MenuEntity;
@Repository("dishesDAO")
public class DishesDAOImpl implements DishesDAO {

	@Override
	public List<DishesEntity> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DishesEntity findOne(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insert(DishesEntity t) {
		// TODO Auto-generated method stub

	}

	@Override
	public void insert(List<DishesEntity> list) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void update(DishesEntity t) {
		// TODO Auto-generated method stub

	}

	@Override
	public Class<DishesEntity> getEntityClass() {
		// TODO Auto-generated method stub
		return DishesEntity.class;
	}

	@Override
	public List<DishesEntity> list(String merchantId, String dishesType) {
		return mongoTemplate.find(buildQuery(merchantId, dishesType, true),
				getEntityClass(), COLLECTION_DISHES);
	}

}
