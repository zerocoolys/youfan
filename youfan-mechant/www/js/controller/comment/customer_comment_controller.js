(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('customer_comment', CustomerComment);

    function CustomerComment($scope, $filter, $state) {


        $scope.statusIndex = 0;

        $scope.activeStats = function (index) {
            $scope.statusIndex = index;
            $ionicSlideBoxDelegate.slide(index);
        };
    }
})();