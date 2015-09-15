package com.youfan.data.dao;

import com.mongodb.WriteResult;
import com.youfan.commons.Constants;
import com.youfan.commons.Pagination;
import com.youfan.controllers.params.MongoParams;
import com.youfan.system.mongo.MongoPool;
import com.youfan.utils.JSONUtils;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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
import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface MongoBaseDAO<E, V, ID extends Serializable> extends Constants {

	MongoTemplate mongoTemplate = MongoPool.getMongoTemplate(MONGO_YOUFAN);

	@Deprecated
	void update(V v);

	Class<E> getEntityClass();

	Class<V> getVOClass();

	

	////////////// 以下为Mongo基础CURD方法实现/////////////
	/**
	 * 
	 * @param id
	 * @return
	 * @description 由ID查询一个
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月15日 上午10:05:18
	 */
	default V findOne(ID id) {
		return convertToVO(mongoTemplate.findOne(idQuery(id), getEntityClass()));
	}

	/**
	 * 
	 * @param v
	 * @description 插入
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月15日 上午10:06:25
	 */
	default void insert(V v) {
		mongoTemplate.insert(convertToEntity(v));
	}

	/**
	 * 
	 * @param id
	 * @description 物理删除 
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月15日 上午10:06:05
	 */
	default void delete(ID id) {
		mongoTemplate.remove(idQuery(id), getEntityClass());
	}
	/**
	 * 
	 * @param v
	 * @description 保存
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月15日 上午10:05:53
	 */
	default void save(V v) {
		mongoTemplate.save(convertToEntity(v));
	}

	default Query idQuery(ID id) {
		return Query.query(Criteria.where(MONGO_ID).is(id));
	}
	
	/**
	 * 
	 * @return
	 * @description 获取Mongo中数据存在的基础Query 即dataStatus ds =1
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月15日 上午10:20:45
	 */
	default Query existQuery() {
		return Query.query(Criteria.where(MONGO_DATA_STATUS).is(MONGO_NORMAL_DATA));
	}


	/**
	 * 
	 * @param params
	 * @param pager
	 * @return
	 * @description 条件分页查询
	 * 
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 上午10:29:56
	 */
	default public List<V> findPagerByParams(MongoParams params, Pagination pager) {
		Query query = buildAndEqualQuery(params);
		if (pager != null) {
			query.skip((pager.getPageNo() - 1) * pager.getPageSize());
			query.limit(pager.getPageSize());
			if (pager.getSortBy() != null && !pager.getSortBy().isEmpty()) {
				query.with(new Sort(pager.getIsAsc() ? Direction.ASC : Direction.DESC, pager.getSortBy()));

			}
		}
		return convertToVOList(mongoTemplate.find(query, getEntityClass()));
	}

	/**
	 * 
	 * @param muParams
	 * @return
	 * @description 使用条件 获取记录条数
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 上午10:30:31
	 */
	default long count(MongoParams params) {
		return mongoTemplate.count(buildAndEqualQuery(params), getEntityClass());
	}

	/**
	 * 
	 * @param id
	 * @param muParams
	 * @return
	 * @description ID查询更新记录
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 上午10:30:46
	 */
	default int updateById(String id, MongoParams params) {
		try {
			Map<String, Object> paramsMap = JSONUtils.obj2map(params);
			if (paramsMap != null && !paramsMap.isEmpty()) {
				WriteResult re = mongoTemplate.updateFirst(
						query(where(ID).is(id)).addCriteria(where(MONGO_DATA_STATUS).is(1)), buildUpdate(paramsMap),
						getEntityClass());
				return re.getN();
			}
		} catch (Exception e) {
		}
		return 0;
	}

	/**
	 * 
	 * @param id
	 * @param t
	 * @return
	 * @description TODO
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月15日 上午9:50:42
	 */
	default int updateById(String id, V t) {
		try {
			Map<String, Object> paramsMap = JSONUtils.obj2map(t);
			if (paramsMap != null && !paramsMap.isEmpty()) {
				WriteResult re = mongoTemplate.updateFirst(
						query(where(ID).is(id)).addCriteria(where(MONGO_DATA_STATUS).is(1)), buildUpdate(paramsMap),
						getEntityClass());
				return re.getN();
			}
		} catch (Exception e) {
		}
		return 0;
	}

	/**
	 * 
	 * @param key
	 * @param value
	 * @return
	 * @description 通过Unique字段查询
	 * @version 1.0
	 * @author QinghaiDeng
	 * @update 2015年9月11日 上午11:05:50
	 */
	default V findUniqueOne(String key, Object value) {
		return convertToVO(mongoTemplate
				.findOne(query(where(key).is(value)).addCriteria(where(MONGO_DATA_STATUS).is(1)), getEntityClass()));
	}
	
	
	/**
	 * 在此处以上添加Mongo数据库基础操作方法
	 */
	//////////////////一下为MongoBase 工具方法/////////////////////////
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
