package com.youfan.data.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import static com.youfan.commons.Constants.COLLECTION_CLIENT_MEALS_ADDRESS;

/**
 * Created by icepros on 15-8-25.
 * <p>用户端用户实体类
 */
@Document(collection = COLLECTION_CLIENT_MEALS_ADDRESS)
public class ClientUserEntity {

    @Id
    private String id;
    //用户电话 作为 登陆账号
    private String tel;
    //登陆密码
    private String password;
    //昵称
    private String name;
    //性别
    private String sex;
    //年龄
    private String age;
    //职业
    private String jobs;
    //注册时间
    private String registerDate;
    //送餐地址
    private List<MealsAddressEntity> mealsAddress;
    //关注
    private List<AttentionEntity> attention;


    public ClientUserEntity() {
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getJobs() {
        return jobs;
    }

    public void setJobs(String jobs) {
        this.jobs = jobs;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    public List<MealsAddressEntity> getMealsAddress() {
        return mealsAddress;
    }

    public void setMealsAddress(List<MealsAddressEntity> mealsAddress) {
        this.mealsAddress = mealsAddress;
    }

    public List<AttentionEntity> getAttention() {
        return attention;
    }

    public void setAttention(List<AttentionEntity> attention) {
        this.attention = attention;
    }
}
