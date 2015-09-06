/**
 * Created by perfection on 15-8-21.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo_pic', kitchenInfo_pic)
    ;

    function kitchenInfo_pic($scope, $filter, $state, $http, $ionicActionSheet, $cordovaCamera, $rootScope, $ionicLoading) {
        $scope.imgs = [];
        $scope.imgsTemplate = [];
        $http.post(
            "http://127.0.0.1:8080/user/getMerchantKitchenInfo", JSON.stringify({"id": $rootScope.user.id}), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                if (data.code == "200") {
                    if (data.payload != null) {
                        $scope.imgs = data.payload.kitchenPicUrl;
                    }
                }
            });
        $scope.removePic = function (_index) {
            $scope.imgs.splice(_index, 1);
            $scope.imgsTemplate.slice(_index, 1);
        };
        $scope.savePicPath = function () {
            var kitchenPic = {
                id: $rootScope.user.id,
                kitchenPicUrl: $scope.imgsTemplate
            };
            $http.post(
                "http://192.168.1.110:8080/user/saveMerchantKitchenPicInfo", JSON.stringify(kitchenPic), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                    var options;
                    if (data.code == "200") {
                        if (data.payload == null || data.payload == "") {
                            options = {
                                "title": "系统繁忙！",
                                "buttons": [{
                                    text: "关闭",
                                    type: "button-positive clam"
                                }]
                            };
                        } else {
                            options = {
                                "title": "保存成功！",
                                "buttons": [{
                                    text: "确定",
                                    type: "button-positive clam"
                                }]
                            };
                        }
                        $ionicPopup.alert(options);
                    } else {
                        options = {
                            "title": "系统繁忙！",
                            "buttons": [{
                                text: "关闭",
                                type: "button-positive clam"
                            }]
                        };
                        $ionicPopup.alert(options);
                    }
                });
        };
        $scope.getImg = function (buttonId, url) {
            $scope.imgs.push({
                index: $scope.imgs.length,
                url: url
            });
            //buttonId, imageUrl,$ionicLoading,$scope
            uploadImg(0, url, $ionicLoading, $scope);
        };
        $scope.saveImagePath = function (buttonId, url) {
            switch (Number(buttonId)) {
                case 0:
                    $scope.imgsTemplate.push(url);
                    break;
            }
        };
        $scope.addPic = function () {
            if($scope.imgs.length<=4){
                createActionSheet(0, $ionicActionSheet, $scope, $cordovaCamera);
            }else{
                var options = {
                    "title": "图片最多4张！",
                    "buttons": [{
                        text: "关闭",
                        type: "button-positive clam"
                    }]
                };
                $ionicPopup.alert(options);
            }
        };
    }
})();
