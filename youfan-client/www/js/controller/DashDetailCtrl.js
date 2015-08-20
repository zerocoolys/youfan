/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('DashDetailCtrl', function ($scope, $state, $http, $ionicSlideBoxDelegate, Order, REST_URL) {

//    $scope.dash = Dash.get($stateParams.dashId);
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

    $scope.cart = [];

    $scope.addToCart = function (menu) {
        if (menu.restNum > 0) {
            $scope.cart.push(menu);

            var total = 0;
            $scope.cart.forEach(function (item, i) {
                total += parseFloat(item.price);
            });

            $scope.subtotal = total.toFixed(2);
        }
    };

    $scope.orderCartMap = new Map();

    $scope.confirmOrder = function () {

        $scope.cart.forEach(function (item) {
            if ($scope.orderCartMap.containsKey(item.menuId)) {
                var o = $scope.orderCartMap.get(item.menuId);
                o.totalPrice = (parseFloat(o.totalPrice) + parseFloat(item.price)).toFixed(2);
                o.count = parseInt(o.count) + 1;
            } else {
                $scope.orderCartMap.put(item.menuId, {
                    'menuId': item.menuId,
                    'name': item.name,
                    'totalPrice': item.price,
                    'count': 1
                })
            }

        });
        Order.details.cart = $scope.orderCartMap.values();
        $scope.orderCartMap.clear();

        $state.go('tab.confirm-order');
    };

    $scope.removeFromCart = function (menuId) {
        $scope.cart.remove(menuId)
    };

    $scope.subtotal = 0;

});