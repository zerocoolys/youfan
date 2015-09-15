/**
 * Created by perfection on 15-8-17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('personinfo', personInfo);


    function personInfo($scope, $ionicModal, $ionicActionSheet, $ionicPopup, $rootScope, $timeout, $http, $cordovaCamera, $ionicLoading, $cordovaImagePicker, $stateParams, $state, YF_MERCHANT_HOST, YF_MERCHANT_INFO) {
        $scope.sex = "男";
        $scope.user = {
            realName: ""
        };
        $scope.image = {
            path: ["", "", ""]
        };
        $scope.imageData = {
            headPortraitPicUrl: "",
            healthCertificatePicUrl: "",
            idCardPicUrl: ""
        };
        $scope.allTemplate = "";
        $scope.isChangePic = true;
        $scope.selectSex = function (sex) {
            $scope.sex = sex;
        };
        $scope.citys = [
            '北京市', '上海市', '重庆市'
        ];
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
            $rootScope.Province = Province.id;
            $scope.c_citys = Province.citys;
            $scope.homes.show();

        };

        $scope.scity_$index = function (ciy) {
            $scope.homes.hide();
            $rootScope.city = ciy;
        };

        $scope.city_$index = function (city) {
            $scope.home.hide();
            $rootScope.Province = '';
            $rootScope.city = city;
        };

        $http.post(
            YF_MERCHANT_HOST + "/user/getMerchantUserInfo", {"id": YF_MERCHANT_INFO.mID}, {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                if (data.code == "0") {
                    if (data.payload == null) {
                        $rootScope.Province = "";
                        $rootScope.city = "";

                    } else {
                        if (data.payload.address != null) {
                            var templateAddress = data.payload.address.split("-");
                            if (templateAddress.length == 2) {
                                $rootScope.Province = templateAddress[0];
                                $rootScope.city = templateAddress[1];
                                $scope.allTemplate += $rootScope.Province + $rootScope.city;
                            } else if (templateAddress.length > 0) {
                                $scope.allTemplate += $rootScope.Province;
                                $rootScope.Province = templateAddress[0];
                            }
                        } else {
                            $rootScope.Province = "";
                            $rootScope.city = "请选择";
                        }
                        if (data.payload.sex == null) {
                            $scope.sex = "";
                        } else {
                            $scope.sex = data.payload.sex;
                            $scope.allTemplate += $scope.sex;
                        }
                        if (data.payload.ageRange == null) {
                            $scope.ages = "请选择";
                        } else {
                            $scope.ages = data.payload.ageRange;
                            $scope.allTemplate += $scope.ages;
                        }
                        if (data.payload.realName != null) {
                            $scope.user.realName = data.payload.realName;
                            $scope.allTemplate += $scope.user.realName;
                        }
                        if (data.payload.headPortraitPicUrl != null) {
                            $scope.imageData.headPortraitPicUrl = data.payload.headPortraitPicUrl;
                            $scope.image.path[0] = (data.payload.headPortraitPicUrl);
                        }
                        if (data.payload.healthCertificatePicUrl != null) {
                            $scope.imageData.healthCertificatePicUrl = data.payload.healthCertificatePicUrl;
                            $scope.image.path[1] = (data.payload.healthCertificatePicUrl);
                        }
                        if (data.payload.idCardPicUrl != null) {
                            $scope.imageData.idCardPicUrl = data.payload.idCardPicUrl
                            $scope.image.path[2] = (data.payload.idCardPicUrl);
                        }
                    }
                }

                $scope.pId = $stateParams.pId;
                if ($scope.pId) {
                    $scope.citys = $scope.Provinces[$scope.pId].citys;
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

        $scope.isChange = function () {
            console.log("sdjfkhsdj");
            var all_tem = "";
            if ($rootScope.Province != null || $rootScope.Province != "" || $rootScope.Province != undefined) {
                all_tem += $rootScope.Province;
            }
            if ($rootScope.city != null || $rootScope.city != "" || $rootScope.city != undefined) {
                all_tem += $rootScope.city;
            }
            all_tem += $scope.sex;
            all_tem += $scope.ages;
            all_tem += $scope.user.realName;
            if (all_tem == $scope.allTemplate && $scope.isChangePic) {
                $state.go("editkitchen");
            } else {
                var options = {
                    "title": "是否保存当前修改内容！",
                    "buttons": [{
                        text: "关闭",
                        type: "button-calm",
                        onTap: function () {
                            $state.go("editkitchen")
                        }
                    }, {
                        text: "确定",
                        type: "button-calm",
                        onTap: function () {
                            $scope.saveUserInfo();
                        }
                    }
                    ]
                };
                $ionicPopup.confirm(options);
            }
        };
        $scope.saveUserInfo = function () {
            var addressTemplate = "";
            var isP_C = false;
            if ($rootScope.Province != null || $rootScope.Province != "" || $rootScope.Province != undefined) {
                addressTemplate += $rootScope.Province;
                isP_C = true;
            }
            if ($rootScope.city != null || $rootScope.city != "" || $rootScope.city != undefined) {
                if (isP_C) {
                    addressTemplate += "-" + $rootScope.city;
                } else {
                    addressTemplate += $rootScope.city;
                }

            }
            var hasRealName = $scope.user.realName == null || $scope.user.realName == "" || $scope.user.realName == undefined;
            var hasAddress = addressTemplate == "";
            var hasAgeRange = $scope.ages == null || $scope.ages == "" || $scope.ages == undefined;
            var hasSex = $scope.sex == null || $scope.sex == "" || $scope.sex == undefined;

            if (hasRealName || hasAddress || hasAgeRange || hasSex) {
                var options = {
                    "title": "信息不完整！",
                    "buttons": [{
                        text: "关闭",
                        type: "button-calm"
                    }]
                };
                $ionicPopup.alert(options);
            } else {
                var userInfo = {
                    realName: $scope.user.realName,
                    address: addressTemplate,
                    ageRange: $scope.ages,
                    headPortraitPicUrl: $scope.imageData.headPortraitPicUrl,
                    healthCertificatePicUrl: $scope.imageData.healthCertificatePicUrl,
                    idCardPicUrl: $scope.imageData.idCardPicUrl,
                    id: YF_MERCHANT_INFO.mID,
                    sex: $scope.sex
                };
                $http.post(
                    YF_MERCHANT_HOST + "/user/saveMerchantUserInfo", JSON.stringify(userInfo), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                        var options;
                        if (Number(data.code) != 0) {
                            options = {
                                "title": "系统繁忙！",
                                "buttons": [{
                                    text: "重试",
                                    type: "button-calm",
                                    onTap: function () {
                                        $scope.saveUserInfo();
                                    }
                                }, {
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
                                        $state.go("editkitchen");
                                    }
                                }]
                            };
                        }
                        $ionicPopup.alert(options);
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
            $scope.image.path[Number(buttonId)] = url;
            uploadImg(buttonId, url, $ionicLoading, $scope);
        };
        $scope.saveImagePath = function (buttonId, url) {
            $scope.isChangePic = false;
            switch (Number(buttonId)) {
                case 0:
                    $scope.imageData.headPortraitPicUrl = url;
                    break;
                case 2:
                    $scope.imageData.healthCertificatePicUrl = url;
                    break;
                case 1:
                    $scope.imageData.idCardPicUrl = url;
                    break;
            }
        };
        $scope.show = function (buttonId) {
            createActionSheet(buttonId, $ionicActionSheet, $scope, $cordovaCamera, $cordovaImagePicker);
        };
        $scope.showPopup = function () {
            $ionicActionSheet.show({
                buttons: [
                    {text: '<p  class="calm text-center"  >50后</p>'},
                    {text: '<p class="calm text-center"  >60后</p>'},
                    {text: '<p class="calm text-center"  >70后</p>'},
                    {text: '<p class="calm text-center"  >80后</p>'},
                    {text: '<p class="calm text-center"  >90后</p>'}
                ],
                cancelText: '<p  class="calm">取消</p>',
                buttonClicked: function (index) {
                    if (index == 0) {
                        $scope.ages = "50后";
                    }
                    else if (index == 1) {
                        $scope.ages = "60后";
                    }
                    else if (index == 2) {
                        $scope.ages = "70后";
                    }
                    else if (index == 3) {
                        $scope.ages = "80后";
                    }
                    else if (index == 4) {
                        $scope.ages = "90后";
                    }
                    return true;
                }
            });
        };


    }

})
();
