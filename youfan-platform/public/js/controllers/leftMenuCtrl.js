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
                            title: '订单管理',
                            name:"orderinfo",
                            href: "#/sys/orderinfo",
                        },
                        {
                            title: '评论管理',
                            name:"comment",
                            href: "#/sys/comment",
                        },

                        {
                            title: '活动管理',
                            name:"activity",
                            href: "#/sys/activity",
                        },
                        {
                            title: '优惠券类型',
                            name:"voucher",
                            href: "#/sys/voucher",
                        },
                        {
                            title: '敏感词管理',
                            name:"sensitiveword",
                            href: "#/sys/sensitiveword",
                        },
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
                            title: '商家信息管理',
                            name:"merchantinfo",
                            href: "#/merchant/merchantinfo",
                        },
                        {
                            title: '厨房信息',
                            name:"kitcheninfo",
                            href: "#/merchant/kitcheninfo",
                        },
                        {
                            title: '菜品审核',
                            name:"dishescheck",
                            href: "#/merchant/dishescheck",
                        },
                        {
                            title: '商家提款审核',
                            name:"merchantpay",
                            href: "#/merchant/merchantpay",
                        },
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
