/**
 * Created by perfection on 15-8-17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo', kitchenInfo);

    function kitchenInfo($scope, $filter, $state,$http) {
        $http("url").success(function(data){

        });
    }
})();