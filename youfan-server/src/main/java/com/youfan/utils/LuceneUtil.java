package com.youfan.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field.Store;
import org.apache.lucene.document.StringField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.index.Term;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TermQuery;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;
import org.wltea.analyzer.lucene.IKAnalyzer;

import com.youfan.commons.Pagination;
import com.youfan.commons.vo.CollectionVO;

/**
 * 
 * @title LuceneUtil.java
 * @package com.youfan.utils
 * @description 敏感词索引库的添加，匹配，删除，查找等操作
 * @author ZhangHuaRong
 * @update 2015年9月9日 下午1:46:23
 */

public class LuceneUtil {
	//static String indexPath = "J:/index";
    //static String docsPath = "J:/store/敏感词库大全.txt";

	/**
	 * 
	 * @param indexPath
	 * @throws IOException
	 * @description TODO
	 */
	private static IndexWriter getIndexWriter(String indexPath) throws IOException {
		Directory indexDir = FSDirectory.open(new File(indexPath));
		IndexWriterConfig iwc = new IndexWriterConfig(Version.LATEST, new StandardAnalyzer());
		IndexWriter writer = new IndexWriter(indexDir, iwc);
		return writer;
	}

	/**
	 * 
	 * @description 从文件批量导入敏感词
	 * @author ZhangHuaRong
	 * @update 2015年9月9日 下午1:49:40
	 */
	private static void index(IndexWriter writer, File file) throws IOException {
		InputStreamReader read = new InputStreamReader(new FileInputStream(file), "gbk");
		BufferedReader br = new BufferedReader(read);
		int line = 1;
		String tempString = null;
		Document document = null;
		// 一次读一行，读入null时文件结束
		while ((tempString = br.readLine()) != null) {
			document = new Document();
		/*	document.add(new IntField("id", line, Store.YES));*/
			document.add(new StringField("contents", tempString, Store.YES));
			writer.addDocument(document);
			System.out.println(tempString);
			line++;
		}
		writer.commit();
		writer.close();
	}
	
	/**
	 * 
	 * @description 批量添加敏感词
	 * @author ZhangHuaRong
	 * @update 2015年9月9日 下午1:49:40
	 */
	@SuppressWarnings("unused")
	private static void index(IndexWriter writer, String[] values) throws IOException {
		String tempString = null;
		Document document = null;
		// 一次读一行，读入null时文件结束
		for(String value : values ) {
			document = new Document();
			document.add(new StringField("contents", value, Store.YES));
			writer.addDocument(document);
		}
		writer.commit();
		writer.close();
	}

	/**
	 * 
	 * @description 添加敏感词
	 * @author ZhangHuaRong
	 * @update 2015年9月9日 下午1:55:12
	 */
	public static void createIndex(IndexWriter writer, String value) {
		try {
			Document document = new Document();
			document.add(new StringField("contents", value, Store.YES));
			writer.addDocument(document);
			writer.commit();
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	/**
	 * 
	 * @description 查询敏感词
	 * @author ZhangHuaRong
	 * @update 2015年9月9日 下午1:55:35
	 */
	public static int search(String value,String indexPath) {
		int result = 0;
		try {
			Directory indexDir = FSDirectory.open(new File(indexPath));
			IndexReader ir = DirectoryReader.open(indexDir);
			IndexSearcher searcher = new IndexSearcher(ir);
			TopDocs docs = searcher.search(new TermQuery(new Term("contents", value)), 20);
			ScoreDoc[] hits = docs.scoreDocs;
			result = hits.length;
			for (ScoreDoc hit : hits) {
				System.out.println("doc: " + hit.doc + " score: " + hit.score);
			}

			ir.close();

		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 
	 * @description 验证是否存在敏感词
	 * @author ZhangHuaRong
	 * @update 2015年9月9日 下午1:58:40
	 */
	public static boolean hasSensitiveWords(String value,String indexPath) {
		boolean flag = true;
		try {
			Analyzer ik = new IKAnalyzer();
			TokenStream ts = ik.tokenStream("field", value);
			CharTermAttribute ch = ts.addAttribute(CharTermAttribute.class);
			ts.reset();
			while (ts.incrementToken()) {
				int result = search(ch.toString(),indexPath);
				System.out.println("分词：" + ch.toString());
				if (result > 0) {
					flag = false;
					System.out.println("发现敏感词:" + ch.toString());
					break;
				}
			}
			ts.end();
			ts.close();

		} catch (IOException e) {
			e.printStackTrace();
		}

		return flag;
	}

	/**
	 * 
	 * 
	 * @description 从文件批量导入敏感词
	 * @author ZhangHuaRong
	 * @update 2015年9月9日 下午2:00:32
	 */
	public static void createIndexFromFile(String indexPath,String docsPath) {
		try {
			IndexWriter iw = getIndexWriter(indexPath);
			index(iw, new File(docsPath));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 
	 * @description 从文件添加敏感词
	 * @author ZhangHuaRong
	 * @update 2015年9月9日 下午2:00:39
	 */
	public static void createIndex(String value,String indexPath) {
		try {
			IndexWriter iw = getIndexWriter(indexPath);
			createIndex(iw, value);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 
	 * @description 分页读取敏感词
	 * @author ZhangHuaRong
	 * @update 2015年9月9日 下午2:00:48
	 */
	public static CollectionVO<Document> readAllIndexDocs(IndexWriter writer, Pagination pagination,String indexPath) {
		CollectionVO<Document> vo = null;
		try {
			Directory dir = FSDirectory.open(new File(indexPath));
			IndexReader reader = DirectoryReader.open(dir);
			IndexSearcher searcher = new IndexSearcher(reader);
			int count = reader.maxDoc();
			Document doc = null;
			List<Document> docs = new ArrayList<Document>();
			for (int i = pagination.getSkip(); i < (pagination.getSkip() + pagination.getPageSize()); i++) {
				doc = searcher.doc(i);
				docs.add(doc);
			}
			vo = new CollectionVO<Document>(docs, count, pagination.getPageSize());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return vo;
	}
   /**
    * 
    * @description 删除敏感词
    * @author ZhangHuaRong
    * @update 2015年9月9日 下午3:09:24
    */
	public static void delete(IndexWriter writer,String value) throws IOException{
		try {
			writer.deleteDocuments(new Term("contents",value));
		} catch (IOException e) {
			e.printStackTrace();
		}  finally{
			writer.close();
		}
	}
	
	public static void main(String[] args) {
		// createIndex();
		// search("代孕");
	/*	String str = "从北京来了个sb叫做习近平";
		String str1 = "老蒋说法轮功是神功";
		createIndex("李洪志","J:/index");
		hasSensitiveWords(str,"J:/index");*/
		
		try {
			delete(getIndexWriter("J:/index"),"李洪志");
			search("李洪志","J:/index");
		} catch (Exception e) {
			e.printStackTrace();
		}

	/*	try {
			Pagination pagination = new Pagination();
			pagination.setSkip(10);
			pagination.setPageSize(50);
			CollectionVO<Document> docs = readAllIndexDocs(getIndexWriter(indexPath), pagination);
			System.out.println(docs.getPageSize());
			List<Document> ds = docs.getList();
			for (Document dc : ds) {
				System.out.println(dc);
			}

		} catch (IOException e) {
			e.printStackTrace();
		}*/

	}

}
