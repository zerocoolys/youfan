(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('my_income', MyIncome);

    function MyIncome($scope, $filter, $state) {


        $scope.goMyBill = function () {
            $state.go('my_bill');
        };
    }
})();