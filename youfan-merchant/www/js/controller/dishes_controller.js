/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('dishes', dishes);

    function dishes($scope, $filter, $state, $ionicSlideBoxDelegate, $stateParams, $http, $rootScope, YF_MERCHANT_HOST, YF_MERCHANT_INFO) {

        //订单
        $scope.orders = [];
        //订单汇总
        $scope.orderSummary = {};

        $scope.ways = [{name: "配送", code: 'PS'}, {name: "上门", code: 'SM'}, {name: "要做的菜", code: 'YZDC'}];

        $scope.status_list = [{name: "新订单", id: 2, code: "ORDER_PAYED", number: 0},
            {name: "已接单", id: 3, code: "ORDER_MERCHANT_CONFIRM", number: 0},
            {name: "已完成", id: 4, code: "ORDER_DISH_FINISHED", number: 0},
            {name: "退款中", id: -1, code: "ORDER_WITHDRAW", number: 0},
            {name: "已退款", id: -2, code: "ORDER_COMPELETE_WITHDRAW", number: 0}];


        $scope.headerIndex = 'PS';
        if ($stateParams.path == 'dishes') {
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


        /**处理加载后的数据*/
        $scope.disposeSummaryData = function (datas) {
            if (datas == null) {
                return ;
            }
            $scope.orderSummary = datas;
            $scope.status_list [0].number = datas.ORDER_PAYED;
            $scope.status_list [1].number = datas.ORDER_MERCHANT_CONFIRM;
            $scope.status_list [2].number = datas.ORDER_DISH_FINISHED;
            $scope.status_list [3].number = datas.ORDER_WITHDRAW;
            $scope.status_list [4].number = datas.ORDER_COMPELETE_WITHDRAW;


        }


        $scope.loadSummaryData = function () {
            var url = YF_MERCHANT_HOST + "/orders/merchant/summary?";
            var merchant = {};

            url = url + "sellerId=" + YF_MERCHANT_INFO.mID;
            console.log(url);

            $http.get(url).success
            (function (res) {

                if (res == null) {
                    alert("网络链接异常，请检查!");
                    return;
                }
                if (res.code == 1) {
                    alert("数据异常，请稍等!");
                    return;
                }
                $scope.disposeSummaryData(res.payload);
            });
        }
        /**处理加载后的数据*/
        $scope.disposeOrderOrDishData = function (datas) {
            if (datas == null) {
                return;
            }
            $scope.orders = datas;
        }

        /**加载订单数据或菜品数据*/
        $scope.loadOrderOrDishData = function () {
            var url = "";
            var merchant = {};

            url = YF_MERCHANT_HOST + "/orders/merchant?";
            merchant.orderStatus = $scope.statusIndex; //获取状态选择

            //订单（配送或上门）
            if ($scope.headerIndex == 'PS') {
                merchant.repastMode = "PS";
            } else if ($scope.headerIndex == 'SM') {
                merchant.repastMode = "SM";
            } else if ($scope.headerIndex == 'YZDC') {
                merchant.repastMode = "";
                merchant.orderStatus = 3;
            }

            url = url + "orderStatus=" + merchant.orderStatus + "&sellerId=" + YF_MERCHANT_INFO.mID + "&repastMode=" + merchant.repastMode;
            console.log(url);


            $http.get(url).success
            (function (res) {

                $scope.orders = [];
                if (res == null) {
                    alert("网络链接异常，请检查!");
                    return;
                }
                if (res.code == 1) {
                    alert("数据异常，请稍等!");
                    return;
                }
                $scope.disposeOrderOrDishData(res.payload);
            });
        }

        $scope.loadSummaryData();
        $scope.loadOrderOrDishData();


        $scope.goToDetail = function (orderNo) {
            $state.go('order_Details', {'orderNo': orderNo, 'orderStatus': $scope.statusIndex});
        }

    }
})();
