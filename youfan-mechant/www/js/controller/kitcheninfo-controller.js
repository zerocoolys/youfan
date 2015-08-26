/**
 * Created by perfection on 15-8-17.
 */

function getLocation(data) {
    saveData(data.result.location);
}
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo', kitchenInfo);


    function kitchenInfo($scope, $filter, $state, $rootScope, $http) {

        var saveData = function (location) {
            var characteristic;
            characteristic = {
                cuisine: [
                    $scope.characteristicData[0]
                    ,

                    $scope.characteristicData[1]

                ],
                id: $rootScope.user.id,
                address: $scope.addressData,
                lat: location.lat,
                lng: location.lng,
                phoneNumber: $scope.kitchenInfoData.phoneNumber,
                kitchenName: $scope.kitchenInfoData.kitchenName

            };
            $http.post(
                "http://127.0.0.1:8080/user/saveMerchantKitchenInfo", JSON.stringify(characteristic), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                    $scope.user = data;
                }, function (error) {
                    console.log(error)
                });
        };
        $scope.saveKitchenInfo = function (kitchenInfo, address, characteristic) {

            if ($rootScope.user == "undefined" || $rootScope.user == "") {

            } else {
                $scope.kitchenInfoData = kitchenInfo;
                $scope.addressData = address.province + "省" + address.city + "市" + address.specificAddress;
                $scope.characteristicData = characteristic;
                //http://webapi.amap.com/maps?v=1.3&key=60e4bf90ba538f5c224eeeae93c250c0
                //$http.jsonp("http://api.map.baidu.com/geocoder/v2/?address=" + $scope.addressData + "&output=json&ak=bd1mMndujGcxGjUqPnyIdPfY&callback=getLocation");
                var MGeocoder;
                //加载地理编码插件
                AMap.service(["AMap.Geocoder"], function() {
                    MGeocoder = new AMap.Geocoder({
                        //city:"010", //城市，默认：“全国”
                        radius:500 //范围，默认：500
                    });
                    //逆地理编码
                    MGeocoder.getLocation($scope.addressData , function(status, result){
                        if(status === 'complete' && result.info === 'OK'){
                            //console.log(result.geocodes[0].location)
                            saveData(result.geocodes[0].location);
                        }
                    });
                });

            }
        }
    }
})();