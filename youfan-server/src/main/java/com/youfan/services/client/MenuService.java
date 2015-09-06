package com.youfan.services.client;

import com.youfan.commons.Constants;
import com.youfan.commons.vo.client.MenuVO;
import com.youfan.exceptions.MenuNameExistsException;

import java.util.List;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MenuService extends Constants {

    void insert(MenuVO menu) throws MenuNameExistsException;

    void delete(String menuId);

    List<MenuVO> findBySellerId(String sellerId);

    MenuVO findByMenuId(String menuId);

    int minusRestNum(String menuId);

    int plusTasteNum(String menuId);

    void resetRestNumBySellerId(String sellerId, int restNum);

    void resetRestNumByMenuId(String menuId, int restNum);

    List<MenuVO> findBySellerIdAndType(String sellerId, String type);

    int conversion(MenuVO menu);

    void conversionStock(List<MenuVO> menus);

    void conversionRestNum(List<MenuVO> menus);

    void updateMenu(String menuId, MenuVO menu);

    void updateXfzMenu(String menuId, MenuVO menu);

    void conversionType(String menuId, MenuVO menu);

}
