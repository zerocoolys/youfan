/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('voucherCtrl',function ($scope, $rootScope, $q,$state,$http,$location,ngDialog) {
        console.log("voucherCtrl")

        //分页信息
        $rootScope.pageNo = 0;
        $rootScope.pageSize = 20;
        $rootScope.recordCount = 0;
        $rootScope.pageCount = 0;
        $rootScope.pages = [];

        //筛选条件
        $scope.port = null;
        $scope.timeLine = null;
        $scope.kitchenId = "";
        $scope.status = null;

        $scope.portDesc = {
            "2": "客户端",
            "3": "商家端",
        }
        $scope.timeLineDesc = {
            "1": "即时",
            "2": "延时",
        }
        $scope.statusDesc = {
            "-1": "删除",
            "0": "关闭",
            "1": "开启",
        }
        $rootScope.gridTitleArray = [
            {name: '客户端/商家端', field: "portDes",maxWidth: 150},
            {name: '时效', field: "timeLineDes",maxWidth: 60},
            {name: '厨房编号', field: "kitchenId",maxWidth: 100},
            {name: '优惠券内容', field: "content", maxWidth: 400},
            {name: '创建时间', field: "createTimeDes",maxWidth: 150},
            {name: '描述', field: "desc",maxWidth: 300},
            {name: '状态', field: "statusDes",maxWidth: 80},
            {
                name: "操作",
                displayName: "操作",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.ckeckMerchant(row.entity)' >开启</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
        ];
        $scope.ckeckMerchant = function (entity) {
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
                $http({
                    method: 'GET',
                    url: 'merchant/checkStatus?id=' + entity.id + '&status=' + $scope.choosedStatus
                }).success(function (data, status) {
                })
                dialog.close();
            }
        }
        $scope.openAddVoucherDialog = function (entity) {
            var dialog = ngDialog.open({
                template: './sys/dialog/voucher_add_dialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
            $scope.closeDialog = function(){
                dialog.close();
            }
        }
        //指定数据查询方法
        $rootScope.searchData = function () {
            $scope.search();
        }
        $scope.search = function () {
            var condition = "";
            if ($scope.port!= null&&$scope.port.trim() != "")
                condition += "&port=" + $scope.port
            if ($scope.timeLine != null&&$scope.timeLine.trim() != null)
                condition += "&timeLine=" + $scope.timeLine
            if ($scope.kitchenId != null&&$scope.kitchenId.trim() != "")
                condition += "&kitchenId=" + $scope.kitchenId
            if ($scope.status != null &&$scope.status!="")
                condition += "&status=" + $scope.status
            $http({
                method: 'GET',
                url: 'sys/getCouponsType?orderBy=createTime&pageNo=' + $scope.pageNo + '&pageSize=' + $scope.pageSize + "&" + condition
            }).success(function (result, status) {
                console.log(result)
                $rootScope.gridOptions.data = result.payload.list;
                $rootScope.pageCount = result.payload.pageCnt;
                $rootScope.recordCount = result.payload.recordCnt;
                $rootScope.gridOptions.data.forEach(function (item) {
                    item.portDes = $scope.portDesc[item.port + ""]
                    item.timeLineDes = $scope.timeLineDesc[item.timeLine + ""]
                    item.statusDes = $scope.statusDesc[item.status + ""]
                    item.createTimeDes = new Date(item.createTime).format("yyyy-MM-dd hh:mm:ss")
                })
                //设置分页样式
                $rootScope.setPagerBar();
            })
        }


        $scope.addVoucher = function(){
            console.log("addVoucher")
        }
    })
});
