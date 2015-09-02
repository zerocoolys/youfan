package com.youfan.commons;


/**
 * Created on 2015-08-18.
 *
 * @author dolphineor
 */
public interface Constants {

    // 优饭Mongo数据库名称
    String MONGO_YOUFAN = "youfan";

    // 存储菜品信息的集合名称
    String COLLECTION_MENU = "menu";
    // 存储客户端用户信息的集合名称
    String COLLECTION_CLIENT_USER = "client_user";
    //
    String COLLECTION_SERVER_COUPONS_TYPE = "coupons_type";

    /*通用*/
    String DATA_STATUS = "dataStatus";
    String FIELD_ID = "id";


    // 菜单
    String SELLER_ID = "sellerId";
    String MONGO_ID = "_id";
    String ID = "id";
    String TYPE = "type";
    String NAME = "name";
    String DESCRIPTION = "descr";
    String IS_SALE = "sale";
    String PIC_URLS = "picUrls";
    String PRICE = "price";
    String STOCK = "stock";
    String REST_NUM = "restNum";
    String TASTE_NUM = "tasteNum";
    String SALE = "sale";
    String TASTE = "taste";
    String STAPLE = "staple";
    String FEATURES = "features";

    /*评论*/
    String COMMENT_TIME = "ct";
    String COMMENT_USER = "cu";


    /*
        商家段字段与collection值
     */
    String COLLECTION_KITCHENINFO = "merchantKitchenInfo";
    String COLLECTION_USER = "merchantUser";
    String COLLECTION_MERCHANTKITCHENINFOID = "id";
    String COLLECTION_HEADPORTRAITPICURL = "hpu";
    String COLLECTION_IDCARDPICURL = "icpu";
    String COLLECTION_HEALTHCERTIFICATEPICURL = "hcpu";
    String COLLECTION_MERCHANTUSERID = "id";

    String COLLECTION_COMMENT = "comment";
    String COLLECTION_MESSAGE = "messages";
    String COLLECTION_COUPONS = "coupons";


    /*  我的消息 subDong  */
    // messages 查询字段
    String MESSAGE_ID = "id";
    String MESSAGE_RECEIVERID = "receiverId";
    String MESSAGE_RECEIVERPORT = "receiverPort";
    String MESSAGE_DATE = "date";
    String MESSAGE_STATUS = "status";


    /*  优惠卷 subDong  */
    String CONPONS_ID = "id";
    String COUPONS_STATUS = "status";
    String CONPONS_COUPONSID = "cid";
    String CONPONS_CREATEDATE = "cd";
    String CONPONS_MODIFYDATE = "md";
    String CONPONS_STATUS = "status";
    String CONPONS_DATASTATUS = "ds";
    String CONPONS_USERID = "userid";
    
    /* MrDeng*/
    //couponsType 查询字段
    
    String COUPONS_TYPE_PORT = "port";
    String COUPONS_TYPE_TIMELINE = "timeLine";
    String COUPONS_TYPE_KITCHEN_ID= "kitchenId";
    String COUPONS_TYPE_STATUS = "status";
}
