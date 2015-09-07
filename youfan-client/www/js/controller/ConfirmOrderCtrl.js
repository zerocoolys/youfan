/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('ConfirmOrderCtrl', function ($scope, $rootScope, $state, $http, $q, $ionicModal, $ionicPopup,
                                                          $timeout, Merchant, Order, REST_URL) {

    $ionicModal.fromTemplateUrl('templates/remarks.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/Coupons.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.CouponsModal = modal;
    });


    // ========================= dolphineor =========================
    // 口味
    $scope.tastes = [{id: 1, name: "不吃辣"}, {id: 2, name: "微辣"}, {id: 3, name: "多放辣椒"}, {id: 4, name: "不放蒜"},
        {id: 5, name: "不放香菜"}, {id: 6, name: "少放盐"}, {id: 7, name: "米饭多点"}, {id: 8, name: "菜量多点"}];

    // 就餐方式
    $rootScope.userDiningWay = {};

    // 购物车列表
    $scope.cart = {};

    // 此次订单的总价
    $scope.totalPrice = 0;

    // 剩余支付
    $scope.remainPayedPrice = 0;

    // 支付
    $scope.toPay = function () {
        if ($rootScope.userDiningWay.address == undefined) {
            $scope.showAlert('亲 请选择就餐方式');
            return;
        }

        var menusJsonObj = {};
        $scope.cart.data.forEach(function (item) {
            menusJsonObj[item.id] = [item.count, item.restNum];
        });

        var orderData = {
            buyerId: 22305304567,
            sellerId: Merchant.sellerId,
            itemMap: menusJsonObj,
            comments: $scope.comments.trim().replace(" ", ","),
            originalPrice: $scope.totalPrice,
            discountPrice: $scope.remainPayedPrice,
            repastMode: $rootScope.userDiningWay.pickUp == true ? "zq" : "ps",
            repastAddress: $rootScope.userDiningWay.address.name + "," + $rootScope.userDiningWay.address.telNo + "," + $rootScope.userDiningWay.address.address,
            couponId: null,
            activeId: null
        };

        // ========= TEST CODE ==========
        // ===== 支付价格设置为0.01￥ =====
        orderData.discountPrice = 1;
        // ==============================

        // 创建订单
        $http.post(REST_URL + '/orders', orderData)
            .then(function (response) {
                //console.log(JSON.stringify(response));
                $state.go('tab.pay-page', {
                    order_no: response.data.payload.orderNo,
                    discountPrice: orderData.discountPrice
                });
            }, function (error) {
                //console.log(error);
                $scope.showAlert('系统内部错误');
            });

    };

    // 给商家的留言
    $scope.commentMap = new Map();
    $scope.comments = "";

    // 添加口味喜好
    $scope.addTasteComment = function (t) {
        $scope.comments = "";

        if ($scope.commentMap.containsKey(t.id)) {
            $scope.commentMap.remove(t.id);
        } else {
            $scope.commentMap.put(t.id, t);
        }

        $scope.commentMap.values().forEach(function (item) {
            $scope.comments += " " + item.name;
        });
    };

    // 加载购物车信息
    $scope.loadCart = function () {
        $scope.cart.data = Order.cart;

        var _total = 0;
        $scope.cart.data.forEach(function (item) {
            _total += parseFloat(item.totalPrice);
        });

        $scope.totalPrice = _total.toFixed(2);

        // TODO 计算剩余支付, 当前默认使用订单总价
        $scope.remainPayedPrice = $scope.totalPrice;

    };

    $scope.showAlert = function (msg) {
        var alertPopup = $ionicPopup.alert({
            cssClass: 'zan_popup',
            template: msg,
            scope: $scope,
            buttons: []
        });

        $timeout(function () {
            alertPopup.close();
        }, 1000);
    };

});