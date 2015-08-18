/**
 * Created by Administrator on 2015/8/17.
 */

define(["./module"], function (ctrs) {
    ctrs.controller('leftMenuCtrl', function ($scope, $rootScope, $q, $state, $http, $location) {
        console.log("leftMenuCtrl")

        $scope.selectedRow = 0;
        $scope.selectRestaurant = function (row) {
            $scope.selectedRow = row;
            console.log($scope.adminmenus)
        };
        $scope.adminmenus = [
            {
                title: '运营情况总览',
            },
            {
                title: '敏感词管理',
            },
            {
                title: '消息推送',
            }
        ];
    })
});
