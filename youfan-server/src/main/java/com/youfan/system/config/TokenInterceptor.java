package com.youfan.system.config;

import com.youfan.exceptions.AuthenticationFailedException;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import redis.clients.jedis.Jedis;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by yousheng on 15/8/14.
 */
@Component
public class TokenInterceptor implements HandlerInterceptor {

    private Set<String> securiteUrl = new HashSet<>();

    private AntPathMatcher urlMatcher;

    private final String TOKEN_PREFIX = "access_token:";

    private int DAY_SECONDS = 86_400;

    @Resource
    private Jedis jedis;

    public TokenInterceptor() {
        init();
    }

    private void init() {
        urlMatcher = new AntPathMatcher();
        urlMatcher.setCaseSensitive(false);
        urlMatcher.setCachePatterns(true);
        urlMatcher.setTrimTokens(true);

        securiteUrl.add("/users");
        securiteUrl.add("/orders");
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String current = request.getRequestURI();
        String token = request.getParameter("access_token");
        if (StringUtils.isEmpty(token)) {
            boolean match = securiteUrl.stream().anyMatch((url) -> {
                return urlMatcher.matchStart(url, current);
            });

            if (match) {

                request.setAttribute("javax.servlet.error.status_code", 1);

                throw new AuthenticationFailedException("missing token");
            }

            return true;

        } else {
            if (token.length() != 32) {
                throw new AuthenticationFailedException("token invalid");
            }

            boolean exists = jedis.exists(TOKEN_PREFIX + token);
            if (exists) {
                jedis.expire(TOKEN_PREFIX + token, DAY_SECONDS);
                return true;
            }
        }

        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
