package com.youfan.data.dao;

import com.youfan.commons.Constants;
import com.youfan.system.mongo.MongoPool;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MongoBaseDAO<T> extends Constants {

    MongoTemplate mongoTemplate = MongoPool.getMongoTemplate(MONGO_YOUFAN);


    List<T> list();

    void insert(T t);

    void insert(List<T> ts);

    void delete(T t);

    T update(T t);

    Class<T> getEntityClass();

}
