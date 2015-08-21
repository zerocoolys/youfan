package com.youfan.data.models;

import org.springframework.data.annotation.Id;

/**
 * Created by yousheng on 15/8/14.
 */
public class OrderDishRelEntity {

    @Id
    private Long id;

    private Long orderNo;

    private Long itemId;

    private int count;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Long getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Long orderNo) {
        this.orderNo = orderNo;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }
}
