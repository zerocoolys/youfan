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

    $scope.pay = function () {
        console.log("Pay ...");
    };

    $scope.loadCart = function () {
        console.log(JSON.stringify(Order.details.cart));
    }

});