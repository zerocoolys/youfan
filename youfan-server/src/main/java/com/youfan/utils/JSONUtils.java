package com.youfan.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created on 2015-08-21.
 * <p>JSON工具类.
 *
 * @author dolphineor
 */
public class JSONUtils {

    private static final String ROWS = "rows";

    private static ObjectMapper mapper = new ObjectMapper();


    static {
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
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
    public static <T> List<T> getObjectListByJson(String jsonStr, Class<T> _class) {
        JavaType javaType = mapper.getTypeFactory().constructParametricType(ArrayList.class, _class);
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
    public static <T> Map<String, T> getObjectMapByJson(String jsonStr, Class<T> _class) {
        JavaType javaType = mapper.getTypeFactory().constructParametricType(HashMap.class, String.class, _class);
        Map<String, T> tMap;
        try {
            tMap = mapper.readValue(jsonStr, javaType);

            return tMap;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return Collections.emptyMap();
    }
}
