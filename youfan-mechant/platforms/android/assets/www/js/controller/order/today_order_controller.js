(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('today_order', today_order);

    function today_order($scope, $filter, $state,$ionicSlideBoxDelegate) {

        $scope.orders=[
            {
                phone:"138-114-8670",
                ways:"自取",
                time:"15:00"
            },
            {
                phone:"131-124-8620",
                ways:"堂食",
                time:"13:00"
            },
            {
                phone:"185-114-2570",
                ways:"堂食",
                time:"18:00"
            },
            {
                phone:"151-154-8650",
                ways:"自取",
                time:"20:00"
            }
        ];
        $scope.dishesIndex=0;
        $scope.activedishes = function (dishesIndex) {
            $scope.dishesIndex = dishesIndex;
            $ionicSlideBoxDelegate.enableSlide([false])

        };

        $scope.slideIndex=0;
        $scope.activeSlide = function (slideIndex) {
            $scope.slideIndex = slideIndex;
            $ionicSlideBoxDelegate.enableSlide([false])


        };




        $scope.dorders=[1,2,3,4,5,6];
        $scope.ways=[1,2,3]
    }
})();/**
 * Created by Fzk lwek on 2015/8/20.
 */
