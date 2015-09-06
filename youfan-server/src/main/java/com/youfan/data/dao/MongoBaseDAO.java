package com.youfan.data.dao;

import com.youfan.commons.Constants;
import com.youfan.commons.Pager;
import com.youfan.commons.Pagination;
import com.youfan.data.support.IdGenerator;
import com.youfan.system.mongo.MongoPool;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MongoBaseDAO<E, T, ID extends Serializable> extends Constants {

    MongoTemplate mongoTemplate = MongoPool.getMongoTemplate(MONGO_YOUFAN);

    T findOne(ID id);

    void insert(T t);

    void delete(ID id);

    void update(T t);

    Pager findPager(Pagination p);

    Class<E> getEntityClass();

    Class<T> getVOClass();

    /**
     * <p>
     * 该方法用于将VO转换为Entity, 大部分情况下通用, 若出现无法转换的情况, 请在DAO的实现层覆盖并自行实现相应的转换方法.
     *
     * @param t
     * @return
     */
    default E convertToEntity(T t) {
        Class<E> clazz = getEntityClass();
        try {
            E entity = clazz.newInstance();

            Map<String, Field> entityFieldMap = Arrays
                    .stream(getEntityClass().getDeclaredFields())
                    .map(field -> {
                        field.setAccessible(true);
                        return field;
                    })
                    .collect(Collectors.toMap(Field::getName, field -> field));

            Field[] fields = getVOClass().getDeclaredFields();
            for (Field field : fields) {
                field.setAccessible(true);
                if (Objects.equals(BigDecimal.class,
                        entityFieldMap.get(field.getName()).getType())) {
                    entityFieldMap.get(field.getName()).set(entity,
                            BigDecimal.valueOf((Double) field.get(t)));
                } else if (Objects.equals(Date.class, field.getType())) {
                    if (Objects.equals(Timestamp.class,
                            entityFieldMap.get(field.getName()).getType())) {
                        entityFieldMap.get(field.getName()).set(
                                entity,
                                Timestamp.from(((Date) field.get(t))
                                        .toInstant()));
                    } else {
                        entityFieldMap.get(field.getName()).set(entity,
                                field.get(t));
                    }
                } else {
                    entityFieldMap.get(field.getName()).set(entity,
                            field.get(t));
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
    default T convertToVO(E entity) {
        Class<T> clazz = getVOClass();
        try {
            T t = clazz.newInstance();

            Map<String, Field> voFieldMap = Arrays
                    .stream(getVOClass().getDeclaredFields()).map(field -> {
                        field.setAccessible(true);
                        return field;
                    })
                    .collect(Collectors.toMap(Field::getName, field -> field));

            Field[] fields = getEntityClass().getDeclaredFields();
            for (Field field : fields) {
                if (voFieldMap.containsKey(field.getName())) {
                    field.setAccessible(true);
                    if (Objects.equals(BigDecimal.class, field.getType())) {
                        voFieldMap
                                .get(field.getName())
                                .set(t,
                                        ((BigDecimal) field.get(entity))
                                                .setScale(
                                                        2,
                                                        BigDecimal.ROUND_HALF_UP)
                                                .doubleValue());
                    } else {
                        voFieldMap.get(field.getName()).set(t,
                                field.get(entity));
                    }

                }
            }

            return t;
        } catch (ReflectiveOperationException e) {
            e.printStackTrace();
        }

        return null;
    }

    default List<E> convertToEntityList(List<T> tList) {
        return tList.stream().map(this::convertToEntity).filter(e -> e != null)
                .collect(Collectors.toList());
    }

    default List<T> convertToVOList(List<E> eList) {
        return eList.stream().map(this::convertToVO).filter(t -> t != null)
                .collect(Collectors.toList());
    }

    /**
     * <p>
     * Generate entity id.
     *
     * @param no
     *            Please use {@link IdGenerator} to get no
     * @return entityId
     * @deprecated
     */
    default long generateId(long no) {
        return Instant.now().getEpochSecond() + no;
    }

    default Update buildUpdate(Map<String, Object> map) {
        Update update = new Update();
        for (String key : map.keySet()) {
            update.set(key, map.get(key));
        }
        return update;
    }
}
