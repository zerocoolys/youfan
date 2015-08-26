/**
 * Created by perfection on 15-8-17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo', kitchenInfo);


    function kitchenInfo($scope, $filter, $state, $rootScope, $http) {
        //console.log($rootScope.user.id);
        $scope.saveKitchenInfo = function (kitchenInfo, address, characteristic) {

            if ($rootScope.user == "undefined" || $rootScope.user == "") {

            } else {

                //kitchenInfo.address = address.province+"省"+address.city+"市"+address.specificAddress;
                var characteristic;
                var cuisine;
                //kitchenInfo.push({""}) =characteristic[0];
                //kitchenInfo.characteristic.cuisine[1] =characteristic[1];
                characteristic = {
                    cuisine: [
                        characteristic[0]
                        ,

                        characteristic[1]

                    ],
                    id: $rootScope.user.id,
                    address:address.province+"省"+address.city+"市"+address.specificAddress,
                    phoneNumber:kitchenInfo.phoneNumber,
                    kitchenName:kitchenInfo.kitchenName

                };
                console.log(characteristic)
                $http.post(
                    "http://127.0.0.1:8080/user/saveMerchantKitchenInfo", JSON.stringify(characteristic), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                        //$state.go("overview");
                        $scope.user = data;
                    }, function (error) {
                        console.log(error)
                    });
            }

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
            //$http.jsonp("http://api.map.baidu.com/geocoder?address=上海虹桥机场&output=json").success(function (data) {
            //    console.log(data.location.lng);
            //    console.log(data.location.lat)
            //});
        }
    }
})();