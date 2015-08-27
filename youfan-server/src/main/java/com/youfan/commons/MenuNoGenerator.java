package com.youfan.commons;

import java.text.DecimalFormat;
import java.util.UUID;

/**
 * Created on 2015-08-25.
 * <p>菜品序列号生成器.
 *
 * @author dolphineor
 */
public class MenuNoGenerator {
    protected static final DecimalFormat DECIMAL_FORMAT = new DecimalFormat("00000000");

    public static long menuNo(long no) {
        UUID uuid = UUID.randomUUID();
        String str = "" + uuid;
        int _id = str.hashCode();
        int offset = Integer.parseInt(DECIMAL_FORMAT.format(no));

        long seq = Long.parseLong(("" + _id).replaceAll("-", ""));

        return seq + offset;
    }

}
