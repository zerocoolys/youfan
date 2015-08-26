/**
 * Created by perfection on 15-8-24.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('merchant_login', merchant_login);
    function merchant_login($scope, $filter, $state, $rootScope, $http, $location, $ionicPopup) {
        $scope.signIn = function (user) {
            $http.post(
                "http://127.0.0.1:8080/user/login", JSON.stringify(user), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {

                    if (data == "" || data == null) {
                        var options = {
                            "title": "密码或账号错误！",
                            "buttons": [{
                                text: "关闭",
                                type: "button-positive clam"
                            }]
                        };
                        $ionicPopup.alert(options)
                            .then(function () {
                                //这个函数在弹出框关闭时被调用
                            });
                    } else {
                        $scope.user = data;
                        $rootScope.user = $scope.user;
                        $location.path("overview")
                    }

                }, function (error) {
                    options = {
                        "title": "系统繁忙！",
                        "buttons": [{
                            text: "关闭",
                            type: "button-positive clam"
                        }]
                    };
                    $ionicPopup.alert(options)
                        .then(function () {
                        });
                });

        };
        $scope.register = function (user) {
            $http.post(
                "http://127.0.0.1:8080/user/register", JSON.stringify(user), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {

                    var options;
                    switch (data.registerStatus){

                        case "1":
                            options = {
                                "title": "注册成功！",
                                "buttons": [{
                                    text: "确定",
                                    type: "button-positive clam"
                                }]
                            };
                            $ionicPopup.alert(options)
                                .then(function () {
                                    $scope.user = data;
                                    $rootScope.user = $scope.user;
                                    $location.path("overview")
                                });
                            break;
                        case "0":
                            options = {
                                "title": "注册失败！",
                                "buttons": [{
                                    text: "关闭",
                                    type: "button-positive clam"
                                }]
                            };
                            $ionicPopup.alert(options)
                                .then(function () {
                                });
                            break;
                        case "-1":
                            options = {
                                "title": "系统繁忙！",
                                "buttons": [{
                                    text: "关闭",
                                    type: "button-positive clam"
                                }]
                            };
                            $ionicPopup.alert(options)
                                .then(function () {
                                });
                            break;
                    }
                }, function (error) {
                    options = {
                        "title": "系统繁忙！",
                        "buttons": [{
                            text: "关闭",
                            type: "button-positive clam"
                        }]
                    };
                    $ionicPopup.alert(options)
                        .then(function () {
                        });
                });

        };
    }
})();