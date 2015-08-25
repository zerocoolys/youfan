/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('dishes', dishes);

    function dishes($scope, $filter, $state, $ionicSlideBoxDelegate,$stateParams,$http,$rootScope) {

        $scope.ways = [{name: "配送", id: 'PS'}, {name: "上门", id: 'SM'}, {name: "要做的菜", id: 'YZDC'}];


        $scope.headerIndex = 'PS';
        if($stateParams.path == 'dishes') {
            $scope.headerIndex = 'YZDC';
        }

        $scope.selectedHeader = function (headerIndex) {
            $scope.headerIndex = headerIndex;
            $ionicSlideBoxDelegate.enableSlide([false])
        };

        $scope.statusIndex = 1;
        $scope.activeSlide = function (statusIndex) {
            $scope.statusIndex = statusIndex;
            $ionicSlideBoxDelegate.enableSlide([false]);
        };


        $scope.status_list = [{name: "新订单", id: 1, number: 0},
            {name: "已接单", id: 3, number: 0},
            {name: "已完成", id: 100, number: 0},
            {name: "退款中", id: 31, number: 0},
            {name: "已退款", id: 39, number: 0}];


        $scope.disposeOrderOrDishData = function (datas) {
            if(datas == null) {
                return;
            }




        }



        $scope.loadOrderOrDishData = function () {
            var url = "";
            var merchant = {};
            //订单或菜品
            if($scope.dishesIndex == 2) {
                url = "";
            } else {
                url = "http://127.0.0.1:8080/orders/merchants/";
                //订单（配送或上门）
                if($scope.dishesIndex == 0) {
                    merchant.repastMode = "PS";
                } else if($scope.dishesIndex == 1){
                    merchant.repastMode = "SM";
                }
            }
            merchant.sellerId = "2";
            merchant.orderStatus = $scope.statusIndex;

            url = url+ JSON.stringify(merchant);

            $http.get(url).success
            (function (res) {
                    if(res == null) {
                        alert("后台正在更新，请稍等。");
                        return;
                    }
                    if(res.code == 1) {
                        alert(res.msg);
                        return;
                    }

                $scope.disposeOrderOrDishData(res.payload);
            });
        }



        $scope.loadOrderData();

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