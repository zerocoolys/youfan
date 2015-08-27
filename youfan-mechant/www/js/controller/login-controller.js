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
                "http://192.168.1.110:8080/user/login", JSON.stringify(user), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {

                    if (data == "" || data == null) {
                        var options = {
                            "title": "瀵嗙爜鎴栬处鍙烽敊璇紒",
                            "buttons": [{
                                text: "鍏抽棴",
                                type: "button-positive clam"
                            }]
                        };
                        $ionicPopup.alert(options)
                            .then(function () {
                                //杩欎釜鍑芥暟鍦ㄥ脊鍑烘鍏抽棴鏃惰璋冪敤
                            });
                    } else {
                        $scope.user = data;
                        $rootScope.user = $scope.user;
                        $location.path("overview")
                    }

                }, function (error) {
                    options = {
                        "title": "绯荤粺绻佸繖锛�",
                        "buttons": [{
                            text: "鍏抽棴",
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
                "http://192.168.1.110:8080/user/register", JSON.stringify(user), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {

                    var options;
                    switch (data.registerStatus){

                        case "1":
                            options = {
                                "title": "娉ㄥ唽鎴愬姛锛�",
                                "buttons": [{
                                    text: "纭畾",
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
                                "title": "娉ㄥ唽澶辫触锛�",
                                "buttons": [{
                                    text: "鍏抽棴",
                                    type: "button-positive clam"
                                }]
                            };
                            $ionicPopup.alert(options)
                                .then(function () {
                                });
                            break;
                        case "-1":
                            options = {
                                "title": "绯荤粺绻佸繖锛�",
                                "buttons": [{
                                    text: "鍏抽棴",
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
                        "title": "绯荤粺绻佸繖锛�",
                        "buttons": [{
                            text: "鍏抽棴",
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