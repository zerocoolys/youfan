package com.youfan.services.menus.impl;

import com.youfan.controllers.objs.MenuVO;
import com.youfan.data.dao.MenuDAO;
import com.youfan.services.menus.MenuService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    public void insert(MenuVO menu) {
        if (menu == null)
            return;

        menuDAO.insert(menu);
    }

    @Override
    public void insert(List<MenuVO> menus) {
        if (menus == null || menus.isEmpty())
            return;

        menuDAO.insert(menus);
    }

    @Override
    public void delete(long menuId) {
        menuDAO.delete(menuId);
    }

    @Override
    public List<MenuVO> findBySellerId(long sellerId) {
        List<MenuVO> list = menuDAO.findBySellerId(sellerId);
        if (list == null || list.isEmpty())
            return Collections.emptyList();

        return list;
    }

    @Override
    public List<MenuVO> findBySellerIdAndType(Long sellerId, String type) {
        List<MenuVO> list = menuDAO.findBySellerIdAndType(sellerId, type);
        if (list == null || list.isEmpty())
            return Collections.emptyList();

        return list;
    }

    @Override
    public MenuVO findByMenuId(long menuId) {
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
    public int conversion(MenuVO menu) {
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
    public void conversionStock(List<MenuVO> menus) {
        lock.lock();

        try {
            menuDAO.conversionStock(menus);
        } finally {
            lock.unlock();
        }

    }

    @Override
    public void conversionRestNum(List<MenuVO> menus) {
        lock.lock();

        try {
            menuDAO.conversionRestNum(menus);
        } finally {
            lock.unlock();
        }

    }

    @Override
    public void updateMenu(Long menuId, MenuVO menu) {

        lock.lock();

        try {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put(NAME, menu.getName());
            map.put(PRICE, menu.getPrice());
            map.put(STOCK, menu.getStock());
            map.put(PIC_URLS, menu.getPicUrls());
            map.put(DESCRIPTION, menu.getDescription());
            map.put(TASTE, menu.getTaste());
            map.put(STAPLE, menu.isStaple());
            map.put(FEATURES, menu.getFeatures());
            menuDAO.update(menu, map);
        } finally {
            lock.unlock();
        }

    }

    @Override
    public void updateXfzMenu(Long menuId, MenuVO menu) {
        lock.lock();

        try {
            Map<String, Object> map = new HashMap<String, Object>();

            map.put(PRICE, menu.getPrice());
            map.put(STOCK, menu.getStock());
            map.put(PIC_URLS, menu.getPicUrls());

            menuDAO.update(menu, map);
        } finally {
            lock.unlock();
        }
    }

    @Override
    public void conversionType(Long menuId, MenuVO menu) {
        lock.lock();

        try {
            Map<String, Object> map = new HashMap<String, Object>();
            String type = menu.getType().equals("nsc") ? "qtc" : "nsc";
            map.put(TYPE, type);

            menuDAO.update(menu, map);
        } finally {
            lock.unlock();
        }
    }

}
