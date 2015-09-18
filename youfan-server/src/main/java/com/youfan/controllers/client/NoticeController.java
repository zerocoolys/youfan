package com.youfan.controllers.client;

import com.youfan.commons.vo.client.MessageVO;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.client.MessageService;
import com.youfan.utils.JSONUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.AbstractView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by subdong on 15-8-27.
 */
@RestController
@RequestMapping(path = "/notice")
public class NoticeController {

    @Resource
    private MessageService messageService;

    @RequestMapping(value = "/getNotice/{userId}", method = RequestMethod.GET, produces = "application/json")
    public Response getNotice(@PathVariable String userId) {
        List<MessageVO> entities = messageService.findMsgList(userId, 2);
        return Responses.SUCCESS().setPayload(entities);
    }

    @RequestMapping(value = "/getCount/{userId}", method = RequestMethod.GET, produces = "application/json")
    public Response getCount(@PathVariable String userId) {
        Long entities = messageService.countUnreadMsg(userId, 2);
        return Responses.SUCCESS().setPayload(entities);
    }

    @RequestMapping(value = "/modifyMsg/{id}", method = RequestMethod.GET, produces = "application/json")
    public Response modifyMsg(@PathVariable String id) {
        boolean entities = messageService.updateMsg(id, 1);
        return Responses.SUCCESS().setPayload(entities);
    }

    @RequestMapping(value = "/delMsg/{id}", method = RequestMethod.GET, produces = "application/json")
    public void deleteMsg(@PathVariable String id) {
       messageService.delMsg(id);
    }

}
