/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('DashDetailCtr', function ($scope, $stateParams, $ionicSlideBoxDelegate) {
//    $scope.dash = Dash.get($stateParams.dashId);
    $scope.$root.tabsHidden = "tabs-hide";
    $scope.slideIndex = 0;
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    }
    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };
});