/**
 * Created by ss on 2015/8/20.
 */
ControllerModule.controller('OrderDetailCtrl', function ($scope, $state, $stateParams) {

    $scope.order = $stateParams.order;

    $scope.hasPaid = $scope.order.orderStatus != "等待支付";

    $scope.userInfo = $stateParams.userInfo;

    $scope.dishes = $stateParams.dishes;

});