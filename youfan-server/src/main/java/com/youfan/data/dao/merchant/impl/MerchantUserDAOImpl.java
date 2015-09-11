package com.youfan.data.dao.merchant.impl;

//import com.sun.xml.internal.bind.v2.runtime.reflect.opt.Const;
import com.youfan.commons.vo.merchant.MerchantUserVO;
import com.youfan.controllers.params.merchant.MerchantUserParams;
import com.mongodb.WriteResult;
import com.youfan.commons.Constants;
import com.youfan.commons.Pagination;
import com.youfan.data.dao.merchant.MerchantUserDAO;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.data.support.IdGenerator;
import com.youfan.utils.JSONUtils;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * Created by perfection on 15-8-19.
 */
@Repository("merchantUserDao")
public class MerchantUserDAOImpl implements MerchantUserDAO {
	@Resource
	private IdGenerator idGenerator;

	@Override
	public MerchantUserVO getMerchantUserInfo(String id) {
		MerchantUserEntity merchantUserEntity = mongoTemplate.findOne(query(where(COLLECTION_MERCHANTUSERID).is(id)),
				getEntityClass());
		if (merchantUserEntity != null) {
			return convertToVO(merchantUserEntity);
		} else {
			return null;
		}
	}

	@Override
	public MerchantUserVO saveMerchantUserInfo(MerchantUserVO merchantUser) {
		boolean test = mongoTemplate.collectionExists(getEntityClass());
		if (test) {
			Update update = new Update();
			update.set(MONGO_STATUS, merchantUser.getStatus());
			update.set("id", merchantUser.getId());
			update.set("address", merchantUser.getAddress());
			update.set("ageRange", merchantUser.getAgeRange());
			update.set(COLLECTION_HEADPORTRAITPICURL, merchantUser.getHeadPortraitPicUrl());
			update.set(COLLECTION_HEALTHCERTIFICATEPICURL, merchantUser.getHealthCertificatePicUrl());
			update.set(COLLECTION_IDCARDPICURL, merchantUser.getIdCardPicUrl());
			update.set("realName", merchantUser.getRealName());
			update.set("sex", merchantUser.getSex());
			return convertToVO(
					mongoTemplate.findAndModify(query(where("id").is(merchantUser.getId())), update, getEntityClass()));
		} else {
			mongoTemplate.insert(convertToEntity(merchantUser));
			return merchantUser;
		}

	}

	@Override
	public MerchantUserVO findOne(Long id) {
		return null;
	}

	@Override
	public void insert(MerchantUserVO merchantUser) {
		mongoTemplate.insert(convertToEntity(merchantUser));
	}

	@Override
	public MerchantUserVO login(String userName) {
		MerchantUserVO merchantUser = new MerchantUserVO();
		merchantUser.setUserName(userName);
		if (!mongoTemplate.collectionExists(getEntityClass())) {
			mongoTemplate.createCollection(getEntityClass());
			mongoTemplate.insert(convertToEntity(merchantUser));
		} else {
			if (mongoTemplate.findOne(query(where("userName").is(userName)), getEntityClass()) == null) {
				mongoTemplate.insert(convertToEntity(merchantUser));
			}
		}
		MerchantUserEntity merchantUserEntity = mongoTemplate.findOne(query(where("userName").is(userName)),
				getEntityClass());
		if (merchantUserEntity == null) {
			return null;
		} else {
			merchantUser.setId(merchantUserEntity.getId());
			return merchantUser;
		}
	}

	@Override
	public Map<String, String> register(String userName, String passWord) {
		MerchantUserVO merchantUser = new MerchantUserVO();
		Map<String, String> map = null;
		if (!mongoTemplate.collectionExists(getEntityClass())) {
			mongoTemplate.createCollection(getEntityClass());
		}
		map = new HashMap<>();
		if (mongoTemplate.findOne(query(where("userName").is(userName)), getEntityClass()) != null) {
			// 账户已经存在
			map.put("registerStatus", "-1");
			return map;
		} else {
			merchantUser.setUserName(userName);
			merchantUser.setPassWord(passWord);
			MerchantUserEntity merchantUserEntity = new MerchantUserEntity();
			merchantUserEntity.setUserName(userName);
			merchantUserEntity.setPassWord(passWord);
			mongoTemplate.insert(merchantUserEntity);
			MerchantUserEntity merchantUserEntityRes = mongoTemplate.findOne(
					query(where("userName").is(userName).andOperator(where("passWord").is(passWord))),
					getEntityClass());
			if (merchantUserEntityRes == null) {
				// 注册失败
				map.put("registerStatus", "0");
				return map;
			} else {
				// 注册成功
				merchantUser.setId(merchantUserEntityRes.getId());
				map.put("registerStatus", "1");
				map.put("id", merchantUser.getId());
				map.put("userName", merchantUser.getUserName());
				map.put("passWord", merchantUser.getPassWord());
				return map;
			}
		}
	}

	@Override
	public void delete(Long id) {

	}

	@Override
	public void update(MerchantUserVO userEntity) {

	}

	@Override
	public List<MerchantUserEntity> getMerchantByStatus(Integer status) {
		return mongoTemplate.find(query(where(MONGO_STATUS).is(status)), getEntityClass());
	}

	@Override
	public void updateStatus(String id, Integer status) {
		mongoTemplate.updateFirst(query(where("id").is(id)), Update.update(MONGO_STATUS, status), getEntityClass());
	}

	@Override
	public List<MerchantUserEntity> find(Query query) {
		return mongoTemplate.find(query, getEntityClass());
	}

	@Override
	public long count(Query query) {
		return mongoTemplate.count(query, getEntityClass());
	}

	@Override
	public MerchantUserVO findById(String id) {
		Query q = new Query();
		Criteria c = Criteria.where(Constants.FIELD_ID).is(id).and(Constants.MESSAGE_STATUS).is(0);
		q.addCriteria(c);
		MerchantUserEntity mue = mongoTemplate.findOne(q, getEntityClass());
		if (mue != null)
			return convertToVO(mue);

		return null;
	}

	@Override
	public Class<MerchantUserEntity> getEntityClass() {
		return MerchantUserEntity.class;
	}

	@Override
	public Class<MerchantUserVO> getVOClass() {
		return MerchantUserVO.class;
	}

	@Override
	public MerchantUserVO findById(Long id) {
		return null;
	}

	@Override
	public List<MerchantUserVO> pageListByStatus(Integer page, Integer pageSize, Query query) {
		return convertToVOList(mongoTemplate.find(query.skip((page - 1) * pageSize).limit(pageSize), getEntityClass()));
	}

	@Override
	public Long getPageTotal(Integer status) {
		return mongoTemplate.count(query(where(MONGO_STATUS).is(status)), getEntityClass());
	}

	@Override
	public List<MerchantUserVO> findPagerByParams(MerchantUserParams muParams, Pagination pager) {
		Query query = buildAndEqualQuery(muParams);
		if (muParams.getStatus() == null) {
			query.addCriteria(where(MONGO_STATUS).ne(-1));
		}
		if (pager != null) {
			query.skip((pager.getPageNo() - 1) * pager.getPageSize());
			query.limit(pager.getPageSize());
			if (pager.getSortBy() != null && !pager.getSortBy().isEmpty()) {
				query.with(new Sort(pager.isAsc()?Sort.Direction.ASC:Sort.Direction.DESC, pager.getSortBy()));

			}
		}
		return convertToVOList(mongoTemplate.find(query, getEntityClass()));
	}

	@Override
	public long count(MerchantUserParams muParams) {
		Query query = buildAndEqualQuery(muParams);
		if (muParams.getStatus() == null) {
			query.addCriteria(where(MONGO_STATUS).ne(-1));
		}
		return mongoTemplate.count(query, getEntityClass());
	}

	@Override
	public int updateById(String id, MerchantUserParams muParams) {
		Update update = new Update();
		try {
			Map<String, Object> paramsMap = JSONUtils.obj2map(muParams);
			if(paramsMap==null||paramsMap.isEmpty()){
				return 0;
			}
			update = buildUpdate(paramsMap);
		} catch (Exception e) {
			update = new Update();
		}
		System.out.println(update);
		WriteResult re = mongoTemplate.updateFirst(query(where(ID).is(id)).addCriteria(where(MONGO_STATUS).ne(-1)), update, getEntityClass());
		return re.getN();
	}
}
