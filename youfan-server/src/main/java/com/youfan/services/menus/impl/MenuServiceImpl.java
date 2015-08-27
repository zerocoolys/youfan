package com.youfan.services.menus.impl;

import com.youfan.controllers.objs.Menu;
import com.youfan.data.dao.MenuDAO;
import com.youfan.services.menus.MenuService;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
@Service("menuService")
public class MenuServiceImpl implements MenuService {

	private final ReentrantLock lock = new ReentrantLock();

	@Resource
	private MenuDAO menuDAO;

	@Override
	public void insert(Menu menu) {
		if (menu == null)
			return;

		menuDAO.insert(menu);
	}

	@Override
	public void insert(List<Menu> menus) {
		if (menus == null || menus.isEmpty())
			return;

		menuDAO.insert(menus);
	}

	@Override
	public void delete(long menuId) {
		menuDAO.delete(menuId);
	}

	@Override
	public List<Menu> findBySellerId(long sellerId) {
		List<Menu> list = menuDAO.findBySellerId(sellerId);
		if (list == null || list.isEmpty())
			return Collections.emptyList();

		return list;
	}

	@Override
	public List<Menu> findBySellerIdAndType(Long sellerId, String type) {
		List<Menu> list = menuDAO.findBySellerIdAndType(sellerId, type);
		if (list == null || list.isEmpty())
			return Collections.emptyList();

		return list;
	}

	@Override
	public Menu findByMenuId(long menuId) {
		return menuDAO.findByMenuId(menuId);
	}

	@Override
	public int minusRestNum(long menuId) {
		lock.lock();
		int restNum = -1;

		try {
			restNum = menuDAO.minusRestNum(menuId);
		} finally {
			lock.unlock();
		}

		return restNum;
	}

	@Override
	public int plusTasteNum(long menuId) {
		lock.lock();
		int tasteNum = -1;

		try {
			menuDAO.plusTasteNum(menuId);
		} finally {
			lock.unlock();
		}

		return tasteNum;
	}

	@Override
	public void resetRestNumBySellerId(long sellerId, int restNum) {
		menuDAO.resetRestNumBySellerId(sellerId, restNum);
	}

	@Override
	public void resetRestNumByMenuId(long menuId, int restNum) {
		menuDAO.resetRestNumByMenuId(menuId, restNum);
	}

	@Override
	public int conversion(Menu menu) {
		lock.lock();
		int restNum = -1;

		try {
			restNum = menuDAO.conversion(menu.getMenuId(), menu.isSale());
		} finally {
			lock.unlock();
		}

		return restNum;

	}

	@Override
	public void conversionStock(List<Menu> menus) {
		lock.lock();

		try {
			menuDAO.conversionStock(menus);
		} finally {
			lock.unlock();
		}

	}

	@Override
	public void conversionRestNum(List<Menu> menus) {
		lock.lock();

		try {
			menuDAO.conversionRestNum(menus);
		} finally {
			lock.unlock();
		}

	}

	@Override
	public void updateMenu(Long menuId, Menu menu) {

		lock.lock();

		try {
			menuDAO.update(menu);
		} finally {
			lock.unlock();
		}

	}

}
