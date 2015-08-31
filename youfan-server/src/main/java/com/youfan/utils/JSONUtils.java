package com.youfan.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map.Entry;

/**
 * Created on 2015-08-21.
 * <p>
 * JSON工具类.
 *
 * @author dolphineor
 */
public class JSONUtils {

	private static final String ROWS = "rows";

	private static ObjectMapper mapper = new ObjectMapper();

	static {
		mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				false);
		mapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
		mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
	}

	public static ObjectMapper getMapper() {
		return mapper;
	}

	public static Map<String, Object> getJsonMapData(Object o) {
		Map<String, Object> map = new HashMap<>();
		map.put(ROWS, getJsonObject(o));
		return map;
	}

	/**
	 * 获取JSON字符串
	 *
	 * @param o
	 * @return
	 */
	public static String getJsonString(Object o) {
		String jsonStr = null;

		try {
			jsonStr = mapper.writeValueAsString(o);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return jsonStr;
	}

	/**
	 * 获取JSON对象数组
	 *
	 * @param o
	 * @return
	 */
	public static ArrayNode getJsonObjectArray(Object o) {
		ArrayNode arrayNode = mapper.createArrayNode();
		try {
			JsonNode jsonNodes = mapper.readTree(mapper.writeValueAsBytes(o));
			for (JsonNode jn : jsonNodes) {
				arrayNode.add(jn);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return arrayNode;
	}

	/**
	 * 根据JSON字符串获取JSON对象
	 *
	 * @param content
	 * @return
	 */
	public static JsonNode getJsonObject(String content) {
		JsonNode jsonObj = null;
		try {
			jsonObj = mapper.readTree(content);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return jsonObj;
	}

	/**
	 * 获取JSON对象
	 *
	 * @param o
	 * @return
	 */
	public static JsonNode getJsonObject(Object o) {
		JsonNode jsonObj = null;
		try {
			jsonObj = mapper.readTree(mapper.writeValueAsBytes(o));
		} catch (IOException e) {
			e.printStackTrace();
		}

		return jsonObj;
	}

	/**
	 * 将JSON字符串转换为对应的Java Bean
	 *
	 * @param jsonStr
	 * @param _class
	 * @param <T>
	 * @return
	 */
	public static <T> T getObjectByJson(String jsonStr, Class<T> _class) {
		T t = null;
		try {
			t = mapper.readValue(jsonStr, _class);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return t;
	}

	/**
	 * 将JSON字符串转换成泛型List
	 *
	 * @param jsonStr
	 * @param _class
	 * @param <T>
	 * @return
	 */
	public static <T> List<T> getObjectListByJson(String jsonStr,
			Class<T> _class) {
		JavaType javaType = mapper.getTypeFactory().constructParametricType(
				ArrayList.class, _class);
		List<T> tList;
		try {
			tList = mapper.readValue(jsonStr, javaType);

			return tList;
		} catch (IOException e) {
			e.printStackTrace();
		}

		return Collections.emptyList();
	}

	/**
	 * 将JSON字符串转换成泛型Map
	 *
	 * @param jsonStr
	 * @param _class
	 * @param <T>
	 * @return
	 */
	public static <T> Map<String, T> getObjectMapByJson(String jsonStr,
			Class<T> _class) {
		JavaType javaType = mapper.getTypeFactory().constructParametricType(
				HashMap.class, String.class, _class);
		Map<String, T> tMap;
		try {
			tMap = mapper.readValue(jsonStr, javaType);

			return tMap;
		} catch (IOException e) {
			e.printStackTrace();
		}

		return Collections.emptyMap();
	}

	/**
	 * javaBean,list,array convert to json string
	 */
	public static String obj2json(Object obj) throws Exception {
		return mapper.writeValueAsString(obj);
	}

	/**
	 * json string convert to javaBean
	 */
	public static <T> T json2pojo(String jsonStr, Class<T> clazz)
			throws Exception {
		return mapper.readValue(jsonStr, clazz);
	}

	/**
	 * json string convert to map
	 */
	@SuppressWarnings("unchecked")
	public static <T> Map<String, Object> json2map(String jsonStr)
			throws Exception {
		return mapper.readValue(jsonStr, Map.class);
	}

	/**
	 * json string convert to map with javaBean
	 */
	public static <T> Map<String, T> json2map(String jsonStr, Class<T> clazz)
			throws Exception {
		Map<String, Map<String, Object>> map = mapper.readValue(jsonStr,
				new TypeReference<Map<String, T>>() {
				});
		Map<String, T> result = new HashMap<String, T>();
		for (Entry<String, Map<String, Object>> entry : map.entrySet()) {
			result.put(entry.getKey(), map2pojo(entry.getValue(), clazz));
		}
		return result;
	}

	/**
	 * json array string convert to list with javaBean
	 */
	public static <T> List<T> json2list(String jsonArrayStr, Class<T> clazz)
			throws Exception {
		List<Map<String, Object>> list = mapper.readValue(jsonArrayStr,
				new TypeReference<List<T>>() {
				});
		List<T> result = new ArrayList<T>();
		for (Map<String, Object> map : list) {
			result.add(map2pojo(map, clazz));
		}
		return result;
	}

	/**
	 * map convert to javaBean
	 */
	@SuppressWarnings("rawtypes")
	public static <T> T map2pojo(Map map, Class<T> clazz) {
		return mapper.convertValue(map, clazz);
	}
}
