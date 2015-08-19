/**
 * Created by ss on 2015/8/18.
 */
ControllerModule.controller('DiningWayCtrl', function ($scope, $stateParams, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/dining-address.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
});