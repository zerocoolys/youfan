/**
 * Created by ss on 2015/8/19.
 */
ControllerModule.controller('MyOrderCtrl', function ($scope, $ionicSlideBoxDelegate, $http, /*localStorageService, */REST_URL) {
    $scope.$root.tabsHidden = "tabs-hide";
    $scope.slideIndex = 0;
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };
    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };
    // 订单详情
    /*未完成的订单*/
    $scope.orderUnfinishes = [{
        number: '135268549',
        status: '待评价',
        cookName: '河马堂药膳厨房',
        singleTime: '2014.11.08 下午13:00',
        price: '￥98.00',
        payWorld: '立即支付'
    }, {
        number: '135268549',
        status: '待付款',
        cookName: '河马堂药膳厨房',
        singleTime: '2014.11.08 下午13:00',
        price: '￥98.00',
        payWorld: '立即支付'
    }, {
        number: '135268549',
        status: '待付款',
        cookName: '河马堂药膳厨房',
        singleTime: '2014.11.08 下午13:00',
        price: '￥98.00',
        payWorld: '立即支付'
    }, {
        number: '135268549',
        status: '待付款',
        cookName: '河马堂药膳厨房',
        singleTime: '2014.11.08 下午13:00',
        price: '￥98.00',
        payWorld: '立即支付'
    }, {
        number: '135268549',
        status: '待付款',
        cookName: '河马堂药膳厨房',
        singleTime: '2014.11.08 下午13:00',
        price: '￥98.00',
        payWorld: '立即支付'
    }, {
        number: '135268549',
        status: '待付款',
        cookName: '河马堂药膳厨房',
        singleTime: '2014.11.08 下午13:00',
        price: '￥98.00',
        payWorld: '立即支付'
    }, {
        number: '135268549',
        status: '待付款',
        cookName: '河马堂药膳厨房',
        singleTime: '2014.11.08 下午13:00',
        price: '￥98.00',
        payWorld: '立即支付'
    }, {
        number: '135268549',
        status: '待付款',
        cookName: '河马堂药膳厨房',
        singleTime: '2014.11.08 下午13:00',
        price: '￥98.00',
        payWorld: '立即支付'
    }];

    /*已完成的订单*/
    $scope.orderFinishes = [{
        number: '135268549',
        status: '待付款',
        cookName: '河马堂药膳厨房',
        singleTime: '2014.11.08 下午13:00',
        price: '￥98.00'
    }, {
        number: '135268549',
        status: '待付款',
        cookName: '河马堂药膳厨房',
        singleTime: '2014.11.08 下午13:00',
        price: '￥98.00'
    }, {
        number: '135268549',
        status: '待付款',
        cookName: '河马堂药膳厨房',
        singleTime: '2014.11.08 下午13:00',
        price: '￥98.00'
    }];


    // ========================= dolphineor =========================
    // 已完成
    $scope.finishedOrders = [];

    // 未完成
    $scope.unfinishedOrders = [];

    // 退款中
    $scope.refundingOrders = [];

    // 待评论
    $scope.notCommentedOrders = [];


    $scope.retrieveOrdersByUserId = function () {
        var pagination = {
            pageNo: 0,
            pageSize: 10,
            orderBy: 'orderTime',
            asc: false
        };

        $http.post(REST_URL + '/orders/users/' + 22305304567, pagination)
            .then(function (response) {
                console.log(JSON.stringify(response));
            }, function (error) {
                console.log(error);
            });
    };

    $scope.retrieveOrdersByUserId();

});