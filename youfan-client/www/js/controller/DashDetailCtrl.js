/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('DashDetailCtrl', function ($scope, $http, $ionicSlideBoxDelegate, REST_URL) {

    $scope.$root.tabsHidden = "tabs-hide";
    $scope.slideIndex = 0;

    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };

    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };

    $scope.sellerId = 196830201;

    $scope.menuArr = [];

    $http.get(REST_URL + '/menu/list/' + $scope.sellerId).success(function (data) {
        var jsonArr = JSON.parse(data.menus);

        for (var i = 0, l = jsonArr.length; i < l; i++) {
            jsonArr[i].price = parseFloat(jsonArr[i].price).toFixed(2);
        }

        $scope.menuArr = jsonArr;
    });

    $scope.cart = new Map();

    $scope.addToCart = function (menu) {
        if (menu.restNum > 0) {
            $scope.cart.put(menu.menuId, menu);

            var total = 0;
            $scope.cart.values().forEach(function (item, i) {
                total += item.price;
            });

            $scope.subtotal = parseFloat(total).toFixed(2);
        }
    };

    $scope.removeFromCart = function (menuId) {
        $scope.cart.remove(menuId)
    };

    $scope.subtotal = 0;

});