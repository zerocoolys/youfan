/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('DashDetailCtrl', function ($scope, $state, $http, $ionicSlideBoxDelegate, Order, Merchant, REST_URL, $ionicPopup, $timeout) {

    // ========================= guochunyan =========================
    $scope.$root.tabsHidden = "tabs-hide";
    $scope.slideIndex = 0;

    //购物车显示隐藏
    $scope.menuState = {
        show: false
    };
    $scope.toggleMenu = function () {

        if (!$scope.orderCartMap.isEmpty()) {
            if (parseInt($scope.rice.count) == 0) {
                $scope.rice.count = 1;
            }

            if (!$scope.orderCartMap.containsKey($scope.rice.menuId)) {
                $scope.orderCartMap.put($scope.rice.menuId, $scope.rice);
            }

            $scope.items.data = Order.cart = $scope.orderCartMap.values();
            $scope.menuState.show = !$scope.menuState.show;
        }

    };
    $scope.ShopClose = function () {
        $scope.menuState.show = false;
    };
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };
    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };

    $scope.ZanPopup = function () {
        $scope.data = {};
        var myPopup = $ionicPopup.show({
            cssClass: 'zan_popup',
            template: '点赞成功',
            scope: $scope
        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1000);
    };

    $scope.CPopup = function () {
        var myPopup = $ionicPopup.show({
            cssClass: 'zan_popup',
            template: '收藏成功',
            scope: $scope
        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1000);
    };


    // ========================= dolphineor =========================
    $scope.items = {
        data: []
    };

    // 米饭
    $scope.rice = {
        'menuId': 21354687,
        'name': "米饭",
        'unitPrice': 1,
        'totalPrice': 0,
        'count': 1
    };

    // 减少份数
    $scope.minusItem = function (menuId) {
        if ($scope.orderCartMap.containsKey(menuId)) {
            var item = $scope.orderCartMap.get(menuId);

            if (item.count > 0) {
                item.count -= 1;

                if (item.count == 0) {
                    if (item.name == "米饭") {
                        if ($scope.orderCartMap.size() == 1) {
                            $scope.removeRowFromCart(menuId);
                            $scope.orderCartMap.remove(menuId);
                        }
                    } else {
                        $scope.removeRowFromCart(menuId);
                        $scope.orderCartMap.remove(menuId);

                        if ($scope.orderCartMap.size() == 1 && $scope.orderCartMap.containsKey($scope.rice.menuId)) {
                            $scope.rice.count = 1;
                            $scope.rice.totalPrice = 0;
                            $scope.removeRowFromCart($scope.rice.menuId);
                            $scope.orderCartMap.remove($scope.rice.menuId);
                        }
                    }
                } else {
                    item.totalPrice = (parseFloat(item.totalPrice) - parseFloat(item.unitPrice)).toFixed(2);
                    $scope.orderCartMap.put(menuId, item);
                }

            }

            if ($scope.items.data.length == 0) {
                $scope.orderCartMap.clear();
            }

            $scope.cartPostAction();
        }

    };

    // 添加份数
    $scope.plusItem = function (menuId) {
        if ($scope.orderCartMap.containsKey(menuId)) {
            var item = $scope.orderCartMap.get(menuId);
            if (item.name == "米饭" && item.count == 0) {
                item.count += 1;
                item.totalPrice = 0;
                $scope.orderCartMap.put(menuId, item);
            } else {
                if (item.count > 0) {
                    item.count += 1;
                    item.totalPrice = (parseFloat(item.totalPrice) + parseFloat(item.unitPrice)).toFixed(2);
                    $scope.orderCartMap.put(menuId, item);
                }
            }

            $scope.cartPostAction();
        }

    };

    $scope.cartPostAction = function () {
        $scope.refreshCart();
        $scope.calculateTotalPrice();
        Order.cart = $scope.items.data = $scope.orderCartMap.values();
    };

    // 刷新购物车
    $scope.refreshCart = function () {
        $scope.items.data.forEach(function (item) {
            if ($scope.orderCartMap.containsKey(item.menuId)) {
                $scope.orderCartMap.put(item.menuId, item);
            } else {
                $scope.orderCartMap.remove(item.menuId);
            }
        });

    };

    /**
     * 当购物车中的某一项商品数量减至0, 就移出该行
     *
     * @param menuId
     */
    $scope.removeRowFromCart = function (menuId) {
        var index = -1;
        var itemArr = eval($scope.items.data);
        for (var i = 0, l = itemArr.length; i < l; i++) {
            if (itemArr[i].menuId === menuId) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            console.log("Something wrong happened");
        }
        $scope.items.data.splice(index, 1);
    };

    // 菜品列表数组
    $scope.menuArr = [];

    // 请求菜品列表信息
    $http.get(REST_URL + '/menu/list/' + Merchant.sellerId).success(function (data) {
        var jsonArr = data.menus;

        for (var i = 0, l = jsonArr.length; i < l; i++) {
            jsonArr[i].account = 0;
            jsonArr[i].changWidth = false;
            jsonArr[i].shopAccount = false;
            jsonArr[i].price = parseFloat(jsonArr[i].price).toFixed(2);
        }

        $scope.menuArr = jsonArr;
    });

    // 添加菜品到购物车
    $scope.minusAccount = function(menu) {
        menu.account--;
        if(menu.account <= 0){
            menu.changWidth = false;
            menu.shopAccount = false;
        }
    }
    $scope.addToCart = function (menu) {
        if (menu.restNum > 0) {
            menu.changWidth = true;
            menu.shopAccount = true;
            menu.account++;
            if ($scope.orderCartMap.containsKey(menu.menuId)) {
                var item = $scope.orderCartMap.get(menu.menuId);
                item.totalPrice = (parseFloat(item.totalPrice) + parseFloat(menu.price)).toFixed(2);
                item.count = parseInt(item.count) + 1;
            } else {
                $scope.orderCartMap.put(menu.menuId, {
                    'menuId': menu.menuId,
                    'name': menu.name,
                    'unitPrice': menu.price,
                    'totalPrice': menu.price,
                    'count': 1
                })
            }

            $scope.cartPostAction();
        }else{
            var alertPopup = $ionicPopup.alert({
                cssClass: 'zan_popup',
                template: '此产品已售完',
                scope: $scope,
                buttons: []
            });

            $timeout(function () {
                alertPopup.close();
            }, 1000);
        }

    };

    // 计算订单总计
    $scope.calculateTotalPrice = function () {
        var total = 0;
        $scope.orderCartMap.values().forEach(function (item) {
            total += parseFloat(item.totalPrice);
        });

        $scope.subtotal = total.toFixed(2);
    };

    // 订单信息Map
    $scope.orderCartMap = new Map();

    /**
     * 调至订单确认页面
     */
    $scope.confirmOrder = function () {
        if ($scope.orderCartMap.isEmpty()) {
            $scope.showAlert();
            return;
        }
        $scope.menuState.show = false;
        $state.go('tab.confirm-order');
    };

    // 总计
    $scope.subtotal = 0;


    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            cssClass: 'zan_popup',
            template: '您还没有选择菜品',
            scope: $scope,
            buttons: []
        });

        $timeout(function () {
            alertPopup.close();
        }, 1000);
    };

});