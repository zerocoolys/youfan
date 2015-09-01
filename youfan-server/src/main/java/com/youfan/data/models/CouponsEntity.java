package com.youfan.data.models;

import com.youfan.utils.StringUtil;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import java.util.Date;

import static com.youfan.commons.Constants.*;

/**
 * Created on 2015-08-21.
 * <p>优惠券实体类.
 * // TODO 优惠券实体类实现.
 *
 * @author dolphineor
 */
@Document(collection = COLLECTION_COUPONS)
public class CouponsEntity {
    @Id
    private String id;

    //用户id
    private String userid;

    //优惠卷Id
    @Field("cid")
    private String couponsid;

    //创建时间
    @Field("cd")
    private Date createDate;

    //修改时间
    @Field("md")
    private Date modifyDate;

    //使用状态  (0,未使用  1,已使用)
    private Integer status;

    //数据有效性 (0,已删除  1,未删除)
    @Field("ds")
    private Integer dataStatus;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getCouponsid() {
        return couponsid;
    }

    public void setCouponsid(String couponsid) {
        this.couponsid = couponsid;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(Integer dataStatus) {
        this.dataStatus = dataStatus;
    }

    @Override
    public String toString() {
        return "CouponsEntity{" +
                "id='" + id + '\'' +
                ", userid=" + userid +
                ", couponsid=" + couponsid +
                ", createDate=" + createDate +
                ", modifyDate=" + modifyDate +
                ", status=" + status +
                ", dataStatus=" + dataStatus +
                '}';
    }
}
