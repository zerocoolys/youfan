/**
 * Created by perfection on 15-8-17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo', kitchenInfo)
        .factory("kitchenInfoFn", function ($http) {
            //return {
            //    getTest: function () {
            //        return $http.get("http://127.0.0.1:8080/editkitchen/test").then(function (response) {
            //            //console.log(response.$state.value);
            //            return response.$state.value;
            //        },function(error){
            //            console.log(error)
            //        });
            //    }
            //}
        });


    function kitchenInfo($scope, $filter, $state, $rootScope,$http) {
        //console.log($rootScope.user.id);
        $scope.saveKitchenInfo = function (kitchenInfo) {
            //console.log(kitchenInfo)
            //{
            //    "status":"OK",
            //    "result":{
            //    "location":{
            //        "lng":121.34514,
            //            "lat":31.202595
            //    },
            //    "precise":0,
            //        "confidence":50,
            //        "level":""
            //}
            //}
            $http.jsonp("http://api.map.baidu.com/geocoder?address=上海虹桥机场&output=json").success(function (data) {
                console.log(data.location.lng);
                console.log(data.location.lat)
            });
        }
    }
})();