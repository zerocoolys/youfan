package com.youfan.commons;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
/**
 * 
 * @description TODO
 * @author ZhangHuaRong   
 * @update 2015年8月26日 下午2:44:52
 */
public class CollectionTO<T> implements Serializable {

    private static final long serialVersionUID=1L;

    private int pageSize;

    private int pageCnt;

    private int recordCnt;

    private List<T> list=new ArrayList<T>();

    public CollectionTO() {
        super();
    }

    public CollectionTO(List<T> list, int recordCnt, int pageSize) {
        super();
        this.pageSize=pageSize;
        if(pageSize >= 0) {
            pageCnt=(int)Math.ceil((double)recordCnt / (double)pageSize);
        }
        this.recordCnt=recordCnt;
        this.list=list;
    }

    public void add(T t) {
        list.add(t);
    }

    public void add(T t, int pos) {
        list.add(pos, t);
    }

    public void addAll(List<T> list) {
        this.list=list;
    }

    public List<T> getList() {
        return Collections.unmodifiableList(this.list);
    }

    public T get(int index) {
        return list.get(index);
    }

    public int size() {
        return list.size();
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize=pageSize;
    }

    public int getPageCnt() {
        return pageCnt;
    }

    public void setPageCnt(int pageCnt) {
        this.pageCnt=pageCnt;
    }

    public int getRecordCnt() {
        return recordCnt;
    }

    public void setRecordCnt(int recordCnt) {
        this.recordCnt=recordCnt;
    }

    public String toXml(boolean isOnlySec) {
        return toXml("ROOT", "DATA", "ROW", isOnlySec);
    }

    public void sort(Comparator<T> c) {
        Collections.sort(this.list, c);
    }

    public void merge(List<T> list2, Comparator<T> c) {
        merge(list2, c, false);
    }

    public void merge(List<T> list2, Comparator<T> c, boolean append) {
        for(T t2: list2) {
            int index=indexOf(t2, c);
            if(index > -1) {
                list.remove(index);
                list.add(index, t2);
            } else {
                if(append) {
                    list.add(t2);
                }
            }
        }
    }

    public int indexOf(T t2, Comparator<T> c) {
        int size=list.size();
        for(int i=0; i < size; i++) {
            T t1=list.get(i);
            if(c.compare(t1, t2) == 0) {
                return i;
            }
        }
        return -1;
    }

    public String toXml(String root, String data, String row, boolean isOnlySec) {
        StringBuffer sb=new StringBuffer();
        if(!isOnlySec) {
            sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?><").append(root).append(">");
        }
        sb.append("<").append(data).append(">");
        int size=list.size();
        for(int i=0; i < size; i++) {
            T t=list.get(i);
            sb.append("<").append(row).append(">");
            sb.append(t.toString());
            sb.append("</").append(row).append(">");
        }
        sb.append("</").append(data).append(">");
        if(!isOnlySec) {
            sb.append("<EXTINFO><PAGECOUNT>").append(pageCnt).append("</PAGECOUNT>");
            sb.append("<RECCOUNT>").append(recordCnt).append("</RECCOUNT></EXTINFO>");
            sb.append("</").append(root).append(">");
        }
        return sb.toString();
    }
}
