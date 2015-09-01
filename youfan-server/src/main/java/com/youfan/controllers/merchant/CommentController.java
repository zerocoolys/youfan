package com.youfan.controllers.merchant;

import com.youfan.commons.vo.CommentVO;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.merchant.CommentService;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by xiaowei on 15-8-31.
 */
@RestController
@Scope("prototype")
@RequestMapping("/cm")
public class CommentController {
    @Resource
    private CommentService commentService;

    @RequestMapping(value = "/save")
    public Response createComment(@RequestBody CommentVO cm) {
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
}
