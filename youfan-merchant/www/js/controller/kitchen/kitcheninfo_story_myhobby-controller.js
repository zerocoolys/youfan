/**
 * Created by perfection on 15-8-21.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo_story_myhobby', kitchenInfo_story_myHobby)
    ;

    function kitchenInfo_story_myHobby($scope, $filter, $state, $ionicPopup, $location, $rootScope, $http, YF_MERCHANT_HOST, YF_MERCHANT_INFO) {
        $scope.text = "";
        var textTemplate = "";
        $http.post(
            YF_MERCHANT_HOST + "/user/getMerchantKitchenInfo", JSON.stringify({"id": YF_MERCHANT_INFO.mID}), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                if (Number(data.code) == 0) {
                    if (data.payload != null) {
                        $scope.text = data.payload.hobby;
                        textTemplate = data.payload.hobby;
                    }
                }
            }).error(function (data, status, headers, config) {
                var options = {
                    "title": "服务器连接失败！",
                    "buttons": [{
                        text: "关闭",
                        type: "button-positive clam"
                    }]
                };
                $ionicPopup.alert(options);
            });
        //文本框限制输入字数300
        $scope.checkText = function (text) {
            if (Number(text.length) > 300) {
                $scope.text = text.substr(0, 300);
            } else {
                $scope.text = text;
            }
        };
        $scope.isChange = function () {
            var isChange = textTemplate == $scope.text;
            if (!isChange) {
                var options = {
                    "title": "是否保存当前修改内容！",
                    "buttons": [{
                        text: "关闭",
                        type: "button-positive clam",
                        onTap: function () {
                            $state.go("kitcheninfo-story");
                        }
                    }, {
                        text: "确定",
                        type: "button-positive clam",
                        onTap: function () {
                            $scope.isSaveText();
                        }
                    }]
                };
                $ionicPopup.confirm(options);
            } else {
                $state.go("kitcheninfo-story")
            }

        };
        $scope.isSaveText = function () {
            textTemplate = $scope.text;
            $http.post(
                YF_MERCHANT_HOST + "/user/saveMyHobby", {
                    "id": YF_MERCHANT_INFO.mID,
                    "hobby": $scope.text
                }, {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                    var option;
                    if (Number(data.code) == 0) {
                        if (data.payload == null || data.payload == "") {
                            option = {
                                "title": "系统繁忙！",
                                "buttons": [{
                                    text: "关闭",
                                    type: "button-positive clam"
                                }]
                            };
                        } else {
                            option = {
                                "title": "保存成功！",
                                "buttons": [{
                                    text: "确定",
                                    type: "button-positive clam",
                                    onTap: function () {
                                        $state.go("kitcheninfo-story")
                                    }
                                }]
                            };
                        }
                        $ionicPopup.alert(option);
                    } else {
                        option = {
                            "title": "系统繁忙！",
                            "buttons": [{
                                text: "关闭",
                                type: "button-positive clam"
                            }]
                        };
                        $ionicPopup.alert(option);
                    }
                }).error(function (data, status, headers, config) {
                    var options = {
                        "title": "服务器连接失败！",
                        "buttons": [{
                            text: "关闭",
                            type: "button-positive clam"
                        }]
                    };
                    $ionicPopup.alert(options);
                });


        };
    }
})();
