package com.youfan.commons.vo.server;

/**
 * @author dolphineor
 * @date 2015-09-09
 * @package {@link com.youfan.commons.vo.server}
 * @description 订单中的菜品描述对象
 */
public class DishVO {
    private String id;
    private String name;
    private int count;
    private double unitPrice;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }
}
