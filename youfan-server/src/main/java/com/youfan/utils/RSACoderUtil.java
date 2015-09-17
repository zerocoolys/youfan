package com.youfan.utils;

import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Cipher;

/**
 * 
 * @title RSACoder.java
 * @description 非对称加密解密 publicKey privateKey 可以通过initKey()方法随机获得
 * @author ZhangHuaRong   
 * @update 2015年8月31日 上午10:34:03
 */
public abstract class RSACoderUtil {
    
	public static final String KEY_ALGORITHM ="RSA";
	
	public static final String SIGNATURE_ALGORITHM ="MD5withRSA";
	private static final String PUBLIC_KEY ="RSAPublicKey";
	private static final String PRIVATE_KEY = "RSAPrivateKey";
	
	private static final int KEY_SIZE = 512;
	
	public static final byte[] publicKey = {48,92,48,13,6,9,42,-122,72,-122,-9,13,1,1,1,5,0,3,75,0,48,72,2,65,0,-102,-62,8,127,126,58,-108,-122,111,49,87,-44,-4,-109,-116,20,-61,126,33,79,111,44,-26,-7,6,-116,-82,-80,-16,21,-62,-95,-29,103,-49,76,-5,99,-58,-69,66,112,-18,-81,110,-15,-73,48,-71,-63,48,87,110,116,11,-98,27,109,-4,-11,-70,-88,63,-27,2,3,1,0,1};

	public static final byte[] privateKey = {48,-126,1,84,2,1,0,48,13,6,9,42,-122,72,-122,-9,13,1,1,1,5,0,4,-126,1,62,48,-126,1,58,2,1,0,2,65,0,-102,-62,8,127,126,58,-108,-122,111,49,87,-44,-4,-109,-116,20,-61,126,33,79,111,44,-26,-7,6,-116,-82,-80,-16,21,-62,-95,-29,103,-49,76,-5,99,-58,-69,66,112,-18,-81,110,-15,-73,48,-71,-63,48,87,110,116,11,-98,27,109,-4,-11,-70,-88,63,-27,2,3,1,0,1,2,64,3,-22,72,-64,-64,-10,-58,111,40,60,-3,85,-36,21,-9,-125,70,-10,-41,-20,-28,-119,36,70,-60,-115,-90,-107,-65,93,45,-111,84,-116,-106,96,-59,102,115,-67,-86,-45,79,-114,-75,22,52,-65,63,-100,20,2,-3,119,68,-88,13,-64,80,-8,-95,46,-123,1,2,33,0,-3,13,-40,120,97,-14,-99,-68,56,15,97,97,-14,91,15,-63,-120,60,-20,98,122,80,44,110,-2,-78,-87,-74,106,-3,-64,69,2,33,0,-100,-113,62,-110,-116,-105,-107,-83,109,-86,94,-6,-96,-109,-26,-125,-44,13,111,6,83,-44,125,101,-75,57,-125,-28,127,-87,-117,33,2,33,0,-101,-56,31,64,20,-60,63,-8,115,-26,124,3,-55,39,-25,-18,51,73,-106,24,21,-58,47,100,113,37,89,-74,-13,-20,-100,-91,2,32,67,-89,34,-62,-15,62,15,-48,1,-77,-67,-105,80,12,-103,112,30,18,48,7,-21,-15,-58,-66,76,-79,-83,-20,-17,-67,-76,1,2,32,57,-94,37,-17,-80,-39,95,14,68,45,-24,75,-94,-64,-71,99,50,29,47,-38,82,-80,30,-109,49,44,27,-4,-74,-30,25,-75};
	
	/**
	 * 
	 * @Description:私匙数字签名
	 * @param data 待签名数据
	 * @param privateKey
	 * @return 数字签名
	 * @throws Exception
	 */
	public static byte[] sign(byte[] data,byte[] privateKey) throws Exception{
		
		PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(privateKey);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
		PrivateKey priKey = keyFactory.generatePrivate(pkcs8KeySpec);
		Signature signature = Signature.getInstance(SIGNATURE_ALGORITHM);
		signature.initSign(priKey);
		signature.update(data);
		return signature.sign();
	}
	
