package com.youfan.data.models;

import org.springframework.data.annotation.Id;

/**
 * Created by yousheng on 15/8/14.
 */
public class OrderDishRelEntity {
    @Id
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Long orderNo) {
        this.orderNo = orderNo;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    private int count;

    private Long orderNo;

    private String itemId;

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
