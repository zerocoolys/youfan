package com.youfan.commons;

import java.util.Map;

/**
 * Created by yousheng on 15/8/18.
 */
public class Pagination {

    private int pageSize=10;

    private int pageNo=1;

    private int skip;

    private String orderBy;

    private boolean asc;

    private String sortBy;

    private Map<String, Object> params;

    public int getStart() {
        return pageSize * pageNo;
    }


    public int getEnd() {
        return pageSize * (pageNo + 1);
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getSkip() {
        return skip;
    }

    public void setSkip(int skip) {
        this.skip = skip;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }
    
    public boolean isAsc() {
		return asc;
	}


	public void setAsc(boolean asc) {
		this.asc = asc;
	}


	public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    public Map<String, Object> getParams() {
        return params;
    }

    public void setParams(Map<String, Object> params) {
        this.params = params;
    }
}
