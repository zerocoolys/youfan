package com.youfan.controllers.client;

import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.controllers.params.ClientUserParams;
import com.youfan.controllers.params.LocalStorage;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.client.ClientUserService;
import com.youfan.services.server.ActiveSupportService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import redis.clients.jedis.Jedis;

/**
 * 客户端用户登陆控制器 Created by yousheng on 15/8/14.
 */
@RestController
@RequestMapping("/client")
public class LoginController {

    Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Resource
    private ClientUserService ucService;

    @Resource
    private Jedis jedis;

    @Resource
    ActiveSupportService activeSupportService;

    private static final String t = "ct";

    /**
     * 用户注册
     *
     * @param uc
     * @return
     */
    @RequestMapping(method = RequestMethod.POST, path = "/register", produces = "application/json")
    public Response register(@RequestBody ClientUserVO uc) {

        Response response = null;
        ClientUserVO userVO = new ClientUserVO();

        // 设置日期格式
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String tel = uc.getTel();

        userVO.setTel(tel);
        userVO.setPassword(uc.getPassword());
        userVO.setName("优饭" + tel.substring(tel.length() - 4, tel.length()));
        userVO.setSex("待完善");
        userVO.setAge("待完善");
        userVO.setJobs("待完善");
        userVO.setRegisterDate(df.format(new Date()));

        try {
            if (ucService.getUserByTel(tel).getTel() != null) {
                response = Responses.FAILED();
            } else {
                ucService.insert(userVO);
                response = Responses.SUCCESS();
//                /////////////// MrDeng添加活动参加功能 请此处完善代码时
//                /////////////// 把这段代码移动到成功注册判定下/////////////////////////
//                Map<String, Object> paramsMap = new HashMap<>();
//                paramsMap.put("userVO", userVO);
//                try {
//                    activeSupportService.joinActive(ACTIVE_TYPE.CLIENT_REGISTER, "client_register", paramsMap);
//                } catch (ServerNoActiveDetailClazzException e1) {
//                    System.out.println("不存在[client_register]对应活动的处理方式 写入日志");
//                    logger.error("不存在[client_register]对应活动的处理方式 写入日志");
//                } catch (ServerNoActiveEventException e1) {
//                    System.out.println("不存在[client_register]对应活动");
//                }
//                ////////////////////////////////////////////////////////////
            }
        } catch (Exception e) {
            response = Responses.FAILED();
            logger.error(e.getMessage());
        }

        return response;
    }

    /**
     * 用户登陆
     */
    @RequestMapping(method = RequestMethod.POST, path = "/login", produces = "application/json")
    public Response login(@RequestBody ClientUserVO ucVO) {

        ClientUserVO userClientVO = new ClientUserVO();


        try {
            userClientVO = ucService.findUserByTelAndPwd(ucVO.getTel(), ucVO.getPassword());
            System.out.println(userClientVO);

//			/////////////// MrDeng添加活动参加功能 请此处完善代码时
//			/////////////// 把这段代码移动到成功登录判定下/////////////////////////
//			Map<String, Object> paramsMap = new HashMap<>();
//			paramsMap.put("userVO", userClientVO);
//			try {
//				activeSupportService.joinActive(ACTIVE_TYPE.CLIENT_LOGIN, "client_login", paramsMap);
//			} catch (ServerNoActiveDetailClazzException e1) {
//				System.out.println("不存在[client_register]对应活动的处理方式 写入日志");
//				logger.error("不存在[client_register]对应活动的处理方式 写入日志");
//			} catch (ServerNoActiveEventException e1) {
//				System.out.println("不存在[client_register]对应活动");
//			}
//			////////////////////////////////////////////////////////////

        } catch (Exception e) {
            logger.error(e.getMessage());
            //未找到用户
            return Responses.FAILED().setMsg(e.getMessage()).setCode(2);
        }

        if (userClientVO != null) {
            long time = Calendar.getInstance().getTimeInMillis();
            double r = Math.random() * 100000;
            String tmp = t + time + r;
            String token = DigestUtils.md5DigestAsHex(tmp.getBytes());
            jedis.setex(token, (int) TimeUnit.DAYS.toSeconds(1), userClientVO.getId());

            LocalStorage p = new LocalStorage();
            p.setToken(token);
            p.setClientUserVO(userClientVO);
            //登陆成功
            return Responses.SUCCESS().setPayload(p);
        } else {
            //未登录
            return Responses.FAILED();
        }
    }

    /**
     * 用户注销
     */
    @RequestMapping(method = RequestMethod.POST, path = "/logout", produces = "application/json")
    public Response logout(HttpServletRequest request) {

        String token = request.getHeader("Authorization");

        if (token != null) {
            jedis.del(token);
            return Responses.SUCCESS();
        } else {
            return Responses.FAILED();
        }
    }
}
