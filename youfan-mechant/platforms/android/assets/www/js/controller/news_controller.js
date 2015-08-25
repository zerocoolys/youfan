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
        .controller('news', news);

    function news($scope, $filter, $state,$ionicSlideBoxDelegate) {

        $scope.newsIndex=0;
        $scope.activenews = function (newsIndex) {
            $scope.newsIndex = newsIndex;
            $ionicSlideBoxDelegate.enableSlide([false])

        };

        $scope.slideIndex=0;
        $scope.activeSlide = function (slideIndex) {
            $scope.slideIndex = slideIndex;
            $ionicSlideBoxDelegate.enableSlide([false])


        };




        $scope.dorders=[1,2,3,4,5];
        $scope.ways=[1,2]

    }
})();