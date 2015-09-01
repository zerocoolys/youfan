package com.youfan.utils;

import java.io.File;

import org.apache.commons.mail.EmailAttachment;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.commons.mail.MultiPartEmail;
import org.apache.commons.mail.SimpleEmail;
/**
 * 
 * @description 发送邮件工具类
 * @author ZhangHuaRong   
 * @update 2015年8月31日 上午10:34:03
 */
public class MailUtil {
	
	private static final String hostName;
	
	private static final String userName;
	
	private static final String passWord;
	
	static{
		hostName =  ConfigUtil.getString("mail.hostName");
		userName =  ConfigUtil.getString("mail.userName");
		passWord =  ConfigUtil.getString("mail.passWord");
	}
	
	/**
	 * 
	 * @param from
	 * @param username
	 * @param to
	 * @param sendUser
	 * @param subject  邮件主题
	 * @param msg   邮件内容
	 * @param des   附件的描述
	 * @param files  附件
	 * @description 发送带附件的邮件
	 * @author ZhangHuaRong
	 */
	public static String sendMultiPartEmail(String from,String username,String to,String sendUser,String subject,String msg,String des,File... files){
		 MultiPartEmail email = new MultiPartEmail();
		 String result = null;
		 try {
			 email.setHostName(hostName);
			 email.setAuthentication(userName, passWord);
			 email.setCharset("UTF-8"); 
			 email.addTo(to, username); 
			 email.setFrom(from, sendUser);
			 email.setSubject(subject);
			 email.setMsg(msg);//设置邮件内容  
			 if(files!=null){
				 for(File file : files){
					 EmailAttachment attachment = new EmailAttachment();  
					 attachment.setPath(file.getPath());  
			         attachment.setName(file.getName());  
			         attachment.setDescription(des);  
			         attachment.setDisposition(EmailAttachment.ATTACHMENT);//附件的类型  
			         email.attach(attachment);  
				 }
			 }
			 
			 email.send();  
			 result = "ok";
		} catch (EmailException e) {
			result = "fail";
		}
		 return result;
	}
	/**
	 * 
	 * @param from
	 * @param sendUser
	 * @param to
	 * @param username
	 * @param subject
	 * @param msg
	 * @description 发送普通的邮件
	 * @author ZhangHuaRong
	 */
	public static String sendSimpleEmail(String from,String sendUser,String to,String username,String subject,String msg){
		SimpleEmail email = new SimpleEmail();
		String result = null;
		 try {
			 email.setHostName(hostName);
			 email.addTo(to, username); 
			 email.setFrom(from, sendUser);
			 email.setAuthentication(userName, passWord);
			 email.setCharset("UTF-8"); 
			 email.setSubject(subject);
			 email.setMsg(msg);//设置邮件内容  
			 email.send();  
			 result = "ok";
		} catch (EmailException e) {
			result = "fail";
		}
		
		return result;
	}
	/**
	 * 
	 * @param url 重置密码的链接，或者其它活动的链接
	 * @param from
	 * @param sendUser
	 * @param to
	 * @param username
	 * @param subject
	 * @param msg
	 * @description 发送html格式的邮件
	 * @author ZhangHuaRong
	 */
	public static String  sendHtmlEmail(String url,String from,String sendUser,String to,String username,String subject,String msg) {
		 HtmlEmail email = new HtmlEmail();
		 String result = null;
		 try {
			email.setHostName(hostName);
			 email.addTo(to, username); 
			 email.setFrom(from, sendUser);
			 email.setAuthentication(userName, passWord);
			 email.setCharset("UTF-8"); 
			 email.setSubject(subject);
			 email.setHtmlMsg("<html>请点击该链接修改密码 - </br><a href=\""+ url +"\">重置密码</a></html>");
			 email.setTextMsg(msg);
			 email.send();
			 result = "ok";
		} catch (EmailException e) {
			result = "fail";
		}
		return result;
	}
	
	public static void main(String[] args) {
		MailUtil.sendMultiPartEmail("15882027305@163.com","youfan", "429763991@qq.com","Mr.ZHANG", "测试标题", "测试内容。。。。。。。。。", "这是附件", new File("D:\\testEmail.txt"),new File("D:\\testEmail123.txt"));
	//	MailUtil.sendSimpleEmail("15882027305@163.com","youfan", "429763991@qq.com","Mr。zhang", "测试内容", "这是测试的内容。。。。。");
	//		MailUtil.sendHtmlEmail("http://www.baidu.com","15882027305@163.com","youfan", "429763991@qq.com","Mr。zhang", "有饭重置密码", "这是测试的内容。。。。。");

	}

}
