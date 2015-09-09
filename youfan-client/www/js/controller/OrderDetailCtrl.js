/**
 * Created by ss on 2015/8/20.
 */
ControllerModule.controller('OrderDetailCtrl', function ($scope, $stateParams, $http, $ionicSlideBoxDelegate, REST_URL) {
    $scope.order = $stateParams.order;

    $scope.loadOrderData = function () {
        // 获取订单的菜品信息
        $http.get(REST_URL + 'orders/' + $scope.order.orderNo + '/dishes').success(function (data) {
            console.log(data);
        }).error(function (err) {
            console.log(err);
        });
    }

});