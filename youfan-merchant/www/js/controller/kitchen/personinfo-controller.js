/**
 * Created by perfection on 15-8-17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('personinfo', personInfo);


    function personInfo($scope, $filter, $state, $stateParams, $ionicActionSheet, $ionicPopup, $rootScope, $timeout, $http, $cordovaCamera, $ionicLoading) {
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


        $scope.Province_$index = function (Province) {
            $rootScope.Province = Province;
        };

        $scope.scity_$index = function (city) {
            $rootScope.city = city;
        };

        $scope.city_$index = function (city) {
            $rootScope.Province = '';
            $rootScope.city = city;
        };
        $http.post(
            "http://192.168.1.110:8080/user/getMerchantUserInfo", {"id": $rootScope.user.id}, {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                if (data.code == "0") {
                    if (data.payload == null) {
                        $rootScope.Province = "";
                        $rootScope.city = "";
                        $scope.ages = "请选择";
                    } else {
                        if (data.payload.address != null) {
                            var isCity = false;
                            $scope.citys.forEach(function (value) {
                                if (data.payload.address == value) {
                                    isCity = true;
                                }
                            });
                            console.log(isCity);
                            if (isCity) {
                                $rootScope.city = data.payload.address;
                            } else {
                                var templateAddress = data.payload.address.split("省");
                                $rootScope.Province = templateAddress + "省";
                                $rootScope.city = templateAddress[1];
                            }
                        } else {
                            $rootScope.Province = "";
                            $rootScope.city = "请选择";
                        }
                        if (data.payload.sex == null) {
                            $scope.sex = "";
                        } else {
                            $scope.sex = data.payload.sex;
                        }
                        if (data.payload.ageRange == null) {
                            $scope.ages = "请选择";
                        } else {
                            $scope.ages = data.payload.ageRange;
                        }
                        if (data.payload.realName != null) {
                            $scope.user.realName = data.payload.realName;
                        }
                        $scope.image = {
                            path: ["", "", ""]
                        };
                        if (data.payload.headPortraitPicUrl != null) {
                            //$scope.imageData.headPortraitPicUrl = data.payload.headPortraitPicUrl;
                            $scope.image.path.push(data.payload.headPortraitPicUrl);
                        }
                        if (data.payload.healthCertificatePicUrl != null) {
                            //$scope.imageData.healthCertificatePicUrl = data.payload.healthCertificatePicUrl;
                            $scope.image.path.push(data.payload.healthCertificatePicUrl);
                        }
                        if (data.payload.idCardPicUrl != null) {
                            //$scope.imageData.idCardPicUrl = data.payload.idCardPicUrl
                            $scope.image.path.push(data.payload.idCardPicUrl);
                        }
                    }
                }

                $scope.pId = $stateParams.pId;
                if ($scope.pId) {
                    $scope.citys = $scope.Provinces[$scope.pId].citys;
                }


            }).error(function (error) {
                console.log(error)
            });


        $scope.saveUserInfo = function () {
            alert(JSON.stringify($scope.imageData));
            var userInfo = {
                realName: $scope.user.realName,
                address: $rootScope.Province + $rootScope.city,
                ageRange: $scope.ages,
                headPortraitPicUrl: $scope.imageData.headPortraitPicUrl,
                healthCertificatePicUrl: $scope.imageData.healthCertificatePicUrl,
                idCardPicUrl: $scope.imageData.idCardPicUrl,
                id: $rootScope.user.id,
                sex: $scope.sex
            };
            $http.post(
                "http://192.168.1.110:8080/user/saveMerchantUserInfo", JSON.stringify(userInfo), {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                    var options;
                    if (data.code == "0" && data.payload != null) {
                        options = {
                            "title": "系统繁忙！",
                            "buttons": [{
                                text: "重试",
                                type: "button-positive clam",
                                onTap: function () {
                                    $scope.saveUserInfo();
                                }
                            }, {
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
                }).error(function (error) {
                    console.log(error)
                });
        };
        $scope.getImg = function (buttonId, url) {
            $scope.image.path[Number(buttonId)] = url;
            uploadImg(buttonId, url, $ionicLoading, $scope);
        };
        $scope.saveImagePath = function (buttonId, url) {
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
            createActionSheet(buttonId, $ionicActionSheet, $scope, $cordovaCamera);
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
