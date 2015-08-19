package com.youfan.data.dao;

import com.youfan.commons.Constants;
import com.youfan.system.mongo.MongoPool;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.io.Serializable;
import java.util.List;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MongoBaseDAO<T, ID extends Serializable> extends Constants {

    MongoTemplate mongoTemplate = MongoPool.getMongoTemplate(MONGO_YOUFAN);


    List<T> findAll();

    T findOne(ID id);

    void insert(T t);

    void insert(List<T> list);

    void delete(ID id);

    void update(T t);

    Class<T> getEntityClass();

}
