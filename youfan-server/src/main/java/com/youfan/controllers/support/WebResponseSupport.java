package com.youfan.controllers.support;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.AbstractView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by xiaowei on 15-8-25.
 */
@Repository
public class WebResponseSupport implements WebResponse {
    @Override
    public ModelAndView write(String key, Object o) {
        AbstractView view = new MappingJackson2JsonView();
        Map<String, Object> objectMap = new HashMap<String, Object>();
        objectMap.put(key, o);
        view.setAttributesMap(objectMap);
        return new ModelAndView(view);
    }
}
