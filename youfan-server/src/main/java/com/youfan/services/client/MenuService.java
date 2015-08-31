package com.youfan.services.client;

import com.youfan.commons.Constants;
import com.youfan.commons.vo.client.MenuVO;

import java.util.List;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MenuService extends Constants {

    void insert(MenuVO menu);

    void delete(long menuId);

    List<MenuVO> findBySellerId(long sellerId);

    MenuVO findByMenuId(long menuId);

    int minusRestNum(long menuId);

    int plusTasteNum(long menuId);

    void resetRestNumBySellerId(long sellerId, int restNum);

    void resetRestNumByMenuId(long menuId, int restNum);

    List<MenuVO> findBySellerIdAndType(Long sellerId, String type);

    int conversion(MenuVO menu);

    void conversionStock(List<MenuVO> menus);

    void conversionRestNum(List<MenuVO> menus);

    void updateMenu(Long menuId, MenuVO menu);

    void updateXfzMenu(Long menuId, MenuVO menu);

    void conversionType(Long menuId, MenuVO menu);

}
