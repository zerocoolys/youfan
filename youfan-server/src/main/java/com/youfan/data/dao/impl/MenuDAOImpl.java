package com.youfan.data.dao.impl;

import com.youfan.commons.MenuNoGenerator;
import com.youfan.controllers.objs.Menu;
import com.youfan.data.dao.MenuDAO;
import com.youfan.data.id.IdGenerator;
import com.youfan.data.models.MenuEntity;

import org.aspectj.apache.bcel.generic.ReturnaddressType;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
@Repository("menuDAO")
public class MenuDAOImpl implements MenuDAO {

	@Resource
	private IdGenerator idGenerator;

	@Override
	public List<Menu> findBySellerId(Long sellerId) {
		return convertToVOList(mongoTemplate.find(
				buildQuery(sellerId, null, true), getEntityClass(),
				COLLECTION_MENU));
	}

	@Override
	public List<Menu> findBySellerIdAndType(Long sellerId, String type) {
		return convertToVOList(mongoTemplate.find(
				buildMerchantQuery(sellerId, type, true), getEntityClass(),
				COLLECTION_MENU));
	};

	@Override
	public List<Menu> findAll() {
		return Collections.emptyList();
	}

	@Override
	public Menu findOne(Long menuId) {
		return convertToVO(mongoTemplate.findOne(
				buildQuery(null, menuId, true), getEntityClass(),
				COLLECTION_MENU));
	}

	@Override
	public void insert(Menu menu) {
		long no = idGenerator.next(COLLECTION_MENU);
		menu.setMenuId(MenuNoGenerator.menuNo(no));
		mongoTemplate.insert(convertToEntity(menu));
	}

	@Override
	public void insert(List<Menu> menus) {
		List<MenuEntity> entities = menus.stream().map(menu -> {
			long no = idGenerator.next(COLLECTION_MENU);
			menu.setMenuId(MenuNoGenerator.menuNo(no));
			return convertToEntity(menu);
		}).collect(Collectors.toList());
		mongoTemplate.insert(entities, COLLECTION_MENU);
	}

	@Override
	public void update(Menu menu) {
		MenuEntity entity = convertToEntity(menu);
		System.out.println(entity);
	}

	@Override
	public void delete(Long menuId) {
		Query query = buildQuery(null, menuId, true);
		mongoTemplate.updateFirst(query, Update.update(DATA_STATUS, 0),
				getEntityClass());
	}

	@Override
	public int minusRestNum(Long menuId) {
		Menu menu = findOne(menuId);
		if (menu == null || menu.getRestNum() == 0)
			return -1;

		int restNum = menu.getRestNum() - 1;
		mongoTemplate.updateFirst(buildQuery(null, menuId, true),
				Update.update(REST_NUM, restNum), getEntityClass());

		return restNum;
	}

	@Override
	public int plusTasteNum(Long menuId) {
		Menu menu = findOne(menuId);
		if (menu == null)
			return -1;

		int tasteNum = menu.getTasteNum() + 1;
		mongoTemplate.updateFirst(buildQuery(null, menuId, true),
				Update.update(TASTE_NUM, tasteNum), getEntityClass());

		return tasteNum;
	}

	@Override
	public int conversion(Long menuId, boolean sale) {
		Criteria criteria = Criteria.where(DATA_STATUS).is(1).and(MENU_ID)
				.is(menuId);
		Menu menu = findOne(Query.query(criteria));
		if (menu == null)
			return -1;

		return mongoTemplate.updateFirst(Query.query(criteria),
				Update.update(SALE, sale), getEntityClass()).getN();
	}

	@Override
	public void resetRestNumBySellerId(Long sellerId, int restNum) {
		mongoTemplate.updateMulti(buildQuery(sellerId, null, true),
				Update.update(REST_NUM, restNum), getEntityClass());
	}

	@Override
	public void resetRestNumByMenuId(Long menuId, int restNum) {
		mongoTemplate.updateFirst(buildQuery(null, menuId, true),
				Update.update(REST_NUM, restNum), getEntityClass());
	}

	@Override
	public Menu findOne(Query query) {
		return convertToVO(mongoTemplate.findOne(query, getEntityClass(),
				COLLECTION_MENU));
	}

	@Override
	public void conversionStock(List<Menu> menus) {
		for (int i = 0; i < menus.size(); i++) {
			Criteria criteria = Criteria.where(DATA_STATUS).is(1).and(MENU_ID)
					.is(menus.get(i).getMenuId());
			Menu menu = findOne(Query.query(criteria));
			if (menu != null) {
				mongoTemplate.updateFirst(Query.query(criteria),
						Update.update(STOCK, menus.get(i).getStock()),
						getEntityClass());
			}

		}
	}

	@Override
	public void conversionRestNum(List<Menu> menus) {
		for (int i = 0; i < menus.size(); i++) {
			Criteria criteria = Criteria.where(DATA_STATUS).is(1).and(MENU_ID)
					.is(menus.get(i).getMenuId());
			Menu menu = findOne(Query.query(criteria));
			if (menu != null) {
				mongoTemplate.updateFirst(Query.query(criteria),
						Update.update(REST_NUM, menus.get(i).getRestNum()),
						getEntityClass());
			}

		}
	}

}
