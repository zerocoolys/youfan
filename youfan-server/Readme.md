### 项目规范

1. 所有的接口请参考Restful方式实现，具体准则请自行baidu
2. Controller -> DAO -> DB
3. 对于不同的数据库实现，只需要注入不同的datasource即可，不需要在类名上体现