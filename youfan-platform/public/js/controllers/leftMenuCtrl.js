/**
 * Created by Administrator on 2015/8/17.
 */

define(["./module"], function (ctrs) {
    ctrs.controller('leftMenuCtrl', function ($scope, $rootScope, $q, $state, $http, $location, $location) {
        console.log("leftMenuCtrl")
        //$rootScope.divHtml = "sys/profile.html"
        $scope.selectedRow = 0;
        $scope.selectRestaurant = function (row) {
            $scope.selectedRow = row;
        };
        console.log($rootScope.curnav)
        //console.log($rootScope.curmenus)

        $rootScope.changeNavMenu = function (nav) {
            console.log("changeNavMenu");

            switch ($rootScope.curnav) {
                case "sys":
                    $rootScope.curmenus = [
                        {
                            title: '运营概况',
                            href: "#/sys/main",
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
                    $rootScope.curmenus = [
                        {
                            title: '运营概况',
                            href: "#/sys/main",
                            templateUrl: "sys/profile.html"
                        }
                    ];
                    break;
                case "merchant":
                    $rootScope.curmenus = [
                        {
                            title: '活动管理',
                            href: "#/sys/activity",
                            templateUrl: "sys/activity.html"
                        }
                    ];
                    break;
                default :
                    break;
            }
            $scope.changeMenu(0, $rootScope.curmenus[0].templateUrl);
        }
        $scope.changeMenu = function ($index, templateUrl) {
            $rootScope.divHtml = templateUrl;
        }
        $rootScope.changeNav(  $rootScope.selectedNav);
    })
});
