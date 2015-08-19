/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('DashDetailCtrl', function ($scope, $http, $ionicSlideBoxDelegate, REST_URL) {

//    $scope.dash = Dash.get($stateParams.dashId);
    $scope.$root.tabsHidden = "tabs-hide";
    $scope.slideIndex = 0;

    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };

    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };

    $scope.menuArr = [];

    $http.get(REST_URL + '/menu/list/196830201').success(function (data) {
        $scope.menuArr = JSON.parse(data.menus);
    });

    $scope.cart = new Map();

    $scope.addToCart = function (menuId, restNum) {
        if (restNum > 0) {
            $scope.cart.put(menuId, menuId)
        }
    };

    $scope.removeFromCart = function (menuId) {
        $scope.cart.remove(menuId)
    }

});