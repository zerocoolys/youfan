/**
 * Created by MrDeng on 2015/9/5.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('commentCtrl',function ($scope, $rootScope, $q,$state,$http,$location,ngDialog) {
        console.log("commentCtrl")

        //分页信息
        $rootScope.pageNo = 0;
        $rootScope.pageSize = 20;
        $rootScope.recordCount = 0;
        $rootScope.pageCount = 0;
        $rootScope.pages = [];

        //筛选条件
        $scope.kitchenId = null;
        $scope.clientId = null;
        $rootScope.gridTitleArray = [
            {name: '厨房编号', field: "kitchenId",maxWidth: 150},
            {name: '商家', field: "merchantName",maxWidth: 60},
            {name: '用户', field: "kitchenId",maxWidth: 100},
            {name: '评论内容', field: "content", maxWidth: 400},
            {name: '发表时间', field: "createTimeDes",maxWidth: 150},
            {
                name: "操作",
                displayName: "操作",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.ckeckMerchant(row.entity)' >开启</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
        ];
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

    })
});
