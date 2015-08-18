/**
 * Created by Administrator on 2015/8/14.
 */

define([
    "angular",
    "js002",
    "js003",
    "js006",
    "./angularjs/ui-bootstrap-tpls",
    "./angularjs/ui-grid-unstable.min",
    "./angularjs/angular-route",
    //业务模块控制器
    "./controllers/loginCtrl",
    "./controllers/leftMenuCtrl",

    "./controllers/sys/profileCtrl",
], function (angular) {
    'use strict';
    var myApp = angular.module("myApp", [
        "app.controllers",
        "sys.controllers",
        "ngRoute"
    ]);

    myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
        //$stateProvider
        //.state('login', {
        //    url: '/login',
        //    templateUrl: 'login.html',
        //    resolve: {
        //        load: loadDeps([
        //            'controllers/sys/mainCtrl'
        //        ])
        //    }
        //})
        //.state('main', {
        //    url: '/sys/main',
        //    templateUrl: '/sys/main.html',
        //    resolve: {
        //        load: loadDeps([
        //            'controllers/sys/mainCtrl'
        //        ])
        //    }
        //})
        //.state('message', {
        //    url: '/sys/message',
        //    templateUrl: '/sys/message.html',
        //    resolve: {
        //        load: loadDeps([
        //            'controllers/sys/mainCtrl'
        //        ])
        //    }
        //})
        function loadDeps(deps) {
            return [
                '$q', function ($q) {
                    var def = $q.defer();
                    require(deps, function () {
                        def.resolve();
                    });
                    return def.promise;
                }
            ];
        }
    }]);
    myApp.controller('navCtrl', function ($scope, $rootScope, $q, $state, $http, $location) {
        console.log("navCtrl")
        $rootScope.curnav = "sys";
        $rootScope.navnames = [
            {title: "运营平台管理", name: "sys", rurl: "./#/sys"},
            {title: "客户管理", name: "client", rurl: "./#/client"},
            {title: "商家管理", name: "merchant", rurl: "./#/merchant"}]


        $rootScope.selectedNav = 0;

        $rootScope.changeNav = function (index) {
            $rootScope.selectedNav = index;
            $rootScope.curnav =  $rootScope.navnames[index].name;
            $rootScope.changeNavMenu($rootScope.navnames[index]);

        }
    })
    return myApp;
});