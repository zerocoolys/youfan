/**
 * Created by ss on 2015/8/17.
 */
ControllerModule.controller('ConfirmOrderCtrl', function ($scope, $rootScope, $state, $http, $q, $ionicModal, $ionicPopup,
                                                          $timeout, User, Merchant, Order, REST_URL) {

    $scope.IsShowBar = true;
    /*底部就餐时间选择*/
    $scope.diningScroll;
    $scope.timeSroll;
    $scope.choiceTimes = [];
    $scope.closeTime = "20:00";
    $scope.closeHourse = $scope.closeTime.split(":")[0];
    $scope.closeMinutes = $scope.closeTime.split(":")[1];
    $scope.eatTime = "请选择";
    /*获取的就餐时间*/
    $scope.currentMonth = parseInt(new Date().getMonth() + "") + 1 + '月' + new Date().getDate() + '日';
    function loaded() {
        setTimeout(function () {
            $scope.diningScroll = new iScroll("dining", {
                snap: "li",
                hScrollbar: false,
                vScrollbar: false,
                onScrollEnd: function () {//滚动结束后执行的函数
                    //console.log(this.y)
                }
            });
            if (parseInt(new Date().getHours()) >= 15) {
                $scope.diningScroll.scrollTo(0, 36, 500, true);
            }
            $scope.diningScroll.refresh()
        }, 100);
        setTimeout(function () {
            $scope.timeSroll = new iScroll("time", {
                snap: "li",
                hScrollbar: false,
                vScrollbar: false,
                onScrollEnd: function () {//滚动结束后执行的函数
                    $scope.eatTime = $scope.choiceTimes[-this.y / 36];
                    //console.log($scope.eatTime)
                }
            });
            $scope.timeSroll.scrollTo(0, 0, 500, true);
            setTimeout(function () {
                $scope.timeSroll.refresh();
            }, 0);
        }, 200);
        $scope.currentHours = parseInt(new Date().getHours());
        //console.log(new Date().getHours());
        if (parseInt(new Date().getHours()) >= 17) {
            $scope.isShowDing = false;
        } else {
            $scope.isShowDing = true;
        }
        $scope.currentMinutes = parseInt(new Date().getMinutes());
        $scope.cookTime = $scope.currentMinutes + 45;
        if ($scope.cookTime > 60) {
            $scope.currentHours += 1;
            $scope.earliestTime = $scope.cookTime - 60;
            $scope.choiceTimes.push($scope.currentHours + ':' + $scope.earliestTime + '(最早)');
            if ($scope.earliestTime > 30) {
                $scope.currentHours += 1;
            }
        } else {
            $scope.choiceTimes.push($scope.currentHours + ':' + $scope.cookTime + '(最早)');
            if ($scope.earliestTime > 30) {
                $scope.currentHours += 1;
            } else {
                $scope.choiceTimes.push($scope.currentHours + ':' + '30');
            }
        }
        // 比如厨房20:00关门;
        for ($scope.currentHours; $scope.currentHours <= $scope.closeHourse; $scope.currentHours++) {
            if ($scope.currentHours == $scope.closeHourse) {
                if ($scope.closeMinutes >= 30) {
                    $scope.choiceTimes.push($scope.currentHours + ':' + '00');
                    $scope.choiceTimes.push($scope.currentHours + ':' + '30');
                } else {
                    $scope.choiceTimes.push($scope.currentHours + ':' + '00');
                }
            } else {
                $scope.choiceTimes.push($scope.currentHours + ':' + '00');
                $scope.choiceTimes.push($scope.currentHours + ':' + '30');
            }
        }
    }

    /*点击选择订餐时间*/
    $scope.diningTime = function () {
        $scope.choiceTimes.length = 0;
        loaded();
        /*就餐时间选择初始化*/
        //console.log($scope.choiceTimes);
        $scope.IsShowBar = false;
        $scope.showDiningTime = true;
    };
    // 取消订餐时间
    $scope.cancelDiningTime = function () {
        $scope.IsShowBar = true;
        $scope.showDiningTime = false;
        //scope.eatTime = "请选择";
    };
    $scope.finishDiningTime = function () {
        if ($scope.eatTime == "请选择") {
            $scope.eatTime = $scope.choiceTimes[0];
        }
        $scope.IsShowBar = true;
        $scope.showDiningTime = false;
    };
    /*订餐时间滚动*/

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

        // TODO handle repastTime

        var orderData = {
            buyerId: User.id,
            sellerId: Merchant.sellerId,
            itemMap: menusJsonObj,
            comments: $scope.comments.trim().replace(" ", ","),
            originalPrice: $scope.totalPrice,
            discountPrice: $scope.remainPayedPrice,
            repastMode: $rootScope.userDiningWay.pickUp == true ? "zq" : "ps",
            repastTime: new Date(),
            repastAddress: $rootScope.userDiningWay.address.name + "," + $rootScope.userDiningWay.address.telNo + "," + $rootScope.userDiningWay.address.address,
            couponId: null,
            activeId: null
        };

        // ========= TEST CODE ==========
        // ===== 支付价格设置为0.01￥ =====
        //orderData.discountPrice = 1;
        // ==============================

        // 创建订单
        $http.post(REST_URL + '/orders', orderData)
            .then(function (response) {
                //console.log(JSON.stringify(response));
                // 跳转到支付页面
                $state.go('tab.pay-page', {
                    orderNo: response.data.payload.orderNo,
                    discountPrice: parseFloat(orderData.discountPrice) * 100
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