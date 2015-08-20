/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('merchantCheckCtrl', function ($scope, $rootScope, $q, $state, $http, $location) {
        console.log("merchantCheckCtrl")

        //$rootScope.gridOptions.data = [];
        $rootScope.gridTitleArray = [
            {name: '姓名', field: "name"},
            {name: '住址', field: "address"},
            {name: '联系方式', field: "phone"},
            {name: '状态', field: "status"}
        ];

        $scope.refresh = function () {
            $http({
                method: 'GET',
                url: '/server/merchant/getInfos'
            }).success(function (data, status) {
                $rootScope.gridOptions.data =data;
            })
        }
        $scope. refresh();
    })
});
