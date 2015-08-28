package com.youfan.data.models;

import com.youfan.commons.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

/**
 * Created by xiaowei on 15-8-27.
 */
@Document(collection = Constants.COLLECTION_COMMENT)
public class CommentEntity {
    
    @Id
    String id;

    String cUser;

    String pid;//父评论

    String content;

    @Field("ct")
    Date commentTime;




    Integer dataStatus = 0;
}
