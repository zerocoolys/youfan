/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('kitchenInfoCtrl',function ($scope, $rootScope, $q,$state,$http,$location,ngDialog) {
        $scope.statusDesc = {
            "-1":"删除",
            "0":"待审核",
            "1":"正常",
            "2":"冻结",
        }
        //筛选条件
        $scope.name = "";
        $scope.phone = "";
        $scope.status = null;
        $rootScope.gridTitleArray = [
            {name: '厨房名称', field: "kitchenName"},
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
        $rootScope.searchData = function () {
            $scope.search();
        }
        $rootScope.initSearchData = function () {
            $rootScope.pageNo = 1;
            $scope.search();
        }
        $scope.clareSearchConditon = function () {
            $scope.name = "";
            $scope.phone = "";
            $scope.status = null;
        }
        $scope.search = function () {
            var condition = "";
            if ($scope.name.trim() != "")
                condition += "&name=" + $scope.name
            if ($scope.phone.trim() != "")
                condition += "&phone=" + $scope.phone
            if ($scope.status != null)
                condition += "&status=" + $scope.status
            $http({
                method: 'GET',
                url: 'merchant/getKitchens?pageNo=' + $scope.pageNo + '&pageSize=' + $scope.pageSize + "&" + condition
            }).success(function (result, status) {
                if(result.code==1&&result.payload.list!=undefined){
                    $rootScope.gridOptions.data = result.payload.list;
                    $rootScope.gridOptions.data.forEach(function(item){
                        item.status =$scope.statusDesc[item.status+""]
                    })
                    $rootScope.pageCount = result.payload.pageCnt;
                    $rootScope.recordCount = result.payload.recordCnt;
                    //设置分页样式
                    $rootScope.setPagerBar();
                }

            })
        }
    })
});
