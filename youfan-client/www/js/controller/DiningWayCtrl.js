/**
 * Created by ss on 2015/8/18.
 */
ControllerModule.controller('DiningWayCtrl', function ($scope, $rootScope, $state, $ionicModal, REST_URL, Order, Merchant, User) {

    $ionicModal.fromTemplateUrl('templates/personalcenter/add-address.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // ========================= dolphineor =========================
    $scope.merchantInfo = Merchant;

    // 自取
    $scope.pickUp = function () {
        $rootScope.userDiningWay.pickUp = true;
        $rootScope.userDiningWay.address = $scope.merchantInfo;
        $state.go('tab.confirm-order');
    };

    // 配送
    $scope.addAddress = function () {
        // Add address
    };

});