var ConfigModule = angular.module('ConfigModule', [])
    .constant('SITE_CONFIG', {
        host: 'http://localhost',
        url: 'http://localhost:8010',
        version: 'v1'
    });
