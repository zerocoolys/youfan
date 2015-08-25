package com.youfan.system.mongo;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.ServerAddress;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import static com.youfan.main.Main.CONFIG;

/**
 * Created on 2015-08-17.
 * <p>MongoTemplate connection instance
 *
 * @author dolphineor
 * @since 1.0.0
 */
public class MongoPool {

    private static final String MONGO_PARAMS = "youfan.mongo.%s";

    private static final ConcurrentHashMap<String, MongoTemplate> mongoTemplateMap = new ConcurrentHashMap<>();

    private static MongoClient mongoClient;


    static {
        if (mongoClient == null) {
            synchronized (MongoPool.class) {
                if (mongoClient == null) {
                    List<ServerAddress> serverAddresses = Arrays.stream(CONFIG.getString(String.format(MONGO_PARAMS, "host")).split(","))
                            .map(host -> {
                                String[] hostPort = host.split(":");
                                ServerAddress address = null;
                                try {
                                    if (hostPort.length == 1) {
                                        address = new ServerAddress(hostPort[0]);
                                    } else {
                                        address = new ServerAddress(hostPort[0], Integer.parseInt(hostPort[1]));
                                    }
                                } catch (UnknownHostException e) {
                                    e.printStackTrace();
                                }

                                return address;
                            })
                            .filter(s -> s != null)
                            .collect(Collectors.toList());

                    MongoClientOptions options = MongoClientOptions.builder()
                            .connectionsPerHost(CONFIG.getInt(String.format(MONGO_PARAMS, "connectionsPerHost")))
                            .threadsAllowedToBlockForConnectionMultiplier(CONFIG.getInt(String.format(MONGO_PARAMS, "threadsAllowedToBlockForConnectionMultiplier")))
                            .maxWaitTime(CONFIG.getInt(String.format(MONGO_PARAMS, "maxWaitTime")))
                            .connectTimeout(CONFIG.getInt(String.format(MONGO_PARAMS, "connectTimeout")))
                            .socketTimeout(CONFIG.getInt(String.format(MONGO_PARAMS, "socketTimeout")))
                            .socketKeepAlive(CONFIG.getBoolean(String.format(MONGO_PARAMS, "socketKeepAlive")))
                            .build();

                    mongoClient = new MongoClient(serverAddresses, options);
                }
            }
        }
    }


    /**
     * Get {@code MongoTemplate} by specified db name.
     *
     * @param db database name
     * @return {@code MongoTemplate}
     */
    public static MongoTemplate getMongoTemplate(String db) {
        return mongoTemplateMap.computeIfAbsent(db, dbName -> {
            MongoDbFactory mongoDbFactory = new SimpleMongoDbFactory(mongoClient, dbName);

            //remove _class field when save data to mongodb
            MappingMongoConverter mongoConverter = new MappingMongoConverter(new DefaultDbRefResolver(mongoDbFactory), new MongoMappingContext());
            mongoConverter.setTypeMapper(new DefaultMongoTypeMapper(null));

            return new MongoTemplate(mongoDbFactory, mongoConverter);
        });
    }
}
