/**
 * Created by Administrator on 2015/9/16.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('activeAddCtrl', function ($scope, $rootScope, $q, $state, $http, $location, ngDialog) {

        //展示转换 常量定义
        $scope.pointcut_descs = {
            "新用户注册": 100,
            "用户登录": 200,
            "订单提交": 300,
            "订单完成": 400,
            "100": "新用户注册",
            "200": "用户登录",
            "300": "订单提交",
            "400": "订单完成",
        }
        $scope.type_descs = {
            "发放优惠券": "1",
            "订单直扣": "2",
            "1": "发放优惠券",
            "2": "订单直扣",
        }
        $scope.coupon_type_descs = {
            "满减": "-",
            "折扣": "*",
            "返现": "+",
            "-": "满减",
            "*": "折扣",
            "+": "返现"
        }
        $scope.attr_desc = {
            "orgPrice": "价格",
            "价格": "orgPrice",
            "sex": "性别",
            "性别": "sex"
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


        //活动
        $scope.active_model = {
            title: null,
            event: null,
            pointcut: null,//活动切入点
            type: null,//活动方式
            startTime: null,
            endTime: null,
            userConditions:[],//活动的用户条件
            orderConditions:[],//活动的订单条件

            couponType: null,//优惠方式
            validityTime: null,
            couponDetails: [],

        }
        //详情
        $scope.coupon_detail_model = {
            userConditions: [],
            orderConditions: [],
            value: null,
        }
        //条件
        $scope.conditions_model = {
            attr: null,
            oper: null,
            value: null,
        }

        //页面展示使用active 中文转换
        $scope.active = angular.copy($scope.active_model)
        //$scope.active.pointcut = $scope.pointcut_descs[$scope.active.pointcut+'']
        //$scope.active.type = $scope.type_descs[$scope.active.type+'']
        //$scope.active.couponType = $scope.coupon_type_descs[$scope.active.couponType]

        //添加删除 优惠详情
        $scope.addCouponDetail = function (couponDetails) {
            couponDetails.push(angular.copy($scope.coupon_detail_model));
        }
        $scope.deleteCouponDetail = function (couponDetails, index) {
            couponDetails.splice(index, 1);
        }
        //添加删除条件
        $scope.addCondition = function (conditions) {
            if (conditions.length == 0 || (conditions[conditions.length - 1].attr != null && conditions[conditions.length - 1].oper != null && conditions[conditions.length - 1].value != null && conditions[conditions.length - 1].value.trim() != ''))
                conditions.push(angular.copy($scope.conditions_model));
        }
        $scope.deleteCondition = function (conditions, index) {
            conditions.splice(index, 1);
        }
        /**
         * 保存活动
         */
        $scope.submitAddActivity = function () {
            //console.log($scope.active)
            //保存条件判定
            var entity = angular.copy($scope.active)
            //下拉选择转换
            entity.pointcut = $scope.pointcut_descs[entity.pointcut + ""]
            entity.type = $scope.type_descs[entity.type + ""]
            entity.couponType = $scope.coupon_type_descs[entity.couponType]
            //时间转换
            entity.startTime = new Date(entity.startTime).getTime();
            entity.endTime = new Date(entity.endTime).getTime();
            console.log(entity.validityTime)
            entity.validityTime = new Date(entity.validityTime).getTime();

            convertCondition(entity.userConditions)
            convertCondition(entity.orderConditions)

            entity.couponDetails.forEach(function (detail, index) {
                //console.log(detail)
                if (detail.value == null || detail.value.trim() == '') {
                    entity.couponDetails.splice(index, 1);
                }
                convertCondition(detail.userConditions)
                convertCondition(detail.orderConditions)
            })
            console.log(entity)
            $http({
                method: 'GET',
                url: 'sys/saveActive?entity=' + JSON.stringify(entity)
            }).success(function (result, status) {
            })
        }


        /**
         * 跳回显示页面
         */
        $scope.back = function () {
            $state.go("activity", {});
        }


        var convertCondition = function (conditions) {
            conditions.forEach(function (item, i) {
                if (item.attr == null || item.oper == null || item.value == null || item.value.trim() == '') {
                    conditions.splice(i, 1);
                }
                item.attr = $scope.attr_desc[item.attr]
                item.oper = $scope.oper_desc[item.oper]
            })
        }
    })
})