package com.youfan.data.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.youfan.controllers.objs.Dishes;
import com.youfan.data.dao.DishesDAO;
import com.youfan.data.models.DishesEntity;

@Repository("dishesDAO")
public class DishesDAOImpl implements DishesDAO {

	@Override
	public Class<DishesEntity> getEntityClass() {
		return DishesEntity.class;
	}

	@Override
	public Class<Dishes> getVOClass() {
		return Dishes.class;
	}

	@Override
	public List<Dishes> list(String merchantId, String dishesType) {
		return convertToVOList(mongoTemplate.find(
				buildQuery(merchantId, dishesType, true), getEntityClass(),
				COLLECTION_DISHES));
	}

	@Override
	public List<Dishes> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Dishes findOne(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insert(Dishes dishes) {
		mongoTemplate.insert(convertToEntity(dishes));
	}

	@Override
	public void insert(List<Dishes> list) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void update(Dishes t) {
		// TODO Auto-generated method stub

	}

}
