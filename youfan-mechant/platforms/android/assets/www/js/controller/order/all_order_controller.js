(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('all_order', AllOrder);

    function AllOrder($scope, $filter, $state,$ionicSlideBoxDelegate) {


        $scope.scopeIndex = 0;

        $scope.statusIndex = 0;


        $scope.activeScope = function (index){
             $scope.scopeIndex=index;
            $ionicSlideBoxDelegate.slide(index);

        };

        $scope.activeStats = function (index) {
            $scope.statusIndex = index;
            $ionicSlideBoxDelegate.slide(index);
        };
    }
})();