/**
 * Created by MrDeng on 2015/9/5.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('commentCtrl',function ($scope, $rootScope, $q,$state,$http,$location,ngDialog) {
        console.log("commentCtrl")

        //分页信息
        $rootScope.pageNo = 1;
        $rootScope.pageSize = 10;
        $rootScope.recordCount = 0;
        $rootScope.pageCount = 0;
        $rootScope.pages = [];

        //筛选条件
        $scope.orderId = null;
        $scope.merchantId = null;
        $scope.commentUser = null;
        $rootScope.gridTitleArray = [
            {name: '订单编号', field: "order_id",maxWidth: 150},
            {name: '商家', field: "merchant_id",maxWidth: 150},
            {name: '用户', field: "comment_user",maxWidth: 150},
            {name: '评论内容', field: "content", maxWidth: 400},
            {name: '评论图片', field: "img_url", maxWidth: 200},
            {name: '发表时间', field: "commentTimeDes",maxWidth: 150},

            {
                name: "操作",
                displayName: "操作",
                cellTemplate: "<div class='table_admin'><a  ng-click='grid.appScope.deleteComment(row.entity)' >删除</a></div>",
                maxWidth: 80,
                enableSorting: false
            },
        ];
        $scope.deleteComment = function (entity) {
            $scope.dialog_msg = "确认删除该条评论?";
            $scope.dialog = ngDialog.open({
                template: './sys/dialog/sys_msg_dialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
            $scope.dialogSure = function (status) {
                entity.status = entity.status == 1 ? 0 : 1;
                $http({
                    method: 'GET',
                    url: '/sys/comment/delete/' + entity.id
                }).success(function (result, status) {
                    entity.status == 1 ? '关闭':'开启'
                    $scope.search();
                });
                $scope.dialog.close();
            }
        }
        //指定数据查询方法
        $rootScope.searchData = function () {
            $scope.search();
        }
        $rootScope.initSearchData = function(){
            $rootScope.pageNo = 1;
            $scope.search();
        }
        $scope.clareSearchConditon = function(){
            $scope.kitchenId = null;
            $scope.merchantId = null;
            $scope.clientId = null;
        }
        $scope.search = function () {
            var condition = {};
            if ($scope.orderId!= null&&$scope.orderId.trim() != "")
                condition["order_id"]=Number($scope.orderId)
            if ($scope.merchantId != null&&$scope.merchantId.trim() != null)
                condition[ "merchant_id="]= $scope.merchantId
            if ($scope.commentUser != null&&$scope.commentUser.trim() != "")
                condition["comment_user"]= $scope.commentUser
            $http({
                method: 'GET',
                url: 'sys/getCommentsPager?orderBy=ct&asc=false&pageNo=' + $scope.pageNo + '&pageSize=' + $scope.pageSize + "&paramMap=" + JSON.stringify(condition)
            }).success(function (result, status) {
                if(result.payload.list!=null){
                    console.log("length="+result.payload.list.length)
                    $rootScope.gridOptions.data = result.payload.list;
                    $rootScope.gridOptions.data.forEach(function (item) {
                        item.commentTimeDes = new Date(item.commentTime).format("yyyy-MM-dd hh:mm:ss")
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
