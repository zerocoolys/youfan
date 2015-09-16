/**
 * Created by ss on 2015/8/19.
 */
ControllerModule.controller('MyOrderCtrl', function ($scope, $state, $ionicSlideBoxDelegate, $http, User, Order, REST_URL) {


    $scope.$root.tabsHidden = "tabs-hide";
    $scope.slideIndex = 0;
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };
    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };
    //// 订单详情
    ///*未完成的订单*/
    //$scope.orderUnfinishes = [{
    //    number: '135268549',
    //    status: '待评价',
    //    cookName: '河马堂药膳厨房',
    //    singleTime: '2014.11.08 下午13:00',
    //    price: '￥98.00',
    //    payWorld: '立即支付'
    //}, {
    //    number: '135268549',
    //    status: '待付款',
    //    cookName: '河马堂药膳厨房',
    //    singleTime: '2014.11.08 下午13:00',
    //    price: '￥98.00',
    //    payWorld: '立即支付'
    //}, {
    //    number: '135268549',
    //    status: '待付款',
    //    cookName: '河马堂药膳厨房',
    //    singleTime: '2014.11.08 下午13:00',
    //    price: '￥98.00',
    //    payWorld: '立即支付'
    //}, {
    //    number: '135268549',
    //    status: '待付款',
    //    cookName: '河马堂药膳厨房',
    //    singleTime: '2014.11.08 下午13:00',
    //    price: '￥98.00',
    //    payWorld: '立即支付'
    //}, {
    //    number: '135268549',
    //    status: '待付款',
    //    cookName: '河马堂药膳厨房',
    //    singleTime: '2014.11.08 下午13:00',
    //    price: '￥98.00',
    //    payWorld: '立即支付'
    //}, {
    //    number: '135268549',
    //    status: '待付款',
    //    cookName: '河马堂药膳厨房',
    //    singleTime: '2014.11.08 下午13:00',
    //    price: '￥98.00',
    //    payWorld: '立即支付'
    //}, {
    //    number: '135268549',
    //    status: '待付款',
    //    cookName: '河马堂药膳厨房',
    //    singleTime: '2014.11.08 下午13:00',
    //    price: '￥98.00',
    //    payWorld: '立即支付'
    //}, {
    //    number: '135268549',
    //    status: '待付款',
    //    cookName: '河马堂药膳厨房',
    //    singleTime: '2014.11.08 下午13:00',
    //    price: '￥98.00',
    //    payWorld: '立即支付'
    //}];
    //
    ///*已完成的订单*/
    //$scope.orderFinishes = [{
    //    number: '135268549',
    //    status: '待付款',
    //    cookName: '河马堂药膳厨房',
    //    singleTime: '2014.11.08 下午13:00',
    //    price: '￥98.00'
    //}, {
    //    number: '135268549',
    //    status: '待付款',
    //    cookName: '河马堂药膳厨房',
    //    singleTime: '2014.11.08 下午13:00',
    //    price: '￥98.00'
    //}, {
    //    number: '135268549',
    //    status: '待付款',
    //    cookName: '河马堂药膳厨房',
    //    singleTime: '2014.11.08 下午13:00',
    //    price: '￥98.00'
    //}];


    // ========================= dolphineor =========================
    // 已完成
    $scope.finishedOrders = [];

    // 未完成
    $scope.unfinishedOrders = [];

    // 退款中
    $scope.refundingOrders = [];

    // 待评论
    $scope.notCommentedOrders = [];


    $scope.pagination = {
        pageNo: 0,
        pageSize: 10,
        params: {orderStatus: []}
    };


    $scope.retrieveOrdersByUserId = function (type) {
        switch (type) {
            // 未完成
            case 1:
                $scope.pagination.params.orderStatus = [1, 2, 3, 4, 5];
                $scope.loadOrdersData(type);
                break;
            // 已完成
            case 2:
                $scope.pagination.params.orderStatus = [98, 99, 100];
                $scope.loadOrdersData(type);
                break;
            // 退款中
            case 3:
                $scope.pagination.params.orderStatus = [201, 202, 301, 302];
                $scope.loadOrdersData(type);
                break;
            // 待评价
            case 4:
                $scope.pagination.params.orderStatus = [100];
                $scope.pagination.params.commentStatus = 0;
                $scope.loadOrdersData(type);
                break;
            default :
                break;
        }
    };

    $scope.loadOrdersData = function (type) {
        $http.post(REST_URL + '/orders/users/' + User.id, $scope.pagination)
            .then(function (response) {
                //console.log(JSON.stringify(response));
                var result = response.data.payload;

                switch (type) {
                    case 1:
                        for (var i = 0, l = result.length; i < l; i++) {
                            var _status = parseInt(result[i].orderStatus);

                            if (_status == 1) {
                                result[i].orderStatusStr = "等待支付";
                            } else if (_status == 2) {
                                result[i].orderStatusStr = "等待商家确认";
                            } else if (_status == 3) {
                                result[i].orderStatusStr = "等待商家做菜";
                            } else if (_status == 4) {
                                result[i].orderStatusStr = "等待商家发货";
                            } else if (_status == 5) {
                                result[i].orderStatusStr = "确认收货";
                            }
                        }
                        $scope.unfinishedOrders = result;
                        break;
                    case 2:
                        for (var j = 0, m = result.length; j < m; j++) {
                            result[j].orderStatusStr = "已完成";
                        }
                        $scope.finishedOrders = result;
                        break;
                    case 3:
                        for (var k = 0, n = result.length; k < n; k++) {
                            result[k].orderStatusStr = "退款中";
                        }
                        $scope.refundingOrders = result;
                        break;
                    case 4:
                        for (var q = 0, s = result.length; q < s; q++) {
                            result[q].orderStatusStr = "等待评价";
                        }
                        $scope.notCommentedOrders = result;
                        break;
                    default :
                        break;
                }
            }, function (error) {
                console.log(error);
            });
    };

    $scope.userInfo = {
        id: User.id,
        name: User.name,
        telNo: User.telNo
    };

    $scope.showOrderDetails = function (order) {
        // 获取订单的菜品信息
        $http.get(REST_URL + '/orders/' + order.orderNo + '/dishes').success(function (data) {
            var _order = order;
            _order.orderTime = (new Date(_order.orderTime)).Format("yyyy-MM-dd hh:mm:ss");

            var _paymentWay = _order.paymentWay;
            if (_paymentWay == "alipay") {
                _order.paymentWay = "支付宝";
            } else if (_paymentWay == "wx") {
                _order.paymentWay = "微信";
            } else {
                _order.paymentWay = "无";
            }

            var _status = _order.orderStatus;

            if (_status == 1) {
                _order.paymentStatus = "待付款";
            } else {
                _order.paymentStatus = "已付款";
            }

            var refundClass = true;
            var receivingConfirmationClass = true;

            if (_status == 2 || _status == 3 || _status == 4 || _status == 5) {
                if (_status == 5) {
                    receivingConfirmationClass = false;
                }
                refundClass = false;
            }

            $state.go('tab.order-detail', {
                order: _order,
                userInfo: $scope.userInfo,
                dishes: data.payload,
                refundClass: refundClass,
                receivingConfirmationClass: receivingConfirmationClass
            });
        }).error(function (err) {
            console.log(err);
        });
    };

    $scope.goTo = function (orderObj) {
        if (orderObj instanceof Object) {
            Order.comment = orderObj;
            $state.go('comment-details');
        }
    }

    $scope.goTo = function (orderObj) {
        if (orderObj instanceof Object) {
            Order.comment = orderObj;
            $state.go('comment-details');
        }
    }

    $scope.goTo = function (orderObj) {
        if (orderObj instanceof Object) {
            Order.comment = orderObj;
            $state.go('comment-details');
        }
    }

});