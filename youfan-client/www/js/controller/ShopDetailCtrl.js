ControllerModule.controller('ShopDetailCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate) {
    $scope.$root.tabsHidden = "tabs-hide";
    $scope.slideIndex = 0;
    // Called each time the slide changes
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    }

    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };

})