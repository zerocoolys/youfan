/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('payCtrl', function ($scope, $rootScope, $q, $state, $http, $location) {
        console.log("payCtrl")

        $scope.rows = [];
        $scope.row_column = 3;
        $scope.wap_pay = function (channel) {
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
        $scope.initAll = function () {
            $http({
                method: 'GET',
                url: 'sys/getPayWay'
            }).success(function (result, status) {
                for(var rowIndex =0;rowIndex<Math.ceil((result.payload.length)/ $scope.row_column);rowIndex++){
                    var cols = [];
                    for(var col=rowIndex* $scope.row_column;col<(rowIndex+1)* $scope.row_column&&col<result.payload.length;col++){
                        result.payload[col].status_btn = result.payload[col].status==1?"关闭":"开启"
                        cols.push(result.payload[col]);
                    }
                    $scope.rows.push(cols)
                }
            })
        }
        $scope.initAll();

        $scope.changePayWayStatu = function(pay_way){
            $http({
                method: 'GET',
                url: 'sys/updatePayWayStatus?id='+pay_way.id+"&status="+(pay_way.status==1?0:1)
            }).success(function (result, status) {
                pay_way.status = pay_way.status==1?0:1
                pay_way.status_btn = pay_way.status==1?"关闭":"开启"
            })
        }
    })
});
