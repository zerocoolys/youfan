(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('my_bill', MyBill);

    function MyBill($scope, $filter, $state, $ionicTabsDelegate,$ionicPopup) {

        $scope.queryType = "分类";

        $scope.selectTabWithIndex = function(index) {


            if(index ==2) {

                $ionicPopup.show({
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>订单</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                $scope.queryType = "订单";
                            }
                        },
                        {
                            text: '<b>提现</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                $scope.queryType = "提现";
                            }
                        }
                        ,
                        {
                            text: '<b>奖励</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                $scope.queryType = "奖励";
                            }
                        }
                    ]
                });
            }

            $ionicTabsDelegate.select(index);
        }





    }
})();