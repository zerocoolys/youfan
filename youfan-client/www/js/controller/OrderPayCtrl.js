/**
 * Created by on 2015-08-27.
 *
 * @author dolphineor
 */
ControllerModule.controller('OrderPayCtrl', function ($scope, $stateParams, $http, ChargeService) {

    $scope.discountPrice = $stateParams.discountPrice;

    $scope.chargeParams = {
        subject: "youfan order subject",
        body: "youfan order body",
        amount: parseInt(parseFloat($stateParams.discountPrice) * 100),
        orderNo: $stateParams.orderNo,
        channel: "",
        currency: "cny",
        clientIp: ""
    };

    $scope.pay = function (channel) {
        $scope.chargeParams.channel = channel;

        $http.get('http://ipv4.myexternalip.com/json').success(function (data) {
            $scope.chargeParams.clientIp = data.ip;

            ChargeService.getCharge($scope.chargeParams).then(function (charge) {
                alert(JSON.stringify(charge));
                pingpp.createPayment(charge, function (result, error) {
                    if (result == "success") {
                        // 只有微信公众账号wx_pub支付成功的结果会在这里返回, 其他的wap支付结果都是在extra中对应的URL跳转.
                        console.log("success");
                    } else if (result == "fail") {
                        // charge不正确或者微信公众账号支付失败时会在此处返回
                        console.log(result);
                    } else if (result == "cancel") {
                        // 微信公众账号支付取消支付
                        console.log("cancel");
                    }
                });
            });
        }).error(function (err) {
            console.log(err);
        });
    }

});