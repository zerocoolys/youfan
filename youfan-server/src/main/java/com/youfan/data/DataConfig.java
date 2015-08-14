package com.youfan.data;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;

/**
 * Created by yousheng on 15/8/13.
 */
@Configuration
public class DataConfig {


    @Bean(name = "sqlSessionFactory")
    public SqlSession createSessionFactory() {
        String resources = "mybatis-mappers.xml";

        InputStream is = DataConfig.class.getClassLoader().getResourceAsStream(resources);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);

        return sqlSessionFactory.openSession(true);
    }
}
