/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {

    ctrs.controller('dishesCheckCtrl', function ($scope, $rootScope, $q, $state, $http, $location,ngDialog) {
        console.log("dishesCheckCtrl")

        //$rootScope.gridOptions.data = [];
        $rootScope.gridTitleArray = [
            {name: '菜品名称', field: "address"},
            {name: '商家', field: "merchantId"},
            {name: '菜品类别', field: "type"},
            {name: '菜品价格', field: "name"},
            {name: '特点', field: "name"},
            {name: '菜品描述', field: "phone"},
            {
                name: "图片",
                displayName: "",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showPics(row.entity)' >查看图片</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
            {name: '状态', field: "status"}
        ];

        $scope.showPics = function(){
            ngDialog.open({
                template: './merchant/dialog/showpicsdialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
        }
        $scope.refresh = function () {
            $http({
                method: 'GET',
                url: '/merchant/getDishes'
            }).success(function (data, status) {
                $rootScope.gridOptions.data =data;
            })
        }
        $scope. refresh();
    })
});
