(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('my_income', MyIncome);

    function MyIncome($scope, $filter, $state,YF_MERCHANT_HOST,YF_MERCHANT_INFO,$http) {
        $scope.incomeData = {};

        $scope.goMyBill = function () {
            $state.go('my_bill');
        };



        $scope.disposeData = function (data) {
            if(data == null) {
                return;
            }
            $scope.incomeData = data;


        }


        $scope.loadData = function () {
            var url = YF_MERCHANT_HOST+"/orders/myincome/merchant?";
            var merchant = {};

            url = url+"sellerId="+YF_MERCHANT_INFO.mID;
            console.log(url);

            $http.get(url).success
            (function (res) {

                console.log(res);

                if(res == null) {
                    alert("网络链接异常，请检查!");
                    return;
                }
                if(res.code == 1) {
                    alert("数据异常，请稍等!");
                    return;
                }
                $scope.disposeData(res.payload);
            });
        }


        $scope.loadData();


    }
})();
