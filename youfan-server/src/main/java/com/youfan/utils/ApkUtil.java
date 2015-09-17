package com.youfan.utils;

import java.io.File;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import com.youfan.utils.apk.AXmlResourceParser;
import com.youfan.utils.apk.XmlPullParser;
/**
 * 
 * @description 解析apk包获取版本信息
 * @author ZhangHuaRong   
 * @update 2015年9月17日 上午11:10:07
 */
public class ApkUtil {
	
	public static void main(String[] args) {
		String path = "I:\\youfan-shop\\youfan\\youfan-merchant\\platforms\\android\\build\\outputs\\apk\\shop123.apk";
		String version = apk(path);
		System.out.println(version);
		
		
	}
	
	/**
	 * 
	 * @param apkUrl apk文件路径
	 * @author ZhangHuaRong
	 * @update 2015年9月17日 上午11:10:43
	 */
	public static String apk(String apkUrl) {
		String version = null;
		ZipFile zipFile;
		try {
			zipFile = new ZipFile(new File(apkUrl));
			ZipEntry zipEntry = zipFile.getEntry(("AndroidManifest.xml"));
				AXmlResourceParser parser = new AXmlResourceParser();
				parser.open(zipFile.getInputStream(zipEntry));
				boolean flag = true;
				while (flag) {
					int type = parser.next();
					if (type == XmlPullParser.START_TAG) {
						int count = parser.getAttributeCount();
						for (int i = 0; i < count; i++) {
							String name = parser.getAttributeName(i);
							String value = parser.getAttributeValue(i);
							if (value.contains("MAIN")) {
								flag = false;
								break;
							}else if("versionName".equalsIgnoreCase(name)){
								version = value;
								flag = false;
								break;
						   }
						}
					}
				}	
		} catch (Exception e) {
			
		}
		return version;
	}


}
