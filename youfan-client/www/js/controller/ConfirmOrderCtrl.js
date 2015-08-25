/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('ConfirmOrderCtrl', function ($scope, $ionicModal, Order, REST_URL) {

    $ionicModal.fromTemplateUrl('templates/remarks.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/Coupons.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.CouponsModal = modal;
    });

    // 订单
    $scope.order = {
        items: [],  // 菜品
        price: 0,
        repastMode: '',  // 就餐方式
        repastAddress: '',  // 就餐地址
        coupons: 0,  // 优惠券
        comments: ''    // 备注
    };

    // 购物车
    $scope.cart = {};

    // 此次订单的总价
    $scope.totalPrice = 0;

    // 剩余支付
    $scope.remainPayedPrice = 0;

    // 支付
    $scope.pay = function () {
        $http.post(REST_URL + '/orders/create', $scope.order).
            then(function (response) {
                console.log("Success");
            }, function (err) {
                console.log(err);
            });
    };

    $scope.loadCart = function () {
        $scope.cart.data = Order.details.cart;

        var _total = 0;
        $scope.cart.data.forEach(function (item) {
            _total += parseFloat(item.totalPrice);
        });

        $scope.totalPrice = _total.toFixed(2);

        // TODO 计算剩余支付, 当前默认使用订单总价
        $scope.remainPayedPrice = $scope.totalPrice;

    }

});