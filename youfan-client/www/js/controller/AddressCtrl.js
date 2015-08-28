ControllerModule.controller('AddressCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate,$ionicModal) {
    $ionicModal.fromTemplateUrl('templates/personalcenter/add-address.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.slideIndex = 0;
    // Called each time the slide changes
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    }

    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };
});