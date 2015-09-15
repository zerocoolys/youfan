package com.youfan.controllers.client;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.CommentVO;
import com.youfan.commons.vo.client.ClientUserVO;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.client.ClientUserService;
import com.youfan.services.merchant.CommentService;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xiaowei on 15-8-31.
 */
@RestController
@Scope("prototype")
@RequestMapping("/cm")
public class CommentController {
    @Resource
    private CommentService commentService;

    @Resource
    private ClientUserService clientUserService;


    @RequestMapping(value = "/save")
    public Response createComment(@RequestBody CommentVO cm) {
        ClientUserVO commentUser = clientUserService.findById(cm.getComment_user());
        if (commentUser != null)
            cm.setComment_user(commentUser.getName());

        Integer result = commentService.createCm(cm);
        if (result != 0) {
            return Responses.SUCCESS();
        } else {
            return Responses.FAILED();
        }
    }

    @RequestMapping(value = "/findComment")
    public Response findComment() {
        List<CommentVO> findResult = commentService.findComment();
        if (findResult.size() > 0) {
            return Responses.SUCCESS().setPayload(findResult);
        } else {
            return Responses.FAILED().setMsg("No Data Found");
        }
    }

    @RequestMapping(value = "/getComment")
    public Response getComment(Integer orderId) {
        CommentVO cv = commentService.findCommentById(orderId);
        return Responses.SUCCESS().setPayload(cv);
    }

    @RequestMapping(value = "/getCommentPager")
    public Response getComment(@RequestBody Pagination pagination) {
        CollectionVO<CommentVO> p = commentService.findCommentByPager(pagination);
        return Responses.SUCCESS().setPayload(p);
    }

    @RequestMapping(value = "/replayComment")
    public Response replayComment(@RequestParam(value = "cid") String cid, @RequestParam(value = "content") String content) {
        Integer result = commentService.replayComment(cid, content);
        return result == 1 ? Responses.SUCCESS().setCode(0) : Responses.SUCCESS().setCode(1);
    }
}
