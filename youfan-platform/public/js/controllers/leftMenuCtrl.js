/**
 * Created by Administrator on 2015/8/17.
 */

define(["./module"], function (ctrs) {
    ctrs.controller('leftMenuCtrl', function ($scope, $rootScope, $q, $state, $http, $location, $location, $state) {

        $rootScope.initNavMenu = function (curnav) {
            //console.log("initNavMenu  ->"+curnav);
            switch (curnav) {
                case "sys":
                    $rootScope.curmenus = [
                        {
                            title: '运营概况',
                            name:"profile",
                            href: "#/sys/profile",
                        },
                        {
                            title: '消息推送',
                            name:"message",
                            href: "#/sys/message",
                        },
                        {
                            title: '支付管理',
                            name:"pay",
                            href: "#/sys/pay",
                        },
                        {
                            title: '活动管理',
                            name:"activity",
                            href: "#/sys/activity",
                        },
                        {
                            title: '代金券管理',
                            name:"voucher",
                            href: "#/sys/voucher",
                        }
                    ];
                    break;
                case "client":
                    $rootScope.curmenus = [
                        {
                            title: '客户信息',
                            name:"clientinfo",
                            href: "#/client/clientinfo",
                        },
                        {
                            title: '客户审核',
                            name:"clientcheck",
                            href: "#/client/clientcheck",
                        }
                    ];
                    break;
                case "merchant":
                    $rootScope.curmenus = [
                        {
                            title: '商家信息',
                            name:"merchantinfo",
                            href: "#/merchant/merchantinfo",
                        },
                        {
                            title: '商家审核',
                            name:"merchantcheck",
                            href: "#/merchant/merchantcheck",
                        }
                    ];
                    break;
                default :
                    break;
            }
        }

        //调用一次默认的Nav改变
        if($rootScope.curmenus==undefined||$rootScope.curmenus.length==0){
            $rootScope.changeNav($rootScope.selectedNav);
        }
        $scope.changeMenu = function(index){
            $rootScope.curmenunum = index;
        }

    })
});
