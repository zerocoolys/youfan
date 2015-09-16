package com.youfan.scheduler;

import com.youfan.services.client.MenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * <p>菜品余量管理任务调度.</p>
 *
 * @author dolphineor
 * @date 2015-09-11
 */
@Configuration
public class DishesManageScheduler {

    private static final Logger logger = LoggerFactory.getLogger(DishesManageScheduler.class);

    @Autowired
    private MenuService menuService;

    public void setMenuService(@Qualifier("menuService") MenuService menuService) {
        this.menuService = menuService;
    }

    @Scheduled(cron = "* * 1 */1 * ?")
    public void start() {
        logger.info("DishesManage Task Start...");
        menuService.restNumManage();
        logger.info("DishesManage Task End...");
    }
}
