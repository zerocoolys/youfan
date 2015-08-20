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
                   console.log(result);
                   console.log(err);
               });
           })
        }

    })
});
