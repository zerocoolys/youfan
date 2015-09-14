package com.youfan.data.dao;

import com.youfan.commons.Constants;
import com.youfan.system.mongo.MongoPool;
import com.youfan.utils.JSONUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.query.Criteria.where;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MongoBaseDAO<E, V, ID extends Serializable> extends Constants {

    MongoTemplate mongoTemplate = MongoPool.getMongoTemplate(MONGO_YOUFAN);

    default V findOne(ID id) {
        return convertToVO(mongoTemplate.findOne(idQuery(id), getEntityClass()));
    }

    default void insert(V v) {
        mongoTemplate.insert(v);
    }

    default void delete(ID id) {
        mongoTemplate.remove(idQuery(id), getEntityClass());
    }

    @Deprecated
    void update(V v);

    default void save(V v) {
        mongoTemplate.save(convertToEntity(v));
    }

    Class<E> getEntityClass();


    Class<V> getVOClass();


    default Query idQuery(ID id) {
        return Query.query(Criteria.where(MONGO_ID).is(id));
    }


    /**
     * <p>
     * 该方法用于将VO转换为Entity, 大部分情况下通用, 若出现无法转换的情况, 请在DAO的实现层覆盖并自行实现相应的转换方法.
     *
     * @param v
     * @return
     */
    default E convertToEntity(V v) {
        Class<E> clazz = getEntityClass();
        try {
            E entity = clazz.newInstance();

            Map<String, Field> entityFieldMap = Arrays.stream(getEntityClass().getDeclaredFields()).map(field -> {
                field.setAccessible(true);
                return field;
            }).collect(Collectors.toMap(Field::getName, field -> field));

            Field[] fields = getVOClass().getDeclaredFields();


            for (Field field : fields) {
                field.setAccessible(true);
                if (Objects.equals(BigDecimal.class, entityFieldMap.get(field.getName()).getType())) {
                    entityFieldMap.get(field.getName()).set(entity, BigDecimal.valueOf((Double) field.get(v)));
                } else if (Objects.equals(Date.class, field.getType())) {
                    if (Objects.equals(Timestamp.class, entityFieldMap.get(field.getName()).getType())) {
                        entityFieldMap.get(field.getName()).set(entity,
                                Timestamp.from(((Date) field.get(v)).toInstant()));
                    } else {
                        entityFieldMap.get(field.getName()).set(entity, field.get(v));
                    }
                } else {
                    entityFieldMap.get(field.getName()).set(entity, field.get(v));
                }

            }

            return entity;
        } catch (ReflectiveOperationException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * <p>
     * 该方法用于将Entity转换为VO, 注意事项同{@link MongoBaseDAO#convertToEntity(Object)}
     *
     * @param entity
     * @return
     */
    default V convertToVO(E entity) {
        Class<V> clazz = getVOClass();
        try {
            V v = clazz.newInstance();

            Map<String, Field> voFieldMap = Arrays.stream(getVOClass().getDeclaredFields()).map(field -> {
                field.setAccessible(true);
                return field;
            }).collect(Collectors.toMap(Field::getName, field -> field));

            Field[] fields = getEntityClass().getDeclaredFields();
            for (Field field : fields) {
                if (voFieldMap.containsKey(field.getName())) {
                    field.setAccessible(true);
                    if (Objects.equals(BigDecimal.class, field.getType())) {
                        voFieldMap.get(field.getName()).set(v,
                                ((BigDecimal) field.get(entity)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    } else {
                        voFieldMap.get(field.getName()).set(v, field.get(entity));
                    }

                }
            }

            return v;
        } catch (ReflectiveOperationException e) {
            e.printStackTrace();
        }

        return null;
    }

    default List<E> convertToEntityList(List<V> vList) {
        return vList.stream().map(this::convertToEntity).filter(e -> e != null).collect(Collectors.toList());
    }

    default List<V> convertToVOList(List<E> eList) {
        return eList.stream().map(this::convertToVO).filter(t -> t != null).collect(Collectors.toList());
    }

    default Update buildUpdate(Map<String, Object> map) {
        Update update = new Update();
        for (String key : map.keySet()) {
            update.set(key, map.get(key));
        }
        return update;
    }

    default Query buildAndEqualQuery(Map<String, Object> map) {
        Query query = new Query();
        if (map == null || map.isEmpty())
            return query;
        if (map != null && !map.isEmpty()) {
            for (String key : map.keySet()) {
                if (map.get(key) != null) {
                    query.addCriteria(where(key).is(map.get(key)));
                }
            }
        }
        return query;
    }

    default Query buildAndEqualQuery(Object vo) {
        Query query = new Query();
        if (vo == null)
            return query;
        try {
            query = buildAndEqualQuery(JSONUtils.obj2map(vo));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return query;
    }
}
