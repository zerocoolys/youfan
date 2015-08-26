package com.youfan.services.menus;

import com.youfan.controllers.objs.Menu;

import java.util.List;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MenuService {

	void insert(Menu menu);

	void insert(List<Menu> menus);

	void delete(long menuId);

	List<Menu> findBySellerId(long sellerId);

	Menu findByMenuId(long menuId);

	int minusRestNum(long menuId);

	int plusTasteNum(long menuId);

	void resetRestNumBySellerId(long sellerId, int restNum);

	void resetRestNumByMenuId(long menuId, int restNum);

	List<Menu> findBySellerIdAndType(Long sellerId, String type);

	int conversion(Menu menu);

	void conversionStock(List<Menu> menus);

	void conversionRestNum(List<Menu> menus);

}
