/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('orderDetails', orderDetails);

    function orderDetails($scope, $filter, $state, $ionicSlideBoxDelegate,$stateParams,$http,$rootScope) {

        $scope.detailOrder = {};
        $scope.selectedOrderStatus = $stateParams.orderStatus;

        /**处理加载后的数据*/
        $scope.disposeDetailData = function (datas) {
            if(datas == null) {
                return;
            }
            $scope.detailOrder = datas;
        }

        $scope.loadDetailData = function () {

            var url = "http://127.0.0.1:8080/orders/orderDetail/";

            url = url + $stateParams.orderNo;

            console.log(url);

            $http.get(url).success
            (function (res) {

                if (res == null) {
                    alert("网络链接异常，请检查!");
                    return;
                }
                if (res.code == 1) {
                    alert("数据异常，请稍等!");
                    return;
                }

                $scope.disposeDetailData(res.payload);
            });
        }


        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for(name in obj) {
                value = obj[name];

                if(value instanceof Array) {
                    for(i=0; i<value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value instanceof Object) {
                    for(subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
       var  transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];


        $scope.updateStatus = function(orderNo,status) {
            var url = "http://127.0.0.1:8080/orders/merchant/";

            url += orderNo;

            $http.post(url,{ orderStatus: status }, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: transformRequest
            }).success(function(responseData) {

                if(responseData.code == 0) {
                    $state.go('dishes',{ 'path':'today_order'});
                } else  {
                    alert("数据异常，请稍等!");
                    return;
                }
            });

        }



        $scope.loadDetailData();

    }
})();
