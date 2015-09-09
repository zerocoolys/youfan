/**
 * Created by Fzk lwek on 2015/8/21.
 */
/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('news', news)
        .factory("jpushService", ["$http", "$window", function ($http, $window) {
            var jpushServiceFactory = {};
            //启动极光推送
            var _init = function () {
                console.log($window)
                $window.plugins.jPushPlugin.init();
                $window.plugins.jPushPlugin.setDebugMode(true);
            };

            //停止极光推送
            var _stopPush = function () {
                $window.plugins.jPushPlugin.stopPush();
            };

            //重启极光推送
            var _resumePush = function () {
                $window.plugins.jPushPlugin.resumePush();
            };

            //设置标签和别名
            var _setTagsWithAlias = function (tags, alias) {
                $window.plugins.jPushPlugin.setTagsWithAlias(tags, alias);
            };

            //设置标签
            var _setTags = function (tags) {
                $window.plugins.jPushPlugin.setTags(tags);
            };

            //设置别名
            var _setAlias = function (alias) {
                $window.plugins.jPushPlugin.setAlias(alias);
            };


            jpushServiceFactory.init = _init;
            jpushServiceFactory.stopPush = _stopPush;
            jpushServiceFactory.resumePush = _resumePush;

            jpushServiceFactory.setTagsWithAlias = _setTagsWithAlias;
            jpushServiceFactory.setTags = _setTags;
            jpushServiceFactory.setAlias = _setAlias;

            return jpushServiceFactory;
        }]);

    function news($scope, $filter, $state, $ionicSlideBoxDelegate, jpushService) {
        console.log()

        $scope.newsIndex = 0;
        $scope.activenews = function (newsIndex) {
            $scope.newsIndex = newsIndex;
            $ionicSlideBoxDelegate.enableSlide([false])

        };

        $scope.slideIndex = 0;
        $scope.activeSlide = function (slideIndex) {
            $scope.slideIndex = slideIndex;
            $ionicSlideBoxDelegate.enableSlide([false])


        };


        $scope.dorders = [1, 2, 3, 4, 5];
        $scope.ways = [1, 2]


        $scope.message = "";

        $scope.options = {
            tags: "",
            alias: ""
        };

        $scope.init = function () {
            jpushService.init();
            $ionicPopup.alert({
                title: '提示',
                template: '启动推送服务成功'
            });
        };

        $scope.stopPush = function () {
            jpushService.stopPush();
            $ionicPopup.alert({
                title: '提示',
                template: '停止服务成功'
            });
        };

        $scope.resumePush = function () {
            jpushService.resumePush();
            $ionicPopup.alert({
                title: '提示',
                template: '重启完成'
            });
        };

        $scope.setTags = function () {
            var tagArr = $scope.options.tags.split(',');
            jpushService.setTags(tagArr);
        };

        $scope.setAlias = function () {
            var alias = $scope.options.alias;
            jpushService.setAlias(alias);
        };

        $scope.cleanTagAndAlias = function () {
            var tags = [];
            var alias = "";
            jpushService.setTagsWithAlias(tags, alias);
        }
    }
})();
