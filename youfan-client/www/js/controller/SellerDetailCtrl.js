ControllerModule.controller('SellerDetailCtrl', function ($scope, $http, Merchant, $stateParams, $ionicSlideBoxDelegate) {
    $scope.$root.tabsHidden = "tabs-hide";
    $scope.user = {};
    $scope.kin = {};
    $scope.initKitchenStory = function () {
        $scope.user = Merchant.userInfo;
        $scope.kin = Merchant.kinInfo;
    }
    $scope.initKitchenStory();
})