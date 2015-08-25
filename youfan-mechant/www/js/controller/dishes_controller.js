/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('dishes', dishes);

    function dishes($scope, $filter, $state, $ionicSlideBoxDelegate,$stateParams) {

        $scope.ways = [{name: "配送", id: 0}, {name: "上门", id: 1}, {name: "要做的菜", id: 2}];

        $scope.dishesIndex = 0;
        if($stateParams.path == 'dishes') {
            $scope.dishesIndex = 2;
        }

        $scope.activedishes = function (dishesIndex) {
            $scope.dishesIndex = dishesIndex;
            $ionicSlideBoxDelegate.enableSlide([false])

        };

        $scope.slideIndex = 1;
        $scope.activeSlide = function (slideIndex) {
            $scope.slideIndex = slideIndex;
            $ionicSlideBoxDelegate.enableSlide([false]);
        };


        $scope.status_list = [{name: "新订单", id: 1, number: 0},
            {name: "已接单", id: 3, number: 0},
            {name: "已完成", id: 100, number: 0},
            {name: "退款中", id: 31, number: 0},
            {name: "已退款", id: 39, number: 0}];


        $scope.orders = [
            {
                id: 135268549,
                img: "http://www.touxiang.cn/uploads/20140218/18-074928_617.jpg",
                state: "待付款",
                place: "天府软件园",
                name: "",
                rmb: "￥98.00",
                time: "2014.11.08 下午13:00"
            },
            {
                id: 135268549,
                img: "../img/ifzk.jpeg",
                state: "待付款",
                place: "天府软件园",
                rmb: "￥198.00",
                time: "2014.11.08 下午13:00"
            }
        ]

    }
})();