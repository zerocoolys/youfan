package com.youfan.data.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import static com.youfan.commons.Constants.COLLECTION_CLIENT_USER;

/**
 * Created by icepros on 15-8-25.
 * <p>用户端用户实体类
 */
@Document(collection = COLLECTION_CLIENT_USER)
public class UserClientEntity {

    @Id
    private String id;

    //用户id
    @Indexed(unique = true)
    private Long userId;
    //用户电话 作为 登陆账号
    private String tel;
    //登陆密码
    private String loginPwd;
    //昵称
    private String name;
    //性别
    private String sex;
    //年龄
    private String age;
    //职业
    private String jobs;

    public UserClientEntity() {
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getLoginPwd() {
        return loginPwd;
    }

    public void setLoginPwd(String loginPwd) {
        this.loginPwd = loginPwd;
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
}
