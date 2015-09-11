/**
 * Created by Fzk lwek on 2015/8/18.
 */
(function () {
    'use strict';

    angular.module('yf_merchant').controller('shop', shop);

    function shop($scope  , $rootScope, $location) {
        $rootScope.Reretain = function () {
            $location.path("/overview");
            $rootScope.CourseNone = false;
            $rootScope.GuideFirst = true;
            $rootScope.GuideSecond = false;
            $rootScope.GuideThird = true;


        };
        $rootScope.ReretainTwo = function () {
            $location.path("/overview");
            $rootScope.CourseNone = false;
            $rootScope.GuideSecond = true;
            $rootScope.GuideFirst = true;
            $rootScope.GuideThird = false;
        }
    }
})();
