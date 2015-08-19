package com.youfan.data.id;

import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;

import javax.annotation.Resource;

/**
 * Created by yousheng on 15/8/14.
 */
@Component
public class IdGenerator {

    @Resource
    private Jedis jedis;


    public long next(String seqName) {
        return jedis.incr("seq:" + seqName);
    }
}
