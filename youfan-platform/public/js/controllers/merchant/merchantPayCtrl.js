/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('merchantPayCtrl', function ($scope, $rootScope, $q, $state, $http, $location, ngDialog) {
        console.log("merchantPayCtrl")

        //$rootScope.gridOptions.data = [];
        $rootScope.gridTitleArray = [
            {name: '姓名', field: "name"},
            {name: '住址', field: "address"},
            {name: '联系方式', field: "phone"},
            {name: '提款金额', field: "status"},
            {
                name: "x2",
                displayName: "",
                cellTemplate: "<div class='table_admin'><a href='' ng-click='grid.appScope.ckeckPay(grid,row)' >审核提款</a></div>",
                maxWidth: 100,
                enableSorting: false
            },
        ];

        $scope.refresh = function () {
            $http({
                method: 'GET',
                url: '/server/merchant/getPays'
            }).success(function (data, status) {
                $rootScope.gridOptions.data = data;
            })
        }
        $scope.refresh();

        $scope.ckeckPay = function (grid, row) {
            console.log(row)
            var dialog = ngDialog.open({
                template: '../merchant/dialog/ckeckpaydialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
            $scope.submitCheckPay = function () {
                console.log("确认打款")
                dialog.close();
                var sUrl =  '/server/merchant/pay?'+JSON.stringify({id:"1234",payCount:""})
                $http({
                    method: 'GET',
                    url: '/server/merchant/pay'
                }).success(function (data, status) {
                    $rootScope.gridOptions.data = data;
                })
            }
        }

    })
});
