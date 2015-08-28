package com.youfan.utils;

import org.apache.commons.httpclient.Cookie;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpConnectionManagerParams;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


/**
 * 模拟Http客户端访问网络地址，支持get/post两种方式<br>
 * <p>
 * get
 * <p>
 * <pre>
 * HttpClientUtil h = new HttpClientUtil();
 * try {
 * 	h.open(&quot;http://news.sina.com.cn&quot;, &quot;get&quot;);
 * 	int status = h.send();
 * 	h.getResponseBodyAsString(&quot;GBK&quot;);
 * }
 * catch (IOException e) {
 * 	e.printStackTrace();
 * }
 * finally {
 * 	h.close();
 * }
 *
 * HttpClientUtil h = new HttpClientUtil();
 * try {
 * 	h.open(&quot;http://oa.com/something.do&quot;, &quot;post&quot;);
 *
 * 	h.addParameter("name", "ta");
 * 	h.addParameter("password", "123456");
 *
 * 	h.setRequestHeader("Cookie", "Language=zh_CN;UserAgent=PC");
 *
 * 	int status = h.send();
 * 	h.getResponseBodyAsString(&quot;GBK&quot;);
 * }
 * catch (IOException e) {
 * 	e.printStackTrace();
 * }
 * finally {
 * 	h.close();
 * }
 * </pre>
 */
public class HttpClientUtil {
    private static final Log log = LogFactory.getLog(HttpClientUtil.class);

    private HttpClient client = null;
    private HttpMethodBase httpMethod = null;

    public HttpClientUtil() {
        client = new HttpClient();

        setProxy(client);
    }

    /**
     * @param timeoutInMilliseconds 超时时间，单位毫秒
     */
    public HttpClientUtil(int timeoutInMilliseconds) {
        this();
        HttpConnectionManagerParams ps = client.getHttpConnectionManager().getParams();

        ps.setSoTimeout(timeoutInMilliseconds);
        ps.setConnectionTimeout(timeoutInMilliseconds);
    }

    /**
     * 向指定地址发送一个HTTP请求
     *
     * @param url    绝对地址，如http://a8.seeyon.com/seeyon/logs/v3x.log
     * @param method 方式 : get post
     */
    public void open(String url, String method) {
        if ("get".equalsIgnoreCase(method)) {
            httpMethod = new GetMethod(url);
        } else if ("post".equalsIgnoreCase(method)) {
            httpMethod = new PostMethod(url);
        } else {
            throw new IllegalArgumentException("Unsupport method : " + method);
        }
    }

    /**
     * 在open方法之后、send()之前设置
     *
     * @param name
     * @param value
     */
    public void setRequestHeader(String name, String value) {
        httpMethod.setRequestHeader(name, value);
    }

    /**
     * 添加参数
     *
     * @param name
     * @param value
     * @throws IllegalArgumentException
     */
    public void addParameter(String name, String value) throws IllegalArgumentException {
        if ((name == null) || (value == null)) {
            throw new IllegalArgumentException(
                    "Arguments to addParameter(String, String) cannot be null");
        }

        if (httpMethod instanceof GetMethod) {
            String q = httpMethod.getQueryString();
            if (q == null) {
                httpMethod.setQueryString(name + "=" + value);
            } else {
                httpMethod.setQueryString(q + "&" + name + "=" + value);
            }
        } else if (httpMethod instanceof PostMethod) {
            ((PostMethod) httpMethod).addParameter(name, String.valueOf(value));
        }
    }

    /**
     * 发送Get请求
     *
     * @return 请求状态 200-正常，404-页面不存在，403-禁止访问，500-服务器错误等等
     * @throws IOException
     */
    public int send() throws IOException {
        httpMethod.setRequestHeader("Connection", "close");

        return client.executeMethod(httpMethod);
    }

    /**
     * 获取response header
     *
     * @return
     */
    public Map<String, String> getResponseHeader() {
        Map<String, String> r = new HashMap<String, String>();
        Header[] h = httpMethod.getResponseHeaders();
        for (Header header : h) {
            r.put(header.getName(), header.getValue());
        }

        return r;
    }

    /**
     * 获取Cookie
     *
     * @return
     */
    public Map<String, String> getCookies() {
        Map<String, String> r = new HashMap<String, String>();
        Cookie[] cs = client.getState().getCookies();
        for (Cookie c : cs) {
            r.put(c.getName(), c.getValue());
        }

        return r;
    }

    /**
     * Returns the response body of the HTTP method
     *
     * @return
     * @throws IOException
     */
    public InputStream getResponseBodyAsStream() throws IOException {
        return httpMethod.getResponseBodyAsStream();
    }

    /**
     * 获取网页内容
     *
     * @param contentCharset
     * @return
     * @throws IOException
     */
    public String getResponseBodyAsString(String contentCharset) throws IOException {
        InputStream instream = httpMethod.getResponseBodyAsStream();
        ByteArrayOutputStream outstream = new ByteArrayOutputStream(4096);
        byte[] buffer = new byte[4096];
        int len;
        while ((len = instream.read(buffer)) > 0) {
            outstream.write(buffer, 0, len);
        }
        outstream.close();

        byte[] rawdata = outstream.toByteArray();

        if (contentCharset != null) {
            return new String(rawdata, contentCharset);
        } else {
            return new String(rawdata);
        }
    }

    /**
     * Releases the connection being used by this HTTP method.<br>
     * 释放连接，千万不要忘记。
     */
    public void close() {
        if (httpMethod != null) {
            try {
                httpMethod.releaseConnection();
            } catch (Exception e) {
                System.out.println(e);
                // ignore exception
            }
        }
    }

    private static void setProxy(HttpClient client) {
        /*String proxyHost = SystemEnvironment.getHttpProxyHost();
        if(Strings.isNotBlank(proxyHost)){
			int proxyPort = SystemEnvironment.getHttpProxyPort();
			
			if(proxyPort > 0){
				client.getHostConfiguration().setProxy(proxyHost, proxyPort);
			}
		}*/
    }

    /**
     * 简易快捷的方法，直接获得页面的内容
     *
     * @param url 需要访问的地址
     * @return
     */
    public static String getContent(String url) {
        if (url != null) {
            HttpClient client = new HttpClient();
            GetMethod get = new GetMethod(url);

            setProxy(client);

            get.setRequestHeader("Connection", "close");

            try {
                client.executeMethod(get);
                return get.getResponseBodyAsString();
            } catch (Exception e) {
                log.error("", e);
            } finally {
                get.releaseConnection();
            }
        }

        return null;
    }

    public static void main(String[] args) {
        HttpClientUtil h = new HttpClientUtil();
        try {
            h.open("http://192.168.1.102:8000/message/send?toPort=2&toId=2&data=testy&status=0&date=" + new Date().getTime(), "get");
			/* h.addParameter("toId", receiverId.toString());
			 h.addParameter("toPort", receiverPort.toString());
			 h.addParameter("status", status.toString());
			 h.addParameter("data", data);
			 h.addParameter("date",DateUtils.formatDateTime(new Date()));*/
            h.setRequestHeader("Cookie", "Language=zh_CN;UserAgent=PC");
            int status = h.send();
            String context = h.getResponseBodyAsString("utf-8");
            System.out.println(context);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            h.close();
        }
    }

}
