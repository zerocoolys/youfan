/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('voucherCtrl', function ($scope, $rootScope, $q, $state, $http, $location, ngDialog) {
        //分页信息
        $rootScope.pageNo = 1;
        $rootScope.pageSize = 10;
        $rootScope.recordCount = 0;
        $rootScope.pageCount = 0;
        $rootScope.pages = [];

        //筛选条件
        $scope.port = null;
        $scope.timeLine = null;
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
            {name: '客户端/商家端', field: "portDes", maxWidth: 150},
            {name: '时效', field: "timeLineDes", maxWidth: 60},
            {name: '优惠券内容', field: "contentDes", maxWidth: 500},
            {name: '创建时间', field: "createTimeDes", maxWidth: 150},
            {name: '描述', field: "desc", maxWidth: 400},
            {
                name: "操作",
                displayName: "操作",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.voucheOper(row.entity)' >{{row.entity.status == 1 ? '停用':'开启' }}</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
        ];
        $scope.voucheOper = function (entity) {
            $scope.dialog_msg = "确认" + (entity.status == 1 ? '停用' : '开启' ) + " 优惠券 " + entity.title + "?";
            $scope.dialog = ngDialog.open({
                template: './sys/dialog/sys_msg_dialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
            $scope.dialogSure = function (status) {
                entity.status = entity.status == 1 ? 0 : 1;
                $http({
                    method: 'GET',
                    url: 'sys/updateCouponsTypeStatus/' + entity.id + "/" + entity.status
                }).success(function (result, status) {
                    entity.status == 1 ? '停用' : '开启'
                    entity.statusDes = $scope.statusDesc[entity.status + ""]
                });
                $scope.dialog.close();
            }
        }
        $scope.openAddVoucherDialog = function (entity) {
            var dialog = ngDialog.open({
                template: './sys/dialog/voucher_add_dialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
            $scope.closeDialog = function () {
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
            $scope.port = null;
            $scope.timeLine = null;
        }
        $scope.search = function () {
            var condition = "";
            if ($scope.port != null && $scope.port.trim() != "")
                condition += "&port=" + $scope.port
            if ($scope.timeLine != null && $scope.timeLine.trim() != null)
                condition += "&timeLine=" + $scope.timeLine
            //if ($scope.status != null &&$scope.status!="")
            //    condition += "&status=" + $scope.status
            $http({
                method: 'GET',
                url: 'sys/getCouponsType?orderBy=createTime&pageNo=' + $scope.pageNo + '&pageSize=' + $scope.pageSize + "&" + condition
            }).success(function (result, status) {
                if(result.code==1){
                    $rootScope.gridOptions.data = result.payload.list;
                    $rootScope.pageCount = result.payload.pageCnt;
                    $rootScope.recordCount = result.payload.recordCnt;
                    $rootScope.gridOptions.data.forEach(function (item) {
                        item.portDes = $scope.portDesc[item.port + ""]
                        item.timeLineDes = $scope.timeLineDesc[item.timeLine + ""]
                        item.statusDes = $scope.statusDesc[item.status + ""]
                        item.createTimeDes = new Date(item.createTime).format("yyyy-MM-dd hh:mm:ss")
                        item.contentDes = $scope.formatContent(item.content)
                    })
                    //设置分页样式
                    $rootScope.setPagerBar();
                }
            })
        }

        $scope.condition_attr = {
            "price": "价格"
        }
        $scope.formatContent = function (content) {
            var cdesc = "";
            for (var index = 0; index < content.length; index++) {
                var item = content[index];
                if (item.condition == null) {
                    if (item.type == "-") {
                        cdesc += (index + 1) + "." + item.value + "元代金券;"
                    } else if (item.type == "*") {
                        cdesc += (index + 1) + "." + (item.value * 10) + "折优惠券"
                    }
                } else {
                    if (item.condition.oper == ">") {
                        cdesc += (index + 1) + "." + $scope.condition_attr[item.condition.attr] + "满" + item.condition.value
                    } else {
                        cdesc += (index + 1) + ".";
                    }
                    if (item.type == "-") {
                        cdesc += "减"+item.value + "元;"
                    } else if (item.type == "*") {
                        cdesc += "打"+(item.value * 10) + "折"
                    }
                }
            }
            return cdesc
        }
        $scope.addVoucher = function () {
            console.log("addVoucher")
        }
    })
});
