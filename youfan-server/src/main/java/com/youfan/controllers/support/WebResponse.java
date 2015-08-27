package com.youfan.controllers.support;

import org.springframework.web.servlet.ModelAndView;

/**
 * Created by xiaowei on 15-8-25.
 */
public interface WebResponse {
    ModelAndView write(String key, Object o);
}
