/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {

    ctrs.controller('dishesCheckCtrl', function ($scope, $rootScope, $q, $state, $http, $location,ngDialog) {
        console.log("dishesCheckCtrl")
        //分页信息
        $rootScope.pageNo = 1;
        $rootScope.pageSize = 20;
        $rootScope.recordCount = 0;
        $rootScope.pageCount = 0;
        $rootScope.pages = [];


        $scope.statusDesc = {
            "-1":"删除",
            "0":"待审核",
            "1":"正常",
            "2":"冻结",
        }
        //筛选条件
        $scope.kitchenName = "";
        $scope.phoneNumber = "";
        $scope.status = null;
        $rootScope.gridTitleArray = [
            {name: '厨房名称', field: "merchantId"},
            {name: '联系号码', field: "phoneNumber"},
            {name: '菜系', field: "cuisine"},
            {name: '开始营业时间', field: "startTime"},
            {name: '停止营业时间', field: "endTime"},
            {
                name: "厨房图片",
                displayName: "厨房图片",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showMultiPics(row.entity.kitchenPicUrl)' >查看厨房图片</a></div>",
                maxWidth: 100,
                enableSorting: false
            },

            {name: '状态', field: "status",maxWidth:80},
            {name: '状态', field: "status"},
            {
                name: "操作",
                displayName: "操作",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.ckeckKitchen(row.entity)' >审核</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
        ];

        $scope.ckeckKitchen = function (entity) {
            //$scope.statusRadio = [false,false,false]
            //$scope.statusRadio[entity.status] = true;
            $scope.choosedStatus = entity.status;
            var dialog = ngDialog.open({
                template: './merchant/dialog/checkmerchantdialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
            $scope.radioChoosed = function (status) {
                $scope.choosedStatus = status;
            }
            $scope.submitCheck = function () {
                //$http({
                //    method: 'GET',
                //    url: 'merchant/checkStatus?id=' + entity.id + '&status=' + $scope.choosedStatus
                //}).success(function (data, status) {
                //})
                dialog.close();
            }
        }
        //指定数据查询方法
        $rootScope.searchData = function(){
            $scope.search();
        }
        $scope.search = function () {
            var condition = "";
            if ($scope.kitchenName.trim() != "")
                condition += "&kitchenName=" + $scope.kitchenName
            if ($scope.phoneNumber.trim() != "")
                condition += "&phoneNumber=" + $scope.phoneNumber
            if ($scope.status != null)
                condition += "&status=" + $scope.status
            $http({
                method: 'GET',
                url: 'merchant/getKitchen/' + $scope.pageNo + '/' + $scope.pageSize + "?" + condition
            }).success(function (result, status) {
                $rootScope.gridOptions.data = result.list;
                $rootScope.pageCount = result.pageCnt;
                $rootScope.recordCount = result.recordCnt;
                $rootScope.gridOptions.data.forEach(function(item){
                    item.status =$scope.statusDesc[item.status+""]
                    console.log(item.status)
                })
                //设置分页样式
                $rootScope.setPagerBar();
            })
        }
    })
});