	/**
	 * 
	 * @Description:
	 * @param keyMap
	 */
	public static byte[] getPrivateKey(Map<String,Object> keyMap){
		Key key = (Key) keyMap.get(PRIVATE_KEY);
		return key.getEncoded();
	}
	/**
	 * 
	 * @Description:描述一下这个方法
	 */
	public static byte[] getPublicKey(Map<String,Object> keyMap) {
		Key key = (Key) keyMap.get(PUBLIC_KEY);
		return key.getEncoded();
	}
	/**
	 * 
	 * @Description:初始化密匙对
	 */
	public static Map<String,Object> initKey() throws Exception{
		KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance(KEY_ALGORITHM);
		keyPairGen.initialize(KEY_SIZE);
		KeyPair keyPair = keyPairGen.generateKeyPair();
		RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
		RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put(PUBLIC_KEY, publicKey);
		map.put(PRIVATE_KEY, privateKey);
		return map;
	}
	/**
	 * 
	 * @param data
	 * @param publicKey
	 * @param sign
	 * @description 公匙数字签名校验
	 * @author ZhangHuaRong
	 */
	public static boolean verify(byte[] data,byte[] publicKey,byte[] sign) throws Exception{
		X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicKey);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
		PublicKey pubKey = keyFactory.generatePublic(keySpec);
		Signature signature = Signature.getInstance(SIGNATURE_ALGORITHM);
		signature.initVerify(pubKey);
		signature.update(data);
		return signature.verify(sign);
	}
    /**
     * 
     * @Description:公匙解密数据
     */
	public static byte[] jiemiByPublicKey(byte[] data,byte[] key) throws Exception{
		X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(key);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
		PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
		Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
		cipher.init(Cipher.DECRYPT_MODE, publicKey);
		return cipher.doFinal(data);
	}
	/**
	 * 
	 * @Description:私匙加密数据
	 */
	public static byte[] jiamiByPrivateKey(byte[] data,byte[] key) throws Exception{
		PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(key);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
		PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
		Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
		cipher.init(Cipher.ENCRYPT_MODE, privateKey);
		return cipher.doFinal(data); 
	}
	
	/**
	 * 
	 * @param date  要加密的数据
	 * @param key  公匙
	 * @return     加密数据
	 * @description 公匙加密
	 */
	public static byte[] encryptByPublic(byte[] date,byte[] key) throws Exception{
		X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(key);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
		PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
		Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
		cipher.init(Cipher.DECRYPT_MODE, publicKey);
		return cipher.doFinal(date);
	}
	/**
	 * 
	 * @param data
	 * @param key
	 * @description 私匙解密数据
	 */
	
	public static byte[] decryptByPrivateKey(byte[] data,byte[] key) throws Exception{
		PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(key);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
		PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
		Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
		cipher.init(Cipher.DECRYPT_MODE, privateKey);
		return cipher.doFinal(data); 
	}
	
	
	
	/**
	 * 
	 * @description byte[] 转化为16进制的字符串
	 */
	public static String bytesToHexString(byte[] src){   
	    StringBuilder stringBuilder = new StringBuilder("");   
	    if (src == null || src.length <= 0) {   
	        return null;   
	    }   
	    for (int i = 0; i < src.length; i++) {   
	        int v = src[i] & 0xFF;   
	        String hv = Integer.toHexString(v);   
	        if (hv.length() < 2) {   
	            stringBuilder.append(0);   
	        }   
	        stringBuilder.append(hv);   
	    }   
	    return stringBuilder.toString();   
	}   
	/**
	 * 
	 * @Description:将16进制的字符串转化为byte数组
	 */
	public static byte[] hexStringToBytes(String hexString) {   
	    if (hexString == null || hexString.equals("")) {   
	        return null;   
	    }   
	    hexString = hexString.toUpperCase();   
	    int length = hexString.length() / 2;   
	    char[] hexChars = hexString.toCharArray();   
	    byte[] d = new byte[length];   
	    for (int i = 0; i < length; i++) {   
	        int pos = i * 2;   
	        d[i] = (byte) (charToByte(hexChars[pos]) << 4 | charToByte(hexChars[pos + 1]));   
	    }   
	    return d;   
	}   
	private static byte charToByte(char c) {   
	    return (byte) "0123456789ABCDEF".indexOf(c);   
	} 
	
	
	public static void main(String[] args) throws Exception {
		/*try {
			 Map<String,Object> keyMap = initKey();
			byte[] pub = RSACoderUtil.getPublicKey(keyMap);
			StringBuffer sf = new StringBuffer();
			for(byte b:pub){
				sf.append(b);
				sf.append(",");
			}
			byte[] pry = RSACoderUtil.getPrivateKey(keyMap);
			StringBuffer sfO = new StringBuffer();
			for(byte b:pry){
				sfO.append(b);
				sfO.append(",");
			}
			System.out.println(sf.toString());
			System.out.println(sfO.toString());
			byte[] daijiami = "你好,你叫什么名字".getBytes("utf-8");
			byte[] jiamihoudate = RSACoderUtil.jiamiByPrivateKey(daijiami, RSACoderUtil.privateKey);
			System.out.println("加密后："+RSACoderUtil.bytesToHexString(jiamihoudate));
			byte[] jiemihoudate =  RSACoderUtil.encryptByPublic(jiamihoudate,RSACoderUtil.publicKey);
			System.out.println("----------------------------------------------");
			System.out.println(new String(jiemihoudate,"utf-8"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		String id = "1003";
		byte[] date = sign(id.getBytes(), privateKey);
		System.out.println(bytesToHexString(date));
		
		String tocken = "2d8693997be614ea01c9ccd3a0b864dbd7c72cb1d57dcda5e24bcf3d0b5ec8da646248b90c3e61836f38a4945679bdde148acff45dbc035f457a9113cc0cbcea";
		
		boolean flag = verify(id.getBytes(),publicKey,hexStringToBytes(tocken));
		
		System.out.println(flag);
		
	}
}
