/**
 * Created by Fzk lwek on 2015/8/25.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('home', home);

    function home($scope, $filter, $state, $ionicActionSheet, $ionicSlideBoxDelegate) {

       $scope.citys=[
           '北京','上海市','重庆市'
       ];
        $scope.Provinces=[
            '黑龙江省','四川省','河北省'
        ];
    }
})();