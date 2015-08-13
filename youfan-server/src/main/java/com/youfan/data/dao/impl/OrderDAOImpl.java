package com.youfan.data.dao.impl;

import com.youfan.data.dao.OrderDAO;
import org.springframework.stereotype.Repository;

/**
 * Created by yousheng on 15/8/13.
 */
@Repository("orderDAO")
public class OrderDAOImpl implements OrderDAO {
    @Override
    public void say() {
        System.out.println("HelloW = ");
    }
}
