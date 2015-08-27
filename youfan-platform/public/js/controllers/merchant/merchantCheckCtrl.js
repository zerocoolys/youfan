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
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showSinglePic(row.entity.headPortraitPicUrl)' >查看头像</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
            {
                name: "身份证",
                displayName: "身份证",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showSinglePic(row.entity.idCardPicUrl)' >查看身份证</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
            {
                name: "健康证",
                displayName: "健康证",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showSinglePic(row.entity.healthCertificatePicUrl)' >查看健康证</a></div>",
                maxWidth: 80,
                enableSorting: false
            },

            {name: '状态', field: "status"},
            {
                name: "操作",
                displayName: "操作",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.ckeckMerchant(row.entity)' >审核</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
        ];
        $scope.ckeckMerchant = function (entity) {
            //$scope.statusRadio = [false,false,false]
            //$scope.statusRadio[entity.status] = true;
            $scope.choosedStatus = entity.status;
            var dialog = ngDialog.open({
                template: './merchant/dialog/checkmerchantdialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
            $scope.radioChoosed = function(status){
                console.log(status)
                $scope.choosedStatus =status;
            }
            $scope.submitCheck = function(){
                console.log("submitCheck")
                console.log(entity.id)
                console.log('merchant/checkStatus?id='+entity.id+'&status='+$scope.choosedStatus)
                $http({
                    method: 'GET',
                    url: 'merchant/checkStatus?id='+entity.id+'&status='+$scope.choosedStatus
                }).success(function (data, status) {
                    //$rootScope.gridOptions.data = data;
                    console.log("修改成功")
                })
                dialog.close();
            }
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
