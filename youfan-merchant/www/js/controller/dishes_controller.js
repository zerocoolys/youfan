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

        $scope.status_list = [{name: "新订单", id: 2, number: 0},
            {name: "已接单", id: 3, number: 0},
            {name: "已完成", id: 4, number: 0},
            {name: "退款中", id: -1, number: 0},
            {name: "已退款", id: -2, number: 0}];


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
        $scope.statusIndex = 2;
        $scope.selectedStatus = function (statusIndex) {
            $scope.statusIndex = statusIndex;
            $ionicSlideBoxDelegate.enableSlide([false]);
            $scope.loadOrderOrDishData();
        };

        $scope.loadSummaryData = function () {
            var url = "http://127.0.0.1:8080/orders/merchant/summary?";
            var merchant = {};
            merchant.sellerId = "888888888"; //获取商家用户ID

            url = url+"sellerId="+merchant.sellerId;
            console.log(url);

            $http.get(url).success
            (function (res) {

                if(res == null) {
                    alert("网络链接异常，请检查!");
                    return;
                }
                if(res.code == 1) {
                    alert("数据异常，请稍等!");
                    return;
                }
                console.log(res);
            });


        }
        /**处理加载后的数据*/
        $scope.disposeOrderOrDishData = function (datas) {
            if(datas == null) {
                return;
            }
            $scope.orders = datas;
        }

        /**加载订单数据或菜品数据*/
        $scope.loadOrderOrDishData = function () {
            var url = "";
            var merchant = {};

            url = "http://127.0.0.1:8080/orders/merchant?";
            merchant.sellerId = "888888888"; //获取商家用户ID
            merchant.orderStatus = $scope.statusIndex; //获取状态选择

            //订单（配送或上门）
            if($scope.headerIndex == 'PS') {
                merchant.repastMode = "PS";
            } else if($scope.headerIndex == 'SM'){
                merchant.repastMode = "SM";
            } else if($scope.headerIndex == 'YZDC') {
                merchant.repastMode = "";
                merchant.orderStatus = 3;
            }

            url = url+"orderStatus="+merchant.orderStatus+"&sellerId="+merchant.sellerId+"&repastMode="+merchant.repastMode;
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

        $scope.loadSummaryData();
        $scope.loadOrderOrDishData();


        $scope.goToDetail = function (orderNo) {
            $state.go('order_Details',{ 'orderNo':orderNo,'orderStatus':$scope.statusIndex});
        }

    }
})();
