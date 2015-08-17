package com.youfan.services;

import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.youfan.main.Main.CONFIG;

/**
 * Created date: 2015-08-17.
 *
 * @author dolphineor
 * @since 1.0.0
 */
public class MongoPool {

    private static MongoClient mongoClient;

    static {
        if (mongoClient == null) {
            synchronized (MongoPool.class) {
                try {
                    String hosts = CONFIG.getString("youfan.mongo.host");
                    if (hosts != null && !hosts.isEmpty()) {
                        String[] hostArray = hosts.split(",");
                        List<ServerAddress> serverAddresses = new ArrayList<>();
                        for (String host : hostArray) {
                            String[] hostPort = host.split(":");
                            ServerAddress address;
                            if (hostPort.length == 1) {
                                address = new ServerAddress(hostPort[0]);
                            } else {
                                address = new ServerAddress(hostPort[0], Integer.parseInt(hostPort[1]));
                            }
                            serverAddresses.add(address);
                        }

                        mongoClient = new MongoClient(serverAddresses);
                    } else throw new NullPointerException();

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }


    public static MongoTemplate getMongoTemplate(String db) {
        MongoDbFactory mongoDbFactory = new SimpleMongoDbFactory(mongoClient, db);

        //remove _class
        MappingMongoConverter mongoConverter = new MappingMongoConverter(new DefaultDbRefResolver(mongoDbFactory), new MongoMappingContext());
        mongoConverter.setTypeMapper(new DefaultMongoTypeMapper(null));

        return new MongoTemplate(mongoDbFactory, mongoConverter);
    }
}
