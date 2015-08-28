/**
 * Created by Fzk lwek on 2015/8/18.
 */
(function () {
    'use strict';

    angular.module('yf_merchant').controller('shop', shop);

    function shop($scope, $filter, $timeout,$ionicBackdrop) {
        console.log(1111);

        $scope.reretain=function(){
            console.log(1111);
            $ionicBackdrop.retain();
            $timeout(function() {
                $ionicBackdrop.release();
            }, 1000);


        };



    }
})();