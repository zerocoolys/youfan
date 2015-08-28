package com.youfan.controllers.objs;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by perfection on 15-8-28.
 */
public class MerchantKitchenPicInfo {
    private List<String> kitchenPicUrl = new ArrayList<>(); //厨房照片路径
    private Integer status = 0; //审核状态 0为未审核，1为审核，-1为删除
    private Long id;  //厨房id与商家用户id匹配

    public List<String> getKitchenPicUrl() {
        return kitchenPicUrl;
    }

    public void setKitchenPicUrl(List<String> kitchenPicUrl) {
        this.kitchenPicUrl = kitchenPicUrl;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
