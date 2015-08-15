package com.youfan.services.redis;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;

/**
 * Created by yousheng on 15/8/14.
 */
@Component
public class RedisPool {


    @Bean
    public Jedis getJedis() {

        Jedis jedis = new Jedis("192.168.100.10");
        jedis.auth("3edcvfr4");

        return jedis;
    }
}
