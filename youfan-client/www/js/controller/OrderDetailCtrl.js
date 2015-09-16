/**
 * Created by ss on 2015/8/20.
 */
ControllerModule.controller('OrderDetailCtrl', function ($scope, $state, $stateParams, $http, PopupService, REST_URL) {

    // 订单信息
    $scope.order = $stateParams.order;

    // 支付按钮
    $scope.hasPaid = $scope.order.orderStatus != 1;

    // 退款按钮
    $scope.refundClass = $stateParams.refundClass;

    // 确认收货按钮
    $scope.receivingConfirmationClass = $stateParams.receivingConfirmationClass;

    // 用户信息
    $scope.userInfo = $stateParams.userInfo;

    // 菜品信息
    $scope.dishes = $stateParams.dishes;

    $scope.orderParams = {
        buyerId: $scope.order.buyerId,
        orderNo: $scope.order.orderNo,
        sourceOrderStatus: $scope.order.orderStatus
    };


    // 执行退款操作
    $scope.refund = function () {
        $scope.orderRequest(REST_URL + '/orders/refund');
    };

    // 确认收货
    $scope.receivingConfirmation = function () {
        $scope.orderRequest(REST_URL + '/orders/receivingConfirmation');
    };

    $scope.orderRequest = function (orderRequestUrl) {
        $http.post(orderRequestUrl, $scope.orderParams).then(
            function (response) {
                PopupService.showAlert($scope, response.data.msg);
                //console.log(JSON.stringify(response));
                $state.go('tab.order');
            }, function (error) {
                console.log(error);
            });
    }

});