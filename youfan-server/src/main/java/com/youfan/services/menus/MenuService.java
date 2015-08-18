package com.youfan.services.menus;

import com.youfan.data.models.MenuEntity;

import java.util.List;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MenuService {

    void insert(MenuEntity menu);

    void insert(List<MenuEntity> menuEntities);

    void delete(long menuId);

    List<MenuEntity> list(long sellerId);

    MenuEntity findOne(long menuId);

    int minusRestNum(long menuId);

    int plusTasteNum(long menuId);

    void resetRestNumBySellerId(long sellerId, int restNum);

    void resetRestNumByMenuId(long menuId, int restNum);

}
