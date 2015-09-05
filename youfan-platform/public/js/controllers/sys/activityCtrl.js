/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('activityCtrl', function ($scope, $rootScope, $q, $state, $http, $location, ngDialog) {
        console.log("activityCtrl")
        //分页信息
        $rootScope.pageNo = 1;
        $rootScope.pageSize = 2;
        $rootScope.recordCount = 0;
        $rootScope.pageCount = 0;
        $rootScope.pages = [];

        $scope.active_model={
            event:"",
            title:"",
            port:2,
            activeType:null,
            couponsType:1,
            ifUnique:false,
            ifUseCoupons:true,
            ifAll:true,
            kitchenId:null,
            couponsTypeId:null,
            validityTime:null,
            startTime:null,
            endTime:null,
            activeDetailClazz:null,
            desc:null
        }
        //筛选条件
        $scope.event = null;
        $scope.title = "";
        $scope.status = null;

        $scope.portDesc = {
            "2": "客户端",
            "3": "商家端",
        }
        $scope.timeLineDesc = {
            "1": "即时",
            "2": "延时",
        }
        //$scope.statusDesc = {
        //    "-1": "删除",
        //    "0": "关闭",
        //    "1": "开启",
        //}
        $rootScope.gridTitleArray = [
            {name: '事件', field: "event", maxWidth: 100},
            {name: '标题', field: "title", maxWidth: 60},
            {name: '活动类型', field: "activeType", maxWidth: 80},
            {name: '优惠类型', field: "couponsType", maxWidth: 80},
            {name: '是否唯一使用', field: "ifUnique", maxWidth: 120},
            {name: '同时使用优惠券', field: "ifUseCoupons", maxWidth: 150},
            {name: '是否全场', field: "ifAll", maxWidth: 80},
            {name: '厨房ID', field: "kitchenId", maxWidth: 80},
            {name: '有效期', field: "validityTimeDes"},
            {name: '创建时间', field: "createTimeDes"},
            {name: '开始时间', field: "startTimeDes"},
            {name: '结束时间', field: "endTimeDes"},
            {name: '处理类', field: "activeDetailClazz", maxWidth: 200},
            //{name: '状态', field: "statusDes", maxWidth: 80},
            {
                name: "操作",
                displayName: "操作",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.openActive(row.entity)' >{{row.entity.status == 1 ? '关闭':'开启' }}</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
        ];
        $scope.openActive = function (entity) {
            $scope.dialog_msg = "确认"+(entity.status == 1 ? '开启':'关闭' )+" 活动 "+entity.title+"?";
            $scope.choosedStatus = entity.status;
            $scope.dialog = ngDialog.open({
                template: './sys/dialog/sys_msg_dialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
            $scope.dialogSure = function (status) {
                entity.status = entity.status == 1 ? 0 : 1;
                $scope.dialog.close();
                $http({
                    method: 'GET',
                    url: 'sys/updateActive?id='+entity.id+"&updateMap="+JSON.stringify({status:entity.status})
                }).success(function (result, status) {

                });
            }
        }

        $scope.openAddActiveDialog = function (entity) {
            $scope.dialog = ngDialog.open({
                template: './sys/dialog/active_add_dialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });

            $scope.saveActive = function(){
                console.log("saveActive")
                console.log($scope.active_model)
                $scope.dialog.close();
            }

            $scope.closeDialog = function(){
                $scope.dialog.close();
            }
        }
        //指定数据查询方法
        $rootScope.searchData = function () {
            $scope.search();
        }
        $scope.search = function () {
            var condition = "";
            if ($scope.event != null && $scope.event.trim() != "")
                condition += "&event=" + $scope.event
            if ($scope.title != null && $scope.title.trim() != "")
                condition += "&title=" + $scope.title
            if ($scope.status != null && $scope.status.trim() != "")
                condition += "&status=" + $scope.status
            $http({
                method: 'GET',
                url: 'sys/getActive?orderBy=createTime&pageNo=' + $scope.pageNo + '&pageSize=' + $scope.pageSize + "&" + condition
            }).success(function (result, status) {
                $rootScope.gridOptions.data = result.payload.list;
                $rootScope.pageCount = result.payload.pageCnt;
                $rootScope.recordCount = result.payload.recordCnt;
                $rootScope.gridOptions.data.forEach(function (item) {
                    item.portDes = $scope.portDesc[item.port + ""]
                    item.timeLineDes = $scope.timeLineDesc[item.timeLine + ""]
                    //item.statusDes = $scope.statusDesc[item.status + ""]
                    item.createTimeDes = new Date(item.validityTime).format("yyyy-MM-dd hh:mm:ss")
                    item.validityTimeDes = new Date(item.createTime).format("yyyy-MM-dd hh:mm:ss")
                    item.startTimeDes = new Date(item.startTime).format("yyyy-MM-dd hh:mm:ss")
                    item.endTimeDes = new Date(item.endTime).format("yyyy-MM-dd hh:mm:ss")

                })
                //设置分页样式
                $rootScope.setPagerBar();
            })
        }
    })
});
