/**
 * Created by perfection on 15-8-21.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('kitcheninfo_pic', kitchenInfo_pic)
    ;

    function kitchenInfo_pic($scope, $filter, $state, $http, $ionicActionSheet, $cordovaCamera, $rootScope, $ionicLoading, $location, $cordovaImagePicker, $ionicPopup, YF_MERCHANT_HOST, YF_MERCHANT_INFO,$ionicModal) {
        $scope.imgs = [];
        $scope.imgsTemplate = [];
        $http.post(
            YF_MERCHANT_HOST + "/user/getMerchantKitchenInfo", JSON.stringify({"id": YF_MERCHANT_INFO.mID}), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                if (data.code == "0") {
                    if (data.payload != null) {
                        data.payload.kitchenPicUrl.forEach(function (value) {
                            $scope.imgs.push({
                                index: $scope.imgs.length,
                                url: value
                            });
                            $scope.imgsTemplate.push({
                                index: $scope.imgs.length,
                                url: value
                            });
                        });

                    }
                }
            }).error(function (data, status, headers, config) {
                var options = {
                    "title": "服务器连接失败！",
                    "buttons": [{
                        text: "关闭",
                        type: "button-calm"
                    }]
                };
                $ionicPopup.alert(options);
            });

        $scope.removePic = function (_index) {
            $scope.imgs.splice(_index, 1);
            $scope.imgsTemplate.slice(_index, 1);
        };
        $scope.isChange = function () {
            var isChangePic = true;
            if (Number($scope.imgsTemplate.length) != Number($scope.imgs.length)) {
                isChangePic = false;
            } else if (Number($scope.imgsTemplate.length) == Number($scope.imgs.length) && Number($scope.imgs.length) != 0) {
                if (Number($scope.imgs.length) == 0) {
                    isChangePic = true;
                } else {
                    for (var i = 0; i < Number($scope.imgsTemplate.length); i++) {
                        if ($scope.imgsTemplate[i].url != $scope.imgs[i].url) {
                            isChangePic = false;
                            break;
                        }
                    }
                }
            }
            if (isChangePic) {
                $state.go("kitcheninfo")
            } else {
                var options = {
                    "title": "是否保存当前修改内容！",
                    "buttons": [{
                        text: "关闭",
                        type: "button-calm",
                        onTap: function () {
                            $state.go("kitcheninfo")
                        }
                    }, {
                        text: "确定",
                        type: "button-calm",
                        onTap: function () {
                            $scope.savePicPath();
                        }
                    }
                    ]
                };
                $ionicPopup.confirm(options);
            }
        };
        $scope.savePicPath = function () {
            if ($scope.imgsTemplate == [] || $scope.imgsTemplate == null) {
                var options = {
                    "title": "请添加图片！",
                    "buttons": [{
                        text: "关闭",
                        type: "button-calm"
                    }]
                };
                $ionicPopup.alert(options);
            } else {
                var urls = [];
                for (var k = 0; k < Number($scope.imgsTemplate.length); k++) {
                    urls.push($scope.imgsTemplate[k].url);
                }
                var kitchenPic = {
                    id: YF_MERCHANT_INFO.mID,
                    kitchenPicUrl: urls
                };
                $http.post(
                    YF_MERCHANT_HOST + "/user/saveMerchantKitchenPicInfo", JSON.stringify(kitchenPic), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                        var options;
                        if (Number(data.code) == 0) {
                            if (data.payload == null || data.payload == "") {
                                options = {
                                    "title": "系统繁忙！",
                                    "buttons": [{
                                        text: "关闭",
                                        type: "button-calm"
                                    }]
                                };
                            } else {
                                options = {
                                    "title": "保存成功！",
                                    "buttons": [{
                                        text: "确定",
                                        type: "button-calm",
                                        onTap: function () {
                                            for (var k = 0; k < Number($scope.imgsTemplate.length); k++) {
                                                $scope.imgs.push({
                                                    index: $scope.imgs.length,
                                                    url: $scope.imgsTemplate[k].url
                                                });
                                            }
                                            $state.go("kitcheninfo")
                                        }
                                    }]
                                };
                            }
                            $ionicPopup.alert(options);
                        } else {
                            options = {
                                "title": "系统繁忙！",
                                "buttons": [{
                                    text: "关闭",
                                    type: "button-calm"
                                }]
                            };
                            $ionicPopup.alert(options);
                        }
                    }).error(function (data, status, headers, config) {
                        var options = {
                            "title": "服务器连接失败！",
                            "buttons": [{
                                text: "关闭",
                                type: "button-calm"
                            }]
                        };
                        $ionicPopup.alert(options);
                    });
            }

        };
        $scope.getImg = function (buttonId, url) {
            $scope.imgs.push({
                index: $scope.imgs.length,
                url: url
            });
            //buttonId, url, $ionicLoading, $scope
            uploadImg(0, url, $ionicLoading, $scope);
        };
        $scope.saveImagePath = function (buttonId, url) {
            switch (Number(buttonId)) {
                case 0:
                    $scope.imgsTemplate.push({
                        index: $scope.imgsTemplate.length,
                        url: url
                    });
                    break;
            }
        };
        $scope.addPic = function () {
            if ($scope.imgs.length <= 4) {
                createActionSheet(0, $ionicActionSheet, $scope, $cordovaCamera, $cordovaImagePicker);
            } else {
                var options = {
                    "title": "图片最多4张！",
                    "buttons": [{
                        text: "关闭",
                        type: "button-calm"
                    }]
                };
                $ionicPopup.alert(options);
            }
        };
        $ionicModal.fromTemplateUrl('templates/dishPic.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.dishPic = modal;
        });
        $scope.replacePic = function (_index) {

            $scope.imgs.unshift($scope.imgs[_index]);
            $scope.imgs.splice(_index+1,1);
            $ionicLoading.show({
                template:"设置成功"
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
            //$scope.imgs.splice(0,1,[$scope.imgs[_index]]);


        };
    }
})();
