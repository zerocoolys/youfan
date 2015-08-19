/**
 * Created by Administrator on 2015/8/17.
 */

define(["./module"], function (ctrs) {
    ctrs.controller('leftMenuCtrl', function ($scope, $rootScope, $q, $state, $http, $location, $location, $state) {
        $rootScope.curmenus ;
        $rootScope.initNavMenu = function (curnav) {
            //console.log("initNavMenu  ->"+curnav);
            switch (curnav) {
                case "sys":
                    $rootScope.curmenus = [
                        {
                            title: '运营概况',
                            href: "#/sys/profile",
                        },
                        {
                            title: '消息推送',
                            href: "#/sys/message",
                        },
                        {
                            title: '支付管理',
                            href: "#/sys/pay",
                        },
                        {
                            title: '活动管理',
                            href: "#/sys/activity",
                        },
                        {
                            title: '代金券管理',
                            href: "#/sys/voucher",
                        }
                    ];
                    break;
                case "client":
                    $scope.curmenus = [
                        {
                            title: '客户信息',
                            href: "#/client/clientinfo",
                        },
                        {
                            title: '客户审核',
                            href: "#/client/clientcheck",
                        }
                    ];
                    break;
                case "merchant":
                    $scope.curmenus = [
                        {
                            title: '商家信息',
                            href: "#/merchant/merchaninfo",
                        },
                        {
                            title: '商家审核',
                            href: "#/merchant/merchantcheck",
                        }
                    ];
                    break;
                default :
                    break;
            }
            //
            $state.go(curnav, {},{reload:true});
        }

        //调用一次默认的Nav改变
        if($rootScope.curmenus==undefined||$rootScope.curmenus.length==0){
            $rootScope.changeNav($rootScope.selectedNav);
        }

    })
});
