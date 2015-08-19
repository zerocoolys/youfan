package com.youfan.controllers.params;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yousheng on 15/8/14.
 */
public class OrderParams {

    String buyerId;

    String sellerId;

    Map<String, Integer> itemMap = new HashMap<>();

    String memo;

    double price;

    int orderStatus;

    public String getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public Map<String, Integer> getItemMap() {
        return itemMap;
    }

    public void setItemMap(Map<String, Integer> itemMap) {
        this.itemMap = itemMap;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(int orderStatus) {
        this.orderStatus = orderStatus;
    }
}
