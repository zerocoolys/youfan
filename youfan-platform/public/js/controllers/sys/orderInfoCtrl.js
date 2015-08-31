/**
 * Created by Administrator on 2015/8/28.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('orderInfoCtrl', function ($scope, $rootScope, $q, $state, $http, $location, ngDialog) {
        console.log("orderInfoCtrl")

        //分页信息
        $rootScope.pageNo = 0;
        $rootScope.pageSize = 20;
        $rootScope.recordCount = 0;
        $rootScope.pageCount = 0;
        $rootScope.pages = [];

        //筛选条件
        $scope.orderNo = "";
        $scope.sellerId = "";
        $scope.buyerId = "";
        $scope.orderStatus = null;

        $scope.statusDesc = {
            "-1": "删除",
            "0": "等待付款",
            "1": "付款成功",
            "2": "申请退款",
            "3": "退款成功",
        }
        $rootScope.gridTitleArray = [
            {name: '订单编号', field: "orderNo",maxWidth: 150},
            {name: '卖方', field: "sellerId"},
            {name: '买方', field: "buyerId"},
            {name: '价格', field: "price", maxWidth: 60},
            {name: '订单生成时间', field: "orderTimeDes",maxWidth: 150},
            {name: '就餐时间', field: "repastTimeDes",maxWidth: 150},
            {name: '就餐方式', field: "repastMode",maxWidth: 100},
            {name: '就餐地址', field: "repastAddress"},
            {name: '状态', field: "orderStatusDes",maxWidth: 100},
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


        //指定数据查询方法
        $rootScope.searchData = function () {
            $scope.search();
        }
        $scope.search = function () {
            var condition = "";
            if ($scope.orderNo.trim() != "")
                condition += "&orderNo=" + $scope.orderNo
            if ($scope.sellerId.trim() != "")
                condition += "&sellerId=" + $scope.sellerId
            if ($scope.buyerId.trim() != "")
                condition += "&buyerId=" + $scope.buyerId
            if ($scope.orderStatus != null &&$scope.orderStatus!="")
                condition += "&orderStatus=" + $scope.orderStatus
            $http({
                method: 'GET',
                url: 'sys/getOrder?orderBy=orderNo&pageNo=' + $scope.pageNo + '&pageSize=' + $scope.pageSize + "&" + condition
            }).success(function (result, status) {
                console.log(result)
                $rootScope.gridOptions.data = result.payload.list;
                $rootScope.pageCount = result.payload.pageCnt;
                $rootScope.recordCount = result.payload.recordCnt;
                $rootScope.gridOptions.data.forEach(function (item) {
                    item.orderStatusDes = $scope.statusDesc[item.orderStatus + ""]
                    item.orderTimeDes = new Date(item.orderTime).format("yyyy-MM-dd hh:mm:ss")
                    item.repastTimeDes = new Date(item.repastTime).format("yyyy-MM-dd hh:mm:ss")
                })
                //设置分页样式
                $rootScope.setPagerBar();
            })
        }


    })
});
