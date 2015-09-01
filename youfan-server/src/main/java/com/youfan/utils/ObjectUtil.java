package com.youfan.utils;

import java.lang.reflect.Array;
import java.util.Collection;
import java.util.Map;

/**
 * Created by icepros on 15-8-31.
 */
public class ObjectUtil {

    public static boolean isEmpty(Object obj){
        if(obj == null){
            return true ;
        }

        if(obj.getClass().isArray()){
            if(Array.getLength(obj) == 0){
                return true ;
            }
        }

        if(obj instanceof Collection<?>){
            Collection<?> collection = ( Collection<?>) obj ;
            if(collection.isEmpty()){
                return true ;
            }
        }

        if(obj instanceof Map<?,?>){
            Map<?,?> map = ( Map<?,?> ) obj ;
            if(map.isEmpty()){
                return true ;
            }
        }

        return false ;
    }

    public static boolean isNotEmpty(Object obj){
        return !isEmpty(obj);
    }
}
