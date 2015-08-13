package com.youfan.data.mappers;

import com.youfan.data.models.OrderEntity;
import org.springframework.data.repository.query.Param;

/**
 * Created by yousheng on 15/8/13.
 */
public interface OrderMapper {


    public OrderEntity get(@Param("orderId") String orderId);
}
