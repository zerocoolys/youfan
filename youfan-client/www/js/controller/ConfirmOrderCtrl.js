/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('ConfirmOrderCtrl', function ($scope, $rootScope, $state, $ionicModal, Order) {

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
    //// 订单
    //$scope.order = {
    //    items: [],  // 菜品
    //    price: 0,
    //    repastMode: '',  // 就餐方式
    //    repastAddress: '',  // 就餐地址
    //    coupons: 0,  // 优惠券
    //    comments: ''    // 备注
    //};

    // 口味
    $scope.tastes = [{id: 1, name: "不吃辣"}, {id: 2, name: "微辣"}, {id: 3, name: "多放辣椒"}, {id: 4, name: "不放蒜"},
        {id: 5, name: "不放香菜"}, {id: 6, name: "少放盐"}, {id: 7, name: "米饭多点"}, {id: 8, name: "菜量多点"}];

    // 就餐方式
    $rootScope.userDiningWay = {};

    // 购物车
    $scope.cart = {};

    // 此次订单的总价
    $scope.totalPrice = 0;

    // 剩余支付
    $scope.remainPayedPrice = 0;

    // 支付
    $scope.toPay = function () {
        Order.details = {
            items: $scope.cart.data,
            price: $scope.remainPayedPrice,
            comments: $scope.comments.trim().replace(" ", ",")
        };

        $state.go('tab.pay-page');
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

    $scope.loadCart = function () {
        $scope.cart.data = Order.cart;

        var _total = 0;
        $scope.cart.data.forEach(function (item) {
            _total += parseFloat(item.totalPrice);
        });

        $scope.totalPrice = _total.toFixed(2);

        // TODO 计算剩余支付, 当前默认使用订单总价
        $scope.remainPayedPrice = $scope.totalPrice;

    }

});