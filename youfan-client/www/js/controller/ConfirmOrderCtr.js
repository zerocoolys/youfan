/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('ConfirmOrderCtrl', function ($scope,$ionicModal) {
//    $scope.$root.tabsHidden = "tabs-hide";
    $ionicModal.fromTemplateUrl('templates/remarks.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/Coupons.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.CouponsModal = modal;
    });
});