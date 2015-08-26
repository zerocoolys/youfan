/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('merchantCheckCtrl', function ($scope, $rootScope, $q, $state, $http, $location, ngDialog) {
        console.log("merchantCheckCtrl")
        $rootScope.gridTitleArray = [
            {name: '账户名称', field: "userName"},
            {name: '姓名', field: "realName"},
            {name: '性别', field: "sex"},
            {name: '住址', field: "address"},
            {name: '年龄', field: "ageRange"},
            {name: '联系方式', field: "phone"},
            {
                name: "头像",
                displayName: "头像",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showPics(row.entity,\"headPortraitPicUrl\")' >查看头像</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
            {
                name: "身份证",
                displayName: "身份证",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showPics(row.entity,\"idCardPicUrl\")' >查看身份证</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
            {
                name: "健康证",
                displayName: "健康证",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showPics(row.entity,\"healthCertificatePicUrl\")' >查看健康证</a></div>",
                maxWidth: 80,
                enableSorting: false
            },

            {name: '状态', field: "status"},
            {
                name: "操作",
                displayName: "操作",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showPics(row.entity)' >审核</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
        ];

        $scope.prevPic = function () {
            console.log("前一张图片")
        }
        $scope.showPics = function (entity, field) {
            var showPicUrl = entity[field];
            if(showPicUrl==undefined||showPicUrl==""){
                //未找到图片 使用一张提示图片代替
            }
            var html = "<div class='container-fluid'><div class='row-fluid'><div class='span12'>"
                + "<img alt='140x140' src='" + showPicUrl + "'class='img-rounded'/>"
                + "</div></div> </div>"
            ngDialog.open({
                template: html,
                className: 'ngdialog-theme-default admin_ngdialog',
                plain: true,
                scope: $scope
            });
        }
        $scope.refresh = function () {
            $http({
                method: 'GET',
                url: 'merchant/getByStatus?status=0'
            }).success(function (data, status) {
                $rootScope.gridOptions.data = data;
            })
        }
        $scope.refresh();
    })
});
