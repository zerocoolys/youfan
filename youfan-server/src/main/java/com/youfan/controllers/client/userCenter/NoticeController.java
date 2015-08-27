package com.youfan.controllers.client.userCenter;

import com.youfan.controllers.objs.Message;
import com.youfan.data.models.MessageEntity;
import com.youfan.services.menus.MessageService;
import com.youfan.utils.JSONUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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


    @RequestMapping(value = "/getNotice", method = RequestMethod.GET)
    public ModelAndView getNotice(HttpServletResponse response, HttpServletRequest request,
                                       @RequestParam(value = "userId", required = false) Long userId) {
        AbstractView jsonView = new MappingJackson2JsonView();
        List<Message> entities = messageService.findMsgList(userId, 2);
        Map<String, Object> attributes = JSONUtils.getJsonMapData(entities);
        jsonView.setAttributesMap(attributes);
        return new ModelAndView(jsonView);
    }

    @RequestMapping(value = "/getCount", method = RequestMethod.GET)
    public ModelAndView getCount(HttpServletResponse response, HttpServletRequest request,
                                       @RequestParam(value = "userId", required = false) Long userId) {
        AbstractView jsonView = new MappingJackson2JsonView();
        Long entities = messageService.countUnreadMsg(userId, 2);
        Map<String, Object> attributes = JSONUtils.getJsonMapData(entities);
        jsonView.setAttributesMap(attributes);
        return new ModelAndView(jsonView);
    }

    @RequestMapping(value = "/modifyMsg", method = RequestMethod.GET)
    public ModelAndView modifyMsg(HttpServletResponse response, HttpServletRequest request,
                                 @RequestParam(value = "id", required = false) String id) {
        AbstractView jsonView = new MappingJackson2JsonView();
        boolean entities = messageService.updateMsg(id,1);
        Map<String, Object> attributes = JSONUtils.getJsonMapData(entities);
        jsonView.setAttributesMap(attributes);
        return new ModelAndView(jsonView);
    }


}
