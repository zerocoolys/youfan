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


    // 菜单
    String SELLER_ID = "sellerId";
    String MENU_ID = "menuId";
    String TYPE = "type";
	String NAME = "name";
	String DESCRIPTION = "descr";
	String IS_SALE = "sale";
	String PIC_URLS = "picUrls";
	String PRICE = "price";
	String STOCK = "stock";
	String REST_NUM = "restNum";
	String TASTE_NUM = "tasteNum";
	String DATA_STATUS = "dataStatus";
	String SALE = "sale";
	String TASTE = "taste";
	String STAPLE = "staple";
	String FEATURES = "features";


	/* web response status by XiaoWei */
    String WEB_DATA = "data";
    String WEB_STATUS = "status";

	String COLLECTION_KITCHENINFO = "merchantKitchenInfo";
	String COLLECTION_USER = "merchantUser";
    String COLLECTION_COMMENT = "comment";
    String COLLECTION_MESSAGE = "messages";


    /*  subDong  */
    // messages 查询字段
    String MESSAGE_RECEIVERID = "receiverId";
    String MESSAGE_RECEIVERPORT = "receiverPort";
    String MESSAGE_DATE = "date";
    String MESSAGE_STATUS = "status";
    String MESSAGE_ID = "id";
}
