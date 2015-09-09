// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('yf_merchant', ['ionic', 'ionic-datepicker', 'ngCordova', 'yf_merchant.base_service', 'yf_merchant.settings_controllers', 'yf_merchant.tutorial_controllers', 'yf_merchant.manage_dishes_controllers'])
    .run(function ($rootScope, $ionicPlatform, $state) {
        $rootScope.goState = function (state) {
            $state.go(state);
        };
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

            //启动极光推送服务
            window.plugins.jPushPlugin.init();

            //调试模式

            window.plugins.jPushPlugin.setDebugMode(true);
        });

    })

    .directive('youFanMsg', function ($timeout) {
        return {
            restrict: 'EA',
            templateUrl: 'templates/comment/msg_comment.html',
            link: function (scope, element, attrs, ngModel) {
                scope.msgObj = {flag: false, msg: ""};
                element.css({
                    "z-index": 10,
                    "width": "100%",
                    "position": "fixed",
                    "bottom": "10%"
                });

                scope.$on("youfan-merchant-show-msg", function (e, msg) {
                    scope.msgObj.flag = true;
                    scope.msgObj.msg = msg;
                    $timeout(function () {
                        scope.msgObj = {flag: false, msg: ""};
                    }, 1000);
                });
            }
        }
    })

    .factory('YF_MERCHANT_HOST', function () {
        return "http://192.168.1.111:8080";
    })

    .factory('YF_MERCHANT_INFO', function () {
        var m_info = {
            mID: "888888888"
        };
        return m_info;
    })

    .factory('YF_MERCHANT_LOADING_COMMENT', function () {
        return "templates/comment/loading_comment.html";
    })

;
/*
 全局firebaseio
 */
//var firebaseio = new Firebase("https://youfan-mechant.firebaseio.com/");
