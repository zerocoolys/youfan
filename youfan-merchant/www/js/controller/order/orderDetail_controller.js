/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('orderDetails', orderDetails);

    function orderDetails($scope, $filter, $state, $ionicSlideBoxDelegate,$stateParams,$http,$rootScope) {



        //根据订单号加载
        url = "http://127.0.0.1:8080/orderDetail/";

        url = url+$stateParams.orderNo;
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
})();
