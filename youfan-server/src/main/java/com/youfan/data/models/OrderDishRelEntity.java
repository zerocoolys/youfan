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

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getDishId() {
        return dishId;
    }

    public void setDishId(String dishId) {
        this.dishId = dishId;
    }

    private Long orderId;

    private String dishId;
}
