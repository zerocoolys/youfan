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


    function kitchenInfo($scope, $filter, $state, $rootScope, $http, $ionicModal, $ionicPopup) {

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
            "http://192.168.1.110:8080/user/getMerchantKitchenInfo", JSON.stringify({"id": $rootScope.user.id}), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                if (data.code == "0") {
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
            var kitchenAddressTemplate = "";
            if ($rootScope.Province_s != "" && $rootScope.Province_s != null && $rootScope.Province_s != undefined) {
                kitchenAddressTemplate += $rootScope.Province_s
            }
            if ($rootScope.city_s != "" && $rootScope.city_s != null && $rootScope.city_s != undefined) {
                kitchenAddressTemplate += $rootScope.city_s;
            }
            if ($scope.kitchenInfo.kitchenAddress.specificAddress != null && $scope.kitchenInfo.kitchenAddress.specificAddress != "" || $scope.kitchenInfo.kitchenAddress.specificAddress != undefined
            ) {
                kitchenAddressTemplate += $scope.kitchenInfo.kitchenAddress.specificAddress;
            }
            var hasKitchenName = $scope.kitchenInfo.kitchenName != null && $scope.kitchenInfo.kitchenName != "" && $scope.kitchenInfo.kitchenName != undefined;
            var hasCuisine = $scope.kitchenInfo.characteristic != null && $scope.kitchenInfo.characteristic != [] && $scope.kitchenInfo.characteristic != "" && $scope.kitchenInfo.characteristic != undefined;
            var hasKitchenAddress = kitchenAddressTemplate != "";
            if (hasKitchenName && hasCuisine && hasKitchenAddress) {
                var MGeocoder;
                //加载地理编码插件
                AMap.service(["AMap.Geocoder"], function () {
                    MGeocoder = new AMap.Geocoder({
                        //city:"010", //城市，默认：“全国”
                        radius: 500 //范围，默认：500
                    });
                    //逆地理编码
                    MGeocoder.getLocation(kitchenAddressTemplate, function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            var merchantKitchenInfoVO = {
                                id: $rootScope.user.id, //厨房id与商家用户id匹配
                                kitchenName: $scope.kitchenInfo.kitchenName, //厨房名称
                                phoneNumber: $scope.kitchenInfo.phoneNumber, //手机号码
                                cuisine: [$scope.kitchenInfo.characteristic[0], $scope.kitchenInfo.characteristic[1]],   //厨房特色，菜系
                                kitchenAddress: $rootScope.Province_s + $rootScope.city_s + $scope.kitchenInfo.kitchenAddress.specificAddress,  //厨房地址
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
                                location: [result.geocodes[0].location.lng, result.geocodes[0].location.lat]
                            };
                            if ($scope.kitchenInfo.phoneNumber != null || $scope.kitchenInfo.phoneNumber != "" || $scope.kitchenInfo.phoneNumber != undefined) {
                                var phoneNumber = $scope.kitchenInfo.phoneNumber; //获取手机号
                                var phoneNumberReg = !!phoneNumber.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
                                //手机号码验证
                                if (!phoneNumberReg) {
                                    var options = {
                                        "title": "手机号码格式不正确!",
                                        "buttons": [{
                                            text: "关闭",
                                            type: "button-positive clam",
                                            onTap: function () {

                                            }
                                        }]
                                    };
                                    $ionicPopup.alert(options);
                                }
                            }
                            $http.post(
                                "http://127.0.0.1:8080/user/saveMerchantKitchenInfo", (merchantKitchenInfoVO), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                                    console.log(data);
                                    var options;
                                    if (Number(data.code) == 0) {
                                        options = {
                                            "title": "保存成功!",
                                            "buttons": [{
                                                text: "确定",
                                                type: "button-positive clam",
                                                onTap: function () {
                                                    $location.path("#/editkitchen")
                                                }
                                            }]
                                        };
                                    } else {
                                        options = {
                                            "title": "系统繁忙!",
                                            "buttons": [{
                                                text: "关闭",
                                                type: "button-positive clam"
                                            }]
                                        };
                                    }
                                    $ionicPopup.alert(options);
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
            } else {
                var options = {
                    "title": "信息不完整!",
                    "buttons": [{
                        text: "关闭",
                        type: "button-positive clam"
                    }]
                };
            }


        };
        $scope.Provinces = [
            {
                id: '四川省',
                citys: ['成都市', '泸州市']
            },
            {
                id: '辽宁省',
                citys: ['大连市', '泸州市']
            }
        ];
        $ionicModal.fromTemplateUrl('templates/home.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.home = modal;
        });
        $ionicModal.fromTemplateUrl('templates/city.html', {
            scope: $scope
        }).then(function (homes) {
            $scope.homes = homes;
            //$scope.home.remove();
        });
        $scope.Province_$index = function (Province) {
            $scope.home.hide();
            $rootScope.Province_s = Province.id;
            $scope.c_citys = Province.citys;
            $scope.homes.show();

        };

        $scope.scity_$index = function (ciy) {
            $scope.homes.hide();
            $rootScope.city_s = ciy;
        };

        $scope.city_$index = function (city) {
            $scope.home.hide();
            $rootScope.Province_s = '';
            $rootScope.city_s = city;
        };

    }
})();
