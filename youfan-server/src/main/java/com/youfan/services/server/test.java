package com.youfan.services.server;

import java.lang.reflect.InvocationTargetException;

import com.youfan.commons.vo.ConditionVO;

public class test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ConditionVO vo = new ConditionVO();
		vo.setAttr("dddd");
		Class clazz = vo.getClass();
		try {
//			clazz.getField("attr");
			System.out.println(clazz.getMethod("getAttr").invoke(vo, null));
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
