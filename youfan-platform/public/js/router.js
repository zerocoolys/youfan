/**
 * Created by weims on 2015/5/15.
 */
define(["angular", "./app"], function (angular, myApp) {
    'use strict';

    myApp.config(
        function ($stateProvider, $urlRouterProvider) {
             //设置路由
            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "login.html"
                })
                .state("index", {
                    url:"/index",
                    templateUrl: "../index.html"
                })
        }
    );
});