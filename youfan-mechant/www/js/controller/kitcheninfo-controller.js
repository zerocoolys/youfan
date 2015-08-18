/**
 * Created by perfection on 15-8-17.
 */
(function () {
    'use strict';

    angular
        .
        module('yf_merchant')
        .controller('kitcheninfo', kitchenInfo)
        .factory("test", function ($http) {
            return {
                getTest: function () {
                    return $http.get("http://127.0.0.1:8080/editkitchen/test").then(function (response) {
                        //console.log(response.$state.value);
                        return response.$state.value;
                    },function(error){
                        console.log(error)
                    });
                }
            }
        });


    function kitchenInfo($scope, $filter, $state, test) {
        $scope.name = test.getTest();
        //console.log($scope.name);
        console.log("测试结束")
    }
})();