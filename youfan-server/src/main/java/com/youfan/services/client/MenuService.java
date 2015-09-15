package com.youfan.services.client;

import java.util.List;

import com.youfan.commons.vo.client.MenuVO;
import com.youfan.data.models.MenuEntity;
import com.youfan.exceptions.MenuNameExistsException;
import com.youfan.services.MongoService;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MenuService extends MongoService<MenuEntity, MenuVO> {

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

    List<MenuVO> findByIds(List<String> menuIds);

    void conversionNRestNum(List<MenuVO> menus);
}
