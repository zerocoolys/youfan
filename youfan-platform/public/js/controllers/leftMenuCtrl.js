/**
 * Created by Administrator on 2015/8/17.
 */

define(["./module"], function (ctrs) {
    ctrs.controller('leftMenuCtrl', function ($scope, $rootScope, $q, $state, $http, $location, $location, $state) {
        //$scope.selectedRow = 0;
        //$scope.selectRestaurant = function (row) {
        //    $scope.selectedRow = row;
        //};
        $scope.curmenus ;
        $rootScope.initNavMenu = function (curnav) {
            //console.log("initNavMenu  ->"+curnav);
            switch (curnav) {
                case "sys":
                    $scope.curmenus = [
                        {
                            title: '运营概况',
                            href: "#/sys/profile",
                            templateUrl: "sys/profile.html"
                        },
                        {
                            title: '消息推送',
                            href: "#/sys/message",
                            templateUrl: "sys/message.html"
                        },
                        {
                            title: '支付管理',
                            href: "#/sys/pay",
                            templateUrl: "sys/pay.html"
                        },
                        {
                            title: '活动管理',
                            href: "#/sys/activity",
                            templateUrl: "sys/activity.html"
                        }
                    ];
                    break;
                case "client":
                    $scope.curmenus = [
                        {
                            title: '客户信息',
                            href: "#/client/clientinfo",
                            templateUrl: "client/clientinfo.html"
                        },
                        {
                            title: '客户审核',
                            href: "#/client/clientcheck",
                            templateUrl: "client/clientcheck.html"
                        }
                    ];
                    break;
                case "merchant":
                    $scope.curmenus = [
                        {
                            title: '商家信息',
                            href: "#/merchant/merchaninfo",
                            templateUrl: "merchant/merchaninfo.html"
                        },
                        {
                            title: '商家审核',
                            href: "#/merchant/merchantcheck",
                            templateUrl: "merchant/merchantcheck.html"
                        }
                    ];
                    break;
                default :
                    break;
            }
            //
            $state.go(curnav, {})
        }

        //调用一次默认的Nav改变
        if($scope.curmenus==undefined||$scope.curmenus.length==0){
            $rootScope.changeNav($rootScope.selectedNav);
        }

    })
});
