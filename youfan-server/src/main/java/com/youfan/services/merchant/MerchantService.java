package com.youfan.services.merchant;

import java.util.List;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.controllers.params.MongoParams;

public interface MerchantService {

	List<MerchantUserVO> getPagerByParams(MongoParams params,Pagination pager);
}
