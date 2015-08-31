package com.youfan.controllers.server;

import com.cloopen.rest.sdk.CCPRestSmsSDK;
import com.pingplusplus.Pingpp;
import com.pingplusplus.exception.APIConnectionException;
import com.pingplusplus.exception.APIException;
import com.pingplusplus.exception.AuthenticationException;
import com.pingplusplus.exception.InvalidRequestException;
import com.pingplusplus.model.*;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.client.MessageVO;
import com.youfan.controllers.params.ChargeParams;
import com.youfan.log.WebbooksLog;
import com.youfan.services.client.MessageService;
import com.youfan.utils.CipherUtil;
import com.youfan.utils.ConfigUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * Created by zhanghr on 15/8/17.
 */
@RestController
@RequestMapping(path = "/platform")
public class PlatFormController {

    @Resource
    private MessageService messageService;


    public static Map<String, String> usermap = new HashMap<String, String>();// 测试用
    Logger logger = LoggerFactory.getLogger(PlatFormController.class);

    static {
        usermap.put("admin", "E10ADC3949BA59ABBE56E057F20F883E");
        usermap.put("test", "098F6BCD4621D373CADE4E832627B4F6");
    }

    /**
     * @param name
     * @param password
     * @description 运营平台登录验证
     * @author ZhangHuaRong
     */
    @RequestMapping(method = RequestMethod.GET, path = "/{name}/{password}")
    public boolean list(@PathVariable String name, @PathVariable String password) {
        logger.info("登录一次");
        WebbooksLog.recordWebbooks(name + "支付成功");
        CipherUtil cipher = new CipherUtil();
        boolean flag = cipher.validatePassword(usermap.get(name), password);
        return flag;
    }

    /**
     * @param time
     * @param context
     * @param plones
     * @description 发送短信验证码接口
     * @author ZhangHuaRong
     */

    @RequestMapping(method = RequestMethod.GET, path = "/sendSMS/{time}/{context}/{plones}")
    public HashMap<String, Object> sendSms(@PathVariable String time, @PathVariable String context,
                                           @PathVariable String plones) {
        HashMap<String, Object> result = null;
        CCPRestSmsSDK restAPI = new CCPRestSmsSDK();
        restAPI.init(ConfigUtil.getString("serverIp"), ConfigUtil.getString("serverHost"));
        restAPI.setAccount(ConfigUtil.getString("accountSid"), ConfigUtil.getString("accountToken"));
        restAPI.setAppId(ConfigUtil.getString("appId"));
        result = restAPI.sendTemplateSMS(plones, ConfigUtil.getString("templateId"), new String[]{context, time});
        System.out.println("SDKTestGetSubAccounts result=" + result);
        if ("000000".equals(result.get("statusCode"))) {
            // 正常返回输出data包体信息（map）
            HashMap<String, Object> data = (HashMap<String, Object>) result.get("data");
            Set<String> keySet = data.keySet();
            for (String key : keySet) {
                Object object = data.get(key);
                logger.info(key + " = " + object);
            }
        } else {
            // 异常返回输出错误码和错误信息
            logger.info("错误码=" + result.get("statusCode") + " 错误信息= " + result.get("statusMsg"));
        }
        return result;
    }

