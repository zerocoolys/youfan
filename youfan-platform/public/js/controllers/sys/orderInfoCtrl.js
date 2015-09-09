/**
 * Created by Administrator on 2015/8/28.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('orderInfoCtrl', function ($scope, $rootScope, $q, $state, $http, $location, ngDialog) {

        //筛选条件
        $scope.orderNo = "";
        $scope.sellerId = "";
        $scope.buyerId = "";
        $scope.orderStatus = null;

        $scope.statusDesc = {
            "1": "等待付款",
            "2": "付款成功",
            "201": "买家申请退款",
            "202": "卖家申请退款",
            "3": "商家已确认",
            "301": "买家申请退款",
            "302": "卖家申请退款",
            "4": "等待出库",
            "5": "等待发货",
            "100": "已收货",

            //取消订单描述
            "99": "已取消并退款",
            "98": "订单已取消",
        }

        $scope.operDesc = {
            "1": "取消订单",
            "2": "取消并退款",
            "201": "审核退款",
            "202": "审核退款",
            "3": "取消并退款",
            "301": "审核退款",
            "302": "审核退款",
            "4": "取消并退款",
            "5": "取消并退款",
            "100": "",
            "99": "",
            "98": "",
        }
        $rootScope.gridTitleArray = [
            {name: '订单编号', field: "orderNo", maxWidth: 150},
            {name: '卖方', field: "sellerId"},
            {name: '买方', field: "buyerId"},
            {name: '价格', field: "price", maxWidth: 60},
            {name: '订单生成时间', field: "orderTimeDes", maxWidth: 150},
            {name: '就餐时间', field: "repastTimeDes", maxWidth: 150},
            {name: '就餐方式', field: "repastMode", maxWidth: 100},
            {name: '就餐地址', field: "repastAddress"},
            {name: '状态', field: "orderStatusDes", maxWidth: 100},
            {
                name: "操作",
                displayName: "操作",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.orderOper(row.entity)' >{{row.entity.operDes}}</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
        ];
        $scope.orderOper = function (entity) {
            $scope.dialog_msg = "确认  " + entity.operDes + "  订单:" + entity.orderNo + "? 操作不可逆，请谨慎操作！";
            $scope.dialog = ngDialog.open({
                template: './sys/dialog/sys_msg_dialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
            $scope.dialogSure = function (status) {
                if (entity.orderStatus == 1) {
                    entity.orderStatus = 98;
                } else if (entity.orderStatus == 201 || entity.orderStatus == 202 || entity.orderStatus == 301 || entity.orderStatus == 302 || entity.orderStatus == 2 || entity.orderStatus == 3 || entity.orderStatus == 4 || entity.orderStatus == 5) {
                   //涉及到退款 进入退款流程
                    //申请退款后状态直接修改
                    entity.orderStatus = 99;
                }
                $http({
                    method: 'GET',
                    url: 'sys/updateOrderStatus/' + entity.id + "/" + entity.orderStatus
                }).success(function (result, status) {
                    if (result.code == 1) {
                        entity.operDes = $scope.operDesc[entity.orderStatus + ""]
                        entity.orderStatusDes = $scope.statusDesc[entity.orderStatus + ""]
                    }
                });
                $scope.dialog.close();
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
            $scope.orderNo = "";
            $scope.sellerId = "";
            $scope.buyerId = "";
            $scope.orderStatus = null;
        }
        $scope.search = function () {
            var condition = "";
            if ($scope.orderNo.trim() != "")
                condition += "&orderNo=" + $scope.orderNo
            if ($scope.sellerId.trim() != "")
                condition += "&sellerId=" + $scope.sellerId
            if ($scope.buyerId.trim() != "")
                condition += "&buyerId=" + $scope.buyerId
            if ($scope.orderStatus != null && $scope.orderStatus != "")
                condition += "&orderStatus=" + $scope.orderStatus
            $http({
                method: 'GET',
                url: 'sys/getOrder?orderBy=orderNo&pageNo=' + ($scope.pageNo - 1) + '&pageSize=' + $scope.pageSize + "" + condition
            }).success(function (result, status) {
                if(result.payload.list!=null){
                    $rootScope.gridOptions.data = result.payload.list;
                    $rootScope.gridOptions.data.forEach(function (item) {
                        item.orderStatusDes = $scope.statusDesc[item.orderStatus + ""]
                        item.operDes = $scope.operDesc[item.orderStatus + ""]
                        item.orderTimeDes = new Date(item.orderTime).format("yyyy-MM-dd hh:mm:ss")
                        item.repastTimeDes = new Date(item.repastTime).format("yyyy-MM-dd hh:mm:ss")
                    })
                }
                //设置分页样式
                $rootScope.pageCount = result.payload.pageCnt;
                $rootScope.recordCount = result.payload.recordCnt;

                $rootScope.setPagerBar();
            })
        }
    })
});
