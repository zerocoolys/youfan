package com.youfan.main;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import javax.annotation.Resource;

/**
 * Created by yousheng on 15/8/13.
 */
@ComponentScan("com.youfan.*")
@SpringBootApplication
public class Main implements CommandLineRunner {

    public static final Config CONFIG = ConfigFactory.defaultApplication();

    private static ApplicationContext context;


    public static void main(String[] args) {
        context = SpringApplication.run(Main.class, args);
    }

    @Resource
    private SqlSession sqlSession;

    @Override
    public void run(String... strings) throws Exception {
    	
    	
    }
}
