/**
 * Created by Administrator on 2015/8/28.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('orderInfoCtrl',function ($scope, $rootScope, $q,$state,$http,$location,ngDialog) {
        console.log("orderInfoCtrl")

        //分页信息
        $rootScope.pageNo = 1;
        $rootScope.pageSize = 20;
        $rootScope.recordCount = 0;
        $rootScope.pageCount = 0;
        $rootScope.pages = [];

        //筛选条件
        $scope.userName = "";
        $scope.realName = "";
        $scope.status = null;


        $rootScope.gridTitleArray = [
            {name: '订单编号', field: "orderNo"},
            {name: '卖方', field: "sellerId"},
            {name: '买方', field: "buyerId"},
            {name: '价格', field: "price"},
            {name: '订单生成时间', field: "orderTime"},
            {name: '就餐时间', field: "repastTime"},
            {name: '就餐方式', field: "repastMode"},
            {name: '就餐地址', field: "repastAddress"},
            {name: '状态', field: "orderStatus"},
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
        $rootScope.searchData = function(){
            $scope.search();
        }
        $scope.search = function () {
            var condition = "";
            if ($scope.userName.trim() != "")
                condition += "&userName=" + $scope.userName
            if ($scope.realName.trim() != "")
                condition += "&realName=" + $scope.realName
            if ($scope.status != null)
                condition += "&status=" + $scope.status
            $http({
                method: 'GET',
                url: 'sys/getOrder/' + $scope.pageNo + '/' + $scope.pageSize + "?" + condition
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
