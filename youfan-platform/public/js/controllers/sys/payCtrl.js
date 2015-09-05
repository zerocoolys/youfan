/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('payCtrl',function ($scope, $rootScope, $q,$state,$http,$location) {
        console.log("payCtrl")

       $scope.wap_pay =  function (channel) {
            console.log(channel)

           $http({
               method: 'GET',
               url: '/server/pay'
           }).success(function (data, status) {
               console.log("Pay test ")
               console.log(JSON.parse(data))
               pingpp.createPayment(JSON.parse(data), function (result, err) {
                   if (result == "success") {
                       // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                   } else if (result == "fail") {
                       // charge 不正确或者微信公众账号支付失败时会在此处返回
                   } else if (result == "cancel") {
                       // 微信公众账号支付取消支付
                   }
               });
           })
        }


        $scope.pay_ways = [];
        /**
         * 初始化显示所有支付渠道信息
         */
        $scope.initAll = function(){

        }

    })
});
