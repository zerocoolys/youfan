/**
 * Created by perfection on 15-8-24.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('merchant_login', merchant_login);
    function merchant_login($scope, $filter, $state,$rootScope,$http,$location) {
        $scope.signIn = function (user) {
            return $http.post(
                "http://127.0.0.1:8080/user/login", JSON.stringify(user), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                    $scope.user = data;
                    $rootScope.user = $scope.user;
                    $location.path("overview")
                }, function (error) {
                    console.log(error)
                });

        };
        $scope.register = function (user) {
            return $http.post(
                "http://127.0.0.1:8080/user/register", JSON.stringify(user), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                    //$state.go("overview");
                    $scope.user = data;
                    $rootScope.user = $scope.user;
                }, function (error) {
                    console.log(error)
                });

        };
    }
})();