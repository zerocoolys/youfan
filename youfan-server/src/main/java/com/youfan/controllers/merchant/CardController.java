package com.youfan.controllers.merchant;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.youfan.commons.vo.merchant.CardVO;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.services.merchant.CardService;

@RestController
@Scope("prototype")
@RequestMapping("/cards")
public class CardController {

    @Resource
    private CardService cardService;

    @RequestMapping(path = "", method = RequestMethod.GET, produces = "application/json")
    public Response list(@RequestParam(required = false) String sellerId) {
        List<CardVO> cardList = cardService.list(sellerId);
        return Responses.SUCCESS().setPayload(cardList);
    }

    @RequestMapping(path = "/{cardId}", method = RequestMethod.GET, produces = "application/json")
    public Response findCard(@PathVariable String cardId) {
        CardVO card = cardService.findOne(cardId);
        return Responses.SUCCESS().setPayload(card);
    }

    @RequestMapping(path = "", method = RequestMethod.POST, produces = "application/json")
    public void add(@RequestBody CardVO card) {
        cardService.insert(card);
    }
    
    @RequestMapping(path = "/renewal", method = RequestMethod.POST, produces = "application/json")
    public void update(@RequestBody CardVO card) {
        cardService.update(card);
    }

}
