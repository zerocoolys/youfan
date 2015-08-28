package com.youfan.controllers.server;

import com.youfan.commons.vo.User;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.exceptions.UserException;
import com.youfan.services.server.UsersService;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import redis.clients.jedis.Jedis;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.concurrent.TimeUnit;

/**
 * Created by yousheng on 15/8/14.
 */
@RequestMapping("/auth")
public class TokenController {


    private static final String t = "t";


    private UsersService usersService;

    @Resource
    private Jedis jedis;

    @RequestMapping(method = RequestMethod.POST)
    public Response auth(@RequestParam String name, @RequestParam String password) {

        User user = null;

        try {
            user = usersService.validate(name, password);
        } catch (UserException ue) {
            return Responses.FAILED().setMsg(ue.getMessage());
        }


        if (user != null) {

            long time = Calendar.getInstance().getTimeInMillis();
            double r = Math.random() * 100000;
            String tmp = t + time + r;
            String token = DigestUtils.md5DigestAsHex(tmp.getBytes());

            jedis.setex(token, (int) TimeUnit.DAYS.toSeconds(1), user.getId());

            return Responses.SUCCESS().setPayload(token);
        }

        return Responses.FAILED();
    }
}
