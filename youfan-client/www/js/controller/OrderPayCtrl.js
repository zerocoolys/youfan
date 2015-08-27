/**
 * Created by on 2015-08-27.
 *
 * @author dolphineor
 */
ControllerModule.controller('OrderPayCtrl', function ($scope, $http, Order, REST_URL) {

    $scope.totalPrice = Order.details.price;

    $scope.order = {};


    $scope.createOrder = function () {
        $http.post(REST_URL + '/orders/create', $scope.order).
            then(function (response) {
                console.log("Success");
            }, function (err) {
                console.log(err);
            });
    };

    // charge
    // {"data":"","status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"url":"http://localhost:8080/platform/pay","headers":{"Accept":"application/json, text/plain, */*"}},"statusText":"OK"}

    $scope.aliPay = function () {
        // TODO 支付宝支付
        $http.get(REST_URL + '/platform/pay').
            then(function (charge) {
                console.log(JSON.stringify(charge));

                // Pay
                //pingpp.createPayment(charge, function (result, error) {
                //    if (result == "success") {
                //        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回, 其他的 wap 支付结果都是在 extra 中对应的 URL 跳转.
                //    } else if (result == "fail") {
                //        // charge 不正确或者微信公众账号支付失败时会在此处返回
                //    } else if (result == "cancel") {
                //        // 微信公众账号支付取消支付
                //    }
                //});

            }, function (err) {
                console.log(err);
            });
    };

    $scope.weChatPay = function () {
        // TODO 微信支付
    };

});