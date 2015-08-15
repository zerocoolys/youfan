package com.youfan.services.commons;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by yousheng on 15/8/14.
 */
public class OrderNoGenerator {
    public static final String DECIMAL_FORMAT = "00000";

    public static final String DATE_FORMAT = "yyyyMMdd";

    public static String orderNo(long no) {
        String date = new SimpleDateFormat(DATE_FORMAT).format(new Date());
        String seq = new DecimalFormat(DECIMAL_FORMAT).format(no);
        return "YF" + date + seq;
    }

    public static void main(String[] args) {
        System.out.println("orderNo(300) = " + orderNo(300));
    }
}
