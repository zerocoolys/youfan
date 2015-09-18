/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {

    ctrs.controller('dishesCheckCtrl', function ($scope, $rootScope, $q, $state, $http, $location,ngDialog) {
        $scope.statusDesc = {
            "0": "待审核",
            "1": "正常",
            "2": "冻结",
            "待审核": "0",
            "正常": "1",
            "冻结": "2",
        }
        //筛选条件
        $scope.s_kitchenName = "";
        $scope.s_phone = "";
        //$scope.s_cuisine="";
        $scope.s_status = null;
        $rootScope.gridTitleArray = [
            {name: '卖家ID', field: "sellerId"},
            {name: '名称', field: "name"},
            {name: '菜系', field: "type"},
            {name: '价格（￥）', field: "price"},

            {name: '口味', field: "taste"},
            {name: '描述', field: "description"},
            {
                name: "厨房图片",
                displayName: "厨房图片",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.showMultiPics(row.entity.picUrls)' >查看厨房图片</a></div>",
                maxWidth: 100,
                enableSorting: false
            },

            {name: '状态', field: "statusDes",maxWidth:80},
            {
                name: "操作",
                displayName: "操作",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.ckeckKitchen(row.entity)' >审核</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
        ];

        $scope.ckeckKitchen = function (entity) {
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
                //console.log($scope.choosedStatus)
                $http({
                    method: 'GET',
                    url: 'merchant/updateMenu/' + entity.id + '?status=' +$scope.choosedStatus
                }).success(function (data, status) {
                    if (data.code == 1) {
                        entity.statusDes = $scope.statusDesc[$scope.choosedStatus + ""]
                    }
                })
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
            $scope.s_kitchenName = "";
            $scope.s_phone = "";
            //$scope.s_cuisine="";
            $scope.s_status = null;
        }
        $scope.search = function () {
            var condition = "";
            if ($scope.s_kitchenName.trim() != "")
                condition += "&kitchenName=" + $scope.s_kitchenName
            if ($scope.s_phone.trim() != "")
                condition += "&phoneNumber=" + $scope.s_phone
            if ($scope.s_status != null)
                condition += "&status=" + $scope.statusDesc[$scope.status+""]
            $http({
                method: 'GET',
                url: 'merchant/getMenus?pageNo=' + $scope.pageNo + '&pageSizez=' + $scope.pageSize + "&" + condition
            }).success(function (result, status) {
                if(result.payload.list!=undefined){
                    $rootScope.gridOptions.data = result.payload.list;
                    $rootScope.gridOptions.data.forEach(function(item){
                        item.statusDes =$scope.statusDesc[item.reviewStatus+""]
                    })
                }
                $rootScope.pageCount = result.payload.pageCnt;
                $rootScope.recordCount = result.payload.recordCnt;
                //设置分页样式
                $rootScope.setPagerBar();
            })
        }
    })
});
