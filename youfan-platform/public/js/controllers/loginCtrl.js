/**
 * Created by Administrator on 2015/8/14.
 */
//var authorityApp = angular.module('app.Authority', []);

define(["./module"], function (ctrs) {
    ctrs.controller('loginCtrl',function ($scope, $rootScope, $q,$state,$http,$location, $window) {
        $scope.login = function () {

            $http({
                method: 'GET',
                url: '/server/login'
            }).success(function (data, status) {
                $window.location.href = "/#/sys"
            })
        }
    })
});
