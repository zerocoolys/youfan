package com.youfan.commons;

import java.util.List;

/**
 * Created by xiaowei on 15-9-6.
 */
public class Pager {
    private int pageSize = 3;
    private int pageNo;
    private long totalCount;
    private int totalPage;
    private int upPage;
    private int nextPage;
    private List rows;

    /**
     * 获取第一条记录位置
     *
     * @return
     */
    public int getFirstResult() {
        return (this.getPageNo() - 1) * this.getPageSize();
    }

    /**
     * 获取最后记录位置
     *
     * @return
     */
    public int getLastResult() {
        return this.getPageNo() * this.getPageSize();
    }

    /**
     * 计算一共多少页
     */
    public void setTotalPage() {
        this.totalPage = (int) ((this.totalCount % this.pageSize > 0) ? (this.totalCount / this.pageSize + 1)
                : this.totalCount / this.pageSize);
    }

    /**
     * 设置 上一页
     */
    public void setUpPage() {
        this.upPage = (this.pageNo > 1) ? this.pageNo - 1 : this.pageNo;
    }

    /**
     * 设置下一页
     */
    public void setNextPage() {
        this.nextPage = (this.pageNo == this.totalPage) ? this.pageNo : this.pageNo + 1;
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

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public List getRows() {
        return rows;
    }

    public void setRows(List rows) {
        this.rows = rows;
    }

    public Pager(int pageNo, int pageSize, long totalCount2) {
        this.setPageNo(pageNo);
        this.setPageSize(pageSize);
        this.setTotalCount(totalCount2);
        this.init();
    }

    /**
     * 初始化计算分页
     */
    private void init() {
        this.setTotalPage();// 设置一共页数
        this.setUpPage();// 设置上一页
        this.setNextPage();// 设置下一页
    }
}
