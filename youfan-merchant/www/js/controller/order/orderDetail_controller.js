/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('orderDetails', orderDetails);

    function orderDetails($scope, $filter, $state, $ionicSlideBoxDelegate,$stateParams,$http,$rootScope) {


        $scope.detialOrder = {};

        /**处理加载后的数据*/
        $scope.disposeDetailData = function (datas) {
            if(datas == null) {
                return;
            }
            $scope.detialOrder = datas;
        }


        $scope.loadDetailData = function () {

            var url = "http://127.0.0.1:8080/orders/orderDetail/";

            url = url + $stateParams.orderNo;

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

                $scope.disposeDetailData(res.payload);
            });
        }


        $scope.updateStatus = function(orderNo) {
            var url = "http://127.0.0.1:8080/orders/merchant/";

            url = url + $stateParams.orderNo;


            //pupdate:{method:'PATCH',headers: {'Content-Type': 'application/json'}}


            $http.post(url, { orderStatus: 4 }).success(function(res) {

                    console.log(res);

            });


        }


        $scope.loadDetailData();

    }
})();
