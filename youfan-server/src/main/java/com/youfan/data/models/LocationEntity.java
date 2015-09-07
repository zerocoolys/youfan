package com.youfan.data.models;

/**
 * Created by perfection on 15-9-7.
 */
public class LocationEntity {
    private String lat; //经度
    private String lng; //纬度

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }
}
