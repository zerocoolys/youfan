package com.youfan.commons.vo;

/**
 * Created on 2015-08-21.
 * <p>
 * 菜单VO.
 *
 * @author Tom Ding
 */
public class MechantMenuVO {

	private String id;

	/**
	 * 商家id
	 */
	private Long sellerId;

	/**
	 * 菜品id
	 */
	private Long menuId;

	/**
	 * 菜品名称
	 */
	private String name;

	/**
	 * 价格
	 */
	private double price;

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Long getSellerId() {
		return sellerId;
	}

	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}

	public Long getMenuId() {
		return menuId;
	}

	public void setMenuId(Long menuId) {
		this.menuId = menuId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