    /**
     * @param chargeParams
     * @description ping++付款接口 参数的具体含义见
     * https://pingxx.com/document/api#api-c-new
     * @author ZhangHuaRong
     */
    @RequestMapping(method = RequestMethod.POST, path = "/pay")
    public Charge pay(@RequestBody ChargeParams chargeParams) {
        Charge charge = null;
        Pingpp.apiKey = ConfigUtil.getString("pingkey");
        try {

            Map<String, String> app = new HashMap<>();
            /*app.put("id", ConfigUtil.getString("pingAppid"));*/
            Map<String, Object> params = new HashMap<>();
            params.put("app", app);
            //pingAppid=app_jbPKiHirbDiDOKyb
            app.put("id", "app_n5WTyHyTiPGOTuXz");

            Map<String, String> extraMap = new HashMap<>();
            //extra的参数根据文档: https://pingxx.com/document/api#api-c-new
            extraMap.put("success_url", "http://07zhywjh.6655.la:19982/platform/success");

//            params.put("extra", extraMap);
            params.put("order_no", "1234567989");
            params.put("amount", chargeParams.getAmount());
            params.put("channel", chargeParams.getChannel());
            params.put("currency", chargeParams.getCurrency());
            params.put("client_ip", "127.0.0.1");
            params.put("subject", chargeParams.getSubject());
            params.put("body", chargeParams.getBody());
            charge = Charge.create(params);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        return charge;
    }

    /**
     * @param request
     * @param response
     * @description 支付平台事件监听 包括（支付成功，退款成功，日汇总，周汇总，月汇总等）
     * @author ZhangHuaRong
     */
    @RequestMapping(method = RequestMethod.POST, path = "/webhooks")
    public String webhooks(HttpServletRequest request, HttpServletResponse response) {
        String result = null;
        try {
            request.setCharacterEncoding("UTF8");
            // 获取头部所有信息
            Enumeration headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String key = (String) headerNames.nextElement();
                String value = request.getHeader(key);
                System.out.println(key + " " + value);
            }

            // 获得 http body 内容
            BufferedReader reader = request.getReader();
            StringBuffer buffer = new StringBuffer();
            String string;
            while ((string = reader.readLine()) != null) {
                buffer.append(string);
            }
            reader.close();
            // 解析异步通知数据
            Event event = Webhooks.eventParse(buffer.toString());
            if ("charge.succeeded".equals(event.getType())) {
                response.setStatus(200);
            } else if ("refund.succeeded".equals(event.getType())) {
                response.setStatus(200);
            } else {
                response.setStatus(500);
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        WebbooksLog.recordWebbooks("");
        return "200";
    }

    /**
     * @param request
     * @param response
     * @description 退款
     * @author ZhangHuaRong
     */
    @RequestMapping(method = RequestMethod.POST, path = "/refund")
    public Refund refund(HttpServletRequest request, HttpServletResponse response) {
        Refund re = null;
        try {
            String amount = request.getParameter("amount");
            String description = request.getParameter("description");
            String ch_id = request.getParameter("ch_id");
            Charge ch = Charge.retrieve(ch_id);

            Map<String, Object> refundMap = new HashMap<String, Object>();
            refundMap.put("amount", Integer.parseInt(amount));
            refundMap.put("description", description);
            re = ch.getRefunds().create(refundMap);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return re;
    }

    /**
     * @return
     * @description 查询单笔交易
     * @author ZhangHuaRong
     */
    public Charge searchCharge(@PathVariable String id) {
        Charge ch = null;
        try {
            ch = Charge.retrieve(id);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return ch;
    }

    /**
     * @return
     * @description 查询交易列表
     * @author ZhangHuaRong
     */
    public ChargeCollection searchCharges(@PathVariable Integer limit) {
        ChargeCollection collection = null;
        try {
            Map chargeParams = new HashMap<String, Object>();
            chargeParams.put("limit", limit);
            collection = Charge.all(chargeParams);

        } catch (AuthenticationException e) {
            e.printStackTrace();
        } catch (InvalidRequestException e) {
            e.printStackTrace();
        } catch (APIConnectionException e) {
            e.printStackTrace();
        } catch (APIException e) {
            e.printStackTrace();
        }

        return collection;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/success")
    public String seccuss(HttpServletRequest request, HttpServletResponse response) {

        return "200";
    }

    /**
     * @param userId
     * @param pageNo
     * @param pageSize
     * @param status
     * @return
     * @description 获取消息
     * @author ZhangHuaRong
     */
    @RequestMapping(method = RequestMethod.GET, path = "/getMessage/{userId}/{pageNo}/{pageSize}/{status}", produces = "application/json; charset=UTF-8")
    public CollectionVO<MessageVO> getMessage(@PathVariable Long userId, @PathVariable Integer pageNo, @PathVariable Integer pageSize, @PathVariable Integer status) {
        CollectionVO<MessageVO> result = null;
        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("receiverId").is(userId));
            query.addCriteria(Criteria.where("status").is(status));
            long count = messageService.count(query);
            query.skip((pageNo - 1) * pageSize);
            query.limit(pageSize);
            List<MessageVO> msa = messageService.find(query);
            result = new CollectionVO<MessageVO>(msa, (int) count, pageSize);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return result;
    }

    /**
     * @param messageId
     * @description 获取用户消息
     * @author ZhangHuaRong
     * @update 2015年8月26日 下午4:47:26
     */
    @RequestMapping(method = RequestMethod.GET, path = "/getMessageById/{messageId}", produces = "application/json; charset=UTF-8")
    public MessageVO getMessageById(@PathVariable String messageId) {
        MessageVO msa = null;
        try {
            msa = messageService.findById(messageId);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return msa;
    }

    /**
     * @param messageId
     * @param status
     * @description 更新用户消息
     * @author ZhangHuaRong
     */
    @RequestMapping(method = RequestMethod.GET, path = "/updateMssageStatus/{messageId}/{status}", produces = "application/json; charset=UTF-8")
    public MessageVO updateMssageStatus(@PathVariable String messageId, @PathVariable Integer status) {
        MessageVO msa = null;
        try {
            msa = messageService.findById(messageId);
            messageService.updateMsg(msa.getId(), status);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return msa;
    }

    /**
     * @param userId   用户id
     * @param userPort 2用户端， 3商家端
     * @param date     内容
     * @param title    标题
     * @param des      摘要
     * @param code     消息类型
     * @description 发送消息
     * @author ZhangHuaRong
     */
    @RequestMapping(method = RequestMethod.GET, path = "/pushNice/{userId}/{userPort}/{date}/{title}/{des}/{code}", produces = "application/json; charset=UTF-8")
    public int pushNice(@PathVariable Long userId, @PathVariable Integer userPort, @PathVariable String date, @PathVariable String title, @PathVariable String des, @PathVariable Integer code) {
        int result = 0;
        try {
            MessageVO ms = new MessageVO(0, userId, userPort, date, code, title, des);
            messageService.insert(ms);
            result = ms.sendMsg();

        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return result;
    }
}
