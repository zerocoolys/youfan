/**
 * Created by on 2015-08-27.
 *
 * @author dolphineor
 */
ControllerModule.controller('OrderPayCtrl', function ($scope, $http, ChargeService, Order, REST_URL) {

    $scope.totalPrice = Order.details.price;

    $scope.chargeParams = {
        subject: "youfan subject",
        body: "youfan body",
        amount: $scope.totalPrice,
        order_no: "123456789",
        channel: "",
        currency: "cny",
        client_ip: ""
    };

    // TODO 支付宝支付 & 微信支付
    $scope.pay = function (channel) {
        $scope.chargeParams.channel = channel;

        $http.get('http://ipv4.myexternalip.com/json').success(function (data) {
            $scope.chargeParams.client_ip = data.ip;
            alert(JSON.stringify($scope.chargeParams));

            ChargeService.getCharge($scope.chargeParams).then(function (charge) {
                console.log(charge);
            });
        }).error(function (err) {
            console.log(err);
        });
    }

});