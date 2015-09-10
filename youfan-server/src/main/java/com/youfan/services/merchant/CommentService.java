package com.youfan.services.merchant;

import java.util.List;
import java.util.Map;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.CommentVO;

/**
 * Created by xiaowei on 15-8-31.
 */
public interface CommentService {
    /**
     * 创建一个评论
     *
     * @param cm
     * @return
     */
    Integer createCm(CommentVO cm);

    /**
     * 查询评论(所有)
     *
     * @return
     */
    List<CommentVO> findComment();

    /**
     * 根据订单id查询一条评论
     *
     * @param orderId
     * @return
     */
    CommentVO findCommentById(long orderId);

    /**
     * 根据分页条件查询数据
     *
     * @param p
     * @return 分页对象
     */
    CollectionVO<CommentVO> findCommentByPager(Pagination p);

    long count(Map<String, Object> paramMap);

    public List<CommentVO> getPagerByCondition(Pagination pager);

    int deleteById(String id);

    long commentCount(String sellerId);
}
