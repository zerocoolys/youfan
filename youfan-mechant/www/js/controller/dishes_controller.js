/**
 * Created by Fzk lwek on 2015/8/17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('dishes', dishes);

    function dishes($scope, $filter, $state,$ionicSlideBoxDelegate) {
        $scope.orders=[
            {
                phone:"138-114-8670",
                ways:"堂食",
                time:"15:00"
            },
            {
                phone:"131-124-8620",
                ways:"自取",
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

        $scope.slideIndex=0;
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
        };
        $scope.activeSlide = function (index) {
            $ionicSlideBoxDelegate.slide(index);
            console.log(index);

        };

        $scope.dishesIndex=0;
        $scope.dishesChanged = function (index) {
            $scope.dishesIndex = index;
        };
        $scope.activedishes = function (index) {
            $ionicSlideBoxDelegate.slide(index);

        };


        $scope.dorders=[1,2,3,4,5];
        $scope.ways=[1,2,3]

    }
})();