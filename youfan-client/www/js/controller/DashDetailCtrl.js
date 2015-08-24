/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('DashDetailCtrl', function ($scope, $state, $http, $ionicSlideBoxDelegate, Order, REST_URL, $ionicPopup, $timeout, $ionicModal, $ionicBackdrop) {
//    $scope.dash = Dash.get($stateParams.dashId);
    $scope.$root.tabsHidden = "tabs-hide";
    $scope.slideIndex = 0;
    //购物车显示隐藏
    $scope.menuState = {
        show: false
    }
    $scope.toggleMenu = function () {
        $scope.menuState.show = !$scope.menuState.show;
    }
    $scope.ShopClose = function () {
        $scope.menuState.show = false;
    }
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
            $scope.subtotal = count
        }
    };

    $scope.orderCartMap = new Map();

    $scope.confirmOrder = function () {
        $scope.menuState.show = false;
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
    $scope.showActionsheet = function () {

        $ionicActionSheet.show({
            cssClass: 'shop_cart',
            templateUrl: 'shop-cart.html',
            buttons: [
                {text: '<span class="alleft"></span> <span class="alleft">1元</span> <i class="ion-plus-round"></i>3333<i class="ion-minus-round" ng-click="count = count + 1" ng-init="count=0"></i>'},
                {text: '<i class="icon ion-arrow-move"></i> Move'},
            ],
            /*    destructiveText: 'Delete',*/
            cancel: function () {
                console.log('CANCELLED');
            },
            /*        buttonClicked: function(index) {
             console.log('BUTTON CLICKED', index);
             return true;
             },*/
            destructiveButtonClicked: function () {
                console.log('DESTRUCT');
                return true;
            }
        });
    };
    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.showPopup = function () {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<ul>' +
            '<li ng-repeat="food in foods""><span class="alleft">{{food.name}} </span><span class="alleft">{{food.price}}</span><i class="ion-minus-round" ng-hide="count_show" ng-click="count = count - 1" ng-init="count=0"></i> {{count}}<i class="ion-plus-round" ng-click="count = count + 1" ng-init="count=0"></i> </li>' +
            '</ul>',
            scope: $scope,
            cssClass: 'shop_cart'
        });
    };
    $scope.foods = [
        {name: "鱼香茄子", price: "13元"},
        {name: "鱼香茄子", price: "14元"},
        {name: "鱼香茄子", price: "13元"},
        {name: "鱼香茄子", price: "14元"},
        {name: "鱼香茄子", price: "13元"}
    ];
});