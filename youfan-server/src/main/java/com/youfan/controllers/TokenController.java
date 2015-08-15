package com.youfan.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;

/**
 * Created by yousheng on 15/8/14.
 */
@RequestMapping("/auth")
public class TokenController {

    @RequestMapping(method = RequestMethod.POST)
    public String auth(@RequestParam String name, @RequestParam String password) {




        return null;
    }
}
