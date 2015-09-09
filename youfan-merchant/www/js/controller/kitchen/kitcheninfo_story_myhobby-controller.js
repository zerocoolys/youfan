/**
 * Created by perfection on 15-8-21.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo_story_myhobby', kitchenInfo_story_myHobby)
    ;

    function kitchenInfo_story_myHobby($scope, $filter, $state, $ionicPopup, $location, $rootScope, $http) {
        $scope.text = "";
        var textTemplate = "";
        $http.post(
            "http://127.0.0.1:8080/user/getMerchantKitchenInfo", JSON.stringify({"id": $rootScope.user.id}), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                if (data.code == "0") {
                    if (data.payload != null) {
                        $scope.text = data.payload.hobby;
                        var textTemplate = data.payload.hobby;
                    }
                }
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
            if (isChange) {
                var options = {
                    "title": "是否保存当前修改内容！",
                    "buttons": [{
                        text: "关闭",
                        type: "button-positive clam",
                        onTap: function () {
                            $location.path("#/kitcheninfo-story")
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
                return;
            }

        };
        $scope.isSaveText = function () {
            textTemplate = $scope.text;
            $http.post(
                "http://127.0.0.1:8080/user/saveMyHobby", {
                    "id": $rootScope.user.id,
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
                                        $location.path("#/kitcheninfo-story")
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
                });


        };
    }
})();
