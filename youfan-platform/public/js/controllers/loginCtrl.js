/**
 * Created by Administrator on 2015/8/14.
 */
//var authorityApp = angular.module('app.Authority', []);

define(["./module"], function (ctrs) {
    ctrs.controller('loginCtrl',function ($scope, $rootScope, $q,$state,$http) {
        console.log("loginCtrl")

        $scope.login = function () {
            console.log($state)
            $state.go("index",{})
            //$http({
            //    method: 'GET',
            //    url: '/server/login'
            //}).success(function (data, status) {
            //    console.log(status)
            //    if(status==200){
            //        $state.go("index")
            //    }
            //})
        }
    })
});
