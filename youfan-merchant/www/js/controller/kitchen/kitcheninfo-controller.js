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
        $scope.kitchenInfo = {
            kitchenName: "",
            phoneNumber: "",
            characteristic: [],
            kitchenAddress: {
                province: "",
                city: "",
                specificAddress: ""
            }
        };
        $http.post(
            "http://127.0.0.1:8080/user/getMerchantKitchenInfo", JSON.stringify({"id": $rootScope.user.id}), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                if (data.code == "200") {
                    if (data.payload != null) {
                        $scope.kitchenInfo = {
                            kitchenName: data.payload.kitchenName,
                            phoneNumber: data.payload.phoneNumber,
                            characteristic: data.payload.cuisine,
                            kitchenAddress: {
                                province: data.payload.kitchenAddress.substr(0, 2),
                                city: data.payload.kitchenAddress.substr(2, 2),
                                specificAddress: data.payload.kitchenAddress.substr(4, data.payload.kitchenAddress.length)
                            }
                        };
                    }
                }
            });
        $scope.saveKitchenInfo = function () {
            var MGeocoder;
            //加载地理编码插件
            AMap.service(["AMap.Geocoder"], function () {
                MGeocoder = new AMap.Geocoder({
                    //city:"010", //城市，默认：“全国”
                    radius: 500 //范围，默认：500
                });
                //逆地理编码
                MGeocoder.getLocation($scope.kitchenInfo.kitchenAddress.province + $scope.kitchenInfo.kitchenAddress.city + $scope.kitchenInfo.kitchenAddress.specificAddress, function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        var merchantKitchenInfoVO = {
                            id: $rootScope.user.id, //厨房id与商家用户id匹配
                            kitchenName: $scope.kitchenInfo.kitchenName, //厨房名称
                            phoneNumber: $scope.kitchenInfo.phoneNumber, //手机号码
                            cuisine: [$scope.kitchenInfo.characteristic[0], $scope.kitchenInfo.characteristic[1]],   //厨房特色，菜系
                            kitchenAddress: $scope.kitchenInfo.kitchenAddress.province + $scope.kitchenInfo.kitchenAddress.city + $scope.kitchenInfo.kitchenAddress.specificAddress,  //厨房地址
                            isTakeSelf: false, //是否支持自取
                            isCanteen: false,  //是否支持食堂
                            galleryFul: 1, //如果支持厨房，该字段不为空，容纳人数
                            isDistribution: false, //是否支持配送
                            disPrice: 2,    //配送费用
                            disRange: 2,    //配送范围
                            distributionExplain: "我喜欢查水表",    //如果配送，配送说明
                            startTime: "00:00", //开店时间
                            endTime: "24:59",   //关店时间
                            desc: "水表厨房",    //厨房备注
                            lat: result.geocodes[0].location.lat, //经度
                            lng: result.geocodes[0].location.lng //纬度
                        };
                        $http.post(
                            "http://127.0.0.1:8080/user/saveMerchantKitchenInfo", (merchantKitchenInfoVO), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                                $scope.user = data;
                            }, function (error) {
                                console.log(error)
                            });
                    } else {
                        var options = {
                            "title": "地址信息错误！",
                            "buttons": [{
                                text: "关闭",
                                type: "button-positive clam"
                            }]
                        };
                        $ionicPopup.alert(options);
                    }
                });
            });


        }
    }
})();
