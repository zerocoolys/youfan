package com.youfan.controllers.objs;

/**
 * Created by perfection on 15-8-28.
 */
public class MerchantKitchenStoryInfo {
    private String kitchenStoryName;    //厨房故事标题
    private String kitchenStoryContent; //厨房故事内容
    private Integer status = 0; //审核状态 0为未审核，1为审核，-1为删除
    private Long id;  //厨房id与商家用户id匹配

    public String getKitchenStoryName() {
        return kitchenStoryName;
    }

    public void setKitchenStoryName(String kitchenStoryName) {
        this.kitchenStoryName = kitchenStoryName;
    }

    public String getKitchenStoryContent() {
        return kitchenStoryContent;
    }

    public void setKitchenStoryContent(String kitchenStoryContent) {
        this.kitchenStoryContent = kitchenStoryContent;
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
