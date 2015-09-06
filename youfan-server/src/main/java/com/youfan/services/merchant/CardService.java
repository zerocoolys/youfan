package com.youfan.services.merchant;

import java.util.List;

import com.youfan.commons.Constants;
import com.youfan.commons.vo.merchant.CardVO;

public interface CardService extends Constants {
    void insert(CardVO card);

    CardVO findOne(String id);

    List<CardVO> list(String sellerId);

    void update(CardVO card);
}
