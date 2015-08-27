/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('dishes', dishes);

    function dishes($scope, $filter, $state, $ionicSlideBoxDelegate,$stateParams,$http,$rootScope) {

        $scope.orders = [];
        $scope.ways = [{name: "配送", code: 'PS'}, {name: "上门", code: 'SM'}, {name: "要做的菜", code: 'YZDC'}];

        $scope.status_list = [{name: "新订单", id: 1, number: 0},
            {name: "已接单", id: 3, number: 0},
            {name: "已完成", id: 100, number: 0},
            {name: "退款中", id: 31, number: 0},
            {name: "已退款", id: 39, number: 0}];


        $scope.headerIndex = 'PS';
        if($stateParams.path == 'dishes') {
            $scope.headerIndex = 'YZDC';
        }
        /**切换标题*/
        $scope.selectedHeader = function (headerIndex) {
            $scope.headerIndex = headerIndex;
            $ionicSlideBoxDelegate.enableSlide([false]);
            $scope.loadOrderOrDishData();
        };
        /**切换订单状态*/
        $scope.statusIndex = 1;
        $scope.selectedStatus = function (statusIndex) {
            $scope.statusIndex = statusIndex;
            $ionicSlideBoxDelegate.enableSlide([false]);
        };


        /**处理加载后的数据*/
        $scope.disposeOrderOrDishData = function (datas) {
            if(datas == null) {
                return;
            }
            $scope.orders = datas;

            console.log($scope.orders);
        }

        /**加载订单数据或菜品数据*/
        $scope.loadOrderOrDishData = function () {
            var url = "";
            var merchant = {};

            url = "http://127.0.0.1:8080/orders/merchants/";
            //订单（配送或上门）
            if($scope.headerIndex == 'PS') {
                merchant.repastMode = "PS";
            } else if($scope.headerIndex == 'SM'){
                merchant.repastMode = "SM";
            } else if($scope.headerIndex == 'YZDC') {
                merchant.repastMode = "";
            }

            merchant.sellerId = "2"; //获取商家用户ID
            merchant.orderStatus = $scope.statusIndex; //获取状态选择

            url = url+ JSON.stringify(merchant);

            console.log(url);

            $http.get(url).success
            (function (res) {
                    $scope.orders = [];
                    if(res == null) {
                        alert("网络链接异常，请检查!");
                        return;
                    }
                if(res.code == 1) {
                    alert("数据异常，请稍等!");
                    return;
                    }
                $scope.disposeOrderOrDishData(res.payload);
            });
        }

        $scope.loadOrderOrDishData();
    }
})();