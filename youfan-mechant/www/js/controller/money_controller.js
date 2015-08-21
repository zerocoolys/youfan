/**
 * Created by Fzk lwek on 2015/8/21.
 */
/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('money', money);

    function money($scope, $filter, $state,$ionicSlideBoxDelegate) {

        $scope.moneyIndex=1;
        $scope.activemoney = function (moneyIndex) {
            $scope.moneyIndex = moneyIndex;
            $ionicSlideBoxDelegate.enableSlide([false])

        };

        $scope.slideIndex=1;
        $scope.activeSlide = function (slideIndex) {
            $scope.slideIndex = slideIndex;
            $ionicSlideBoxDelegate.enableSlide([false])


        };




        $scope.dorders=[1,2,3,4,5];
        $scope.ways=[1,2]

    }
})();