package com.youfan.utils;

import org.apache.commons.configuration.CompositeConfiguration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;

/**
 * @author ZhangHuaRong
 * @title ConfigUtil.java
 * @package com.youfan.utils
 * @description 读取配置文件工具类
 * @update 2015年8月19日 下午2:22:05
 */
public class ConfigUtil {
    private static CompositeConfiguration config = new CompositeConfiguration();

    static {
        try {
            config.addConfiguration(new PropertiesConfiguration("platform.properties"));
        } catch (ConfigurationException e) {
            e.printStackTrace();
        }
    }

    public static String getString(String key) {
        return config.getString(key);
    }

    public static void main(String[] args) {
        System.out.println(ConfigUtil.getString("systemUser"));
    }

}
