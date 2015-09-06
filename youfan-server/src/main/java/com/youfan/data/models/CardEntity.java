package com.youfan.data.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import static com.youfan.commons.Constants.COLLECTION_CARD;
import static com.youfan.commons.Constants.BANK_NAME;
import static com.youfan.commons.Constants.AREA_NAME;
import static com.youfan.commons.Constants.CARD_NAME;
import static com.youfan.commons.Constants.CARD_NUMBER;
import static com.youfan.commons.Constants.IDENTITY_NAME;
import static com.youfan.commons.Constants.IDENTITY_NUMBER;

/**
 * Created on 2015-09-01.
 * 
 * @author hydm
 *
 */
@Document(collection = COLLECTION_CARD)
public class CardEntity {

    @Id
    private String id;

    private String sellerId; // 商家id

    @Field(BANK_NAME)
    private String bankName;// 银行名称"

    @Field(AREA_NAME)
    private String areaName;// 银行所在地

    @Field(CARD_NAME)
    private String cardName;// 开户行

    @Field(CARD_NUMBER)
    private String cardNumber;// 银行卡卡号

    @Field(IDENTITY_NAME)
    private String identityName;// 姓名

    @Field(IDENTITY_NUMBER)
    private String identityNumber;// 证件号码
    
    private Integer dataStatus = 1;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getIdentityName() {
        return identityName;
    }

    public void setIdentityName(String identityName) {
        this.identityName = identityName;
    }

    public String getIdentityNumber() {
        return identityNumber;
    }

    public void setIdentityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
    }

    public Integer getDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(Integer dataStatus) {
        this.dataStatus = dataStatus;
    }

}
