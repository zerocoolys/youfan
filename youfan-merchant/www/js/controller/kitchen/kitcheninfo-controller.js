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


    function kitchenInfo($scope, $filter, $state, $rootScope, $http, $ionicPopup) {
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
                            location: [result.geocodes[0].location.lng, result.geocodes[0].location.lat]
                        };
                        if ($scope.kitchenInfo.phoneNumber != null || $scope.kitchenInfo.phoneNumber != "" || $scope.kitchenInfo.phoneNumber != undefined) {
                            var phoneNumber = $scope.kitchenInfo.phoneNumber; //获取手机号
                            var phoneNumberReg = !!phoneNumber.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
                            //手机号码验证
                            if (!phoneNumberReg) {
                                options = {
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
                            "http://192.168.1.110:8080/user/saveMerchantKitchenInfo", (merchantKitchenInfoVO), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                                if (data.code == "0") {
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


        }
    }
})();
