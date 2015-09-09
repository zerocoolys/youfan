/**
 * Created by Administrator on 2015/8/18.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('voucherCtrl', function ($scope, $rootScope, $q, $state, $http, $location, ngDialog) {
        //筛选条件
        $scope.port = null;
        $scope.timeLine = null;
        $scope.status = null;
        $scope.portDesc = {
            "2": "客户端",
            "3": "商家端",
            "客户端": 2,
            "商家端": 3,
        }
        $scope.timeLineDesc = {
            "1": "即时",
            "2": "延时",
            "即时": 1,
            "延时": 2
        }
        $scope.statusDesc = {
            "0": "已停用",
            "1": "使用中",
            "已停用": 0,
            "使用中": 1,
        }
        $rootScope.gridTitleArray = [
            {name: '客户端/商家端', field: "portDes", maxWidth: 150},
            {name: '时效', field: "timeLineDes", maxWidth: 60},
            {name: '优惠券内容', field: "contentDes", maxWidth: 500},
            {name: '创建时间', field: "createTimeDes", maxWidth: 150},
            {name: '描述', field: "desc", maxWidth: 300},
            {name: '状态', field: "statusDes", maxWidth: 100},
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
            console.log($scope.port + "  " + $scope.timeLine)
            var conditions = "";
            if ($scope.port != null && $scope.port.trim() != "")
                conditions += "&port=" + $scope.portDesc[$scope.port]
            if ($scope.timeLine != null && $scope.timeLine.trim() != null)
                conditions += "&timeLine=" + $scope.timeLineDesc[$scope.timeLine]
            if ($scope.status != null && $scope.status != "")
                conditions += "&status=" + $scope.statusDesc[$scope.status]
            $http({
                method: 'GET',
                url: 'sys/getCouponsType?orderBy=createTime&pageNo=' + $scope.pageNo + '&pageSize=' + $scope.pageSize + "&" + conditions
            }).success(function (result, status) {
                if (result.code == 1) {
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
        $scope.conditions_attr = {
            "price": "价格"
        }
        $scope.formatContent = function (content) {
            var cdesc = "";
            for (var index = 0; index < content.length; index++) {
                var item = content[index];
                if (item.conditions == null) {
                    if (item.type == "-") {
                        cdesc += (index + 1) + "." + item.value + "元代金券;"
                    } else if (item.type == "*") {
                        cdesc += (index + 1) + "." + (item.value * 10) + "折优惠券"
                    }
                } else {
                    if (item.conditions.oper == ">") {
                        cdesc += (index + 1) + "." + $scope.conditions_attr[item.conditions.attr] + "满" + item.conditions.value
                    } else {
                        cdesc += (index + 1) + ".";
                    }
                    if (item.type == "-") {
                        cdesc += "减" + item.value + "元;"
                    } else if (item.type == "*") {
                        cdesc += "打" + (item.value * 10) + "折"
                    }
                }
            }
            return cdesc
        }


        ///////////////////////优惠券类型添加/////////////////////////////////
        $scope.add_conditions = [];
        $scope.add_voucher = {
            port: "客户端",
            title: "",
            content: [{
                type: "减免",
                value: null,
                conditions: [{
                    attr: "价格",
                    oper: "大于",
                    value: null
                }]
            }
            ],
            desc: ""
        }
        $scope.type_desc = {
            "满减": "-",
            "折扣": "*",
            "返现": "+",
            "-": "满减",
            "*": "折扣",
            "+": "返现"
        }

        $scope.attr_desc = {
            "price": "价格",
            "价格": "price"
        }
        $scope.oper_desc = {
            ">": "大于",
            ">=": "大于等于",
            "=": "等于",
            "<": "小于",
            "<=": "小于等于",
            "大于": ">",
            "大于等于": ">=",
            "等于": "=",
            "小于": "<",
            "小于等于": "<=",
        }

        $scope.add_content = function () {
            $scope.add_voucher.content.push({
                type: "减免",
                value: null,
                conditions: [{
                    attr: "价格",
                    oper: "大于",
                    value: null
                }]
            })
        }
        $scope.delete_content = function (index) {
            $scope.add_voucher.content.splice(index, 1);
        }
        $scope.add_condition = function (conditions) {
            conditions.push({
                attr: "价格",
                oper: "大于",
                value: null
            })
        }
        $scope.delete_condition = function (conditions, index) {
            conditions.splice(index, 1);
        }
        /**
         * 打开添加窗口
         * @param entity
         */
        $scope.openAddVoucherDialog = function (entity) {
            $scope.dialog = ngDialog.open({
                template: './sys/dialog/voucher_add_dialog.html',
                className: 'ngdialog-theme-default admin_ngdialog',
                scope: $scope
            });
        }
        $scope.submitAddVoucher = function () {
            console.log($scope.add_voucher)
            var entity_content = []
            for (var index = 0; index < $scope.add_voucher.content.length; index++) {
                var cont = $scope.add_voucher.content[index];
                var t_content = {
                    type: $scope.type_desc[cont.type],
                    value: cont.value
                }
                console.log(cont.conditions)
                if (cont.conditions != null && cont.conditions != null) {
                    var t_conditions = []
                    console.log(cont.conditions)
                    for (var i = 0; i < cont.conditions.length; i++) {
                        var t_cond = cont.conditions[i];
                        if (t_cond.value != null) {
                            var t_condition = {
                                attr: $scope.attr_desc[t_cond.attr],
                                oper: $scope.oper_desc[t_cond.oper],
                                value: t_cond.value

                            }
                            t_conditions.push(t_condition);
                        }
                    }
                    if (t_conditions != null && t_conditions.length > 0) {
                        t_content["conditions"] = t_conditions
                    }
                }
                entity_content.push(t_content)
            }
            //console.log( $scope.add_desc)
            var entity =
                "&port=" + $scope.portDesc[$scope.add_voucher.port] +
                "&title=" + $scope.add_voucher.title +
                "&timeLine=" + 1 +
                "&ifAll=" + true +
                "&content=" + JSON.stringify(entity_content) +
                "&desc=" + $scope.add_voucher.desc

            var saveUrl = 'sys/saveCouponsType?entity=' + entity
            console.log(saveUrl)
            $http({
                method: 'GET',
                url: saveUrl
            }).success(function (result, status) {
                $scope.dialog.close();
            })
        }

    })
});
