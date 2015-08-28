/**
 * Created by perfection on 15-8-17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('personinfo', personInfo)
        .factory("personInfoFn", function ($http) {
            return {
                saveUserInfo: function (person) {
                    return $http.post(
                        "http://127.0.0.1:8080/user/saveMerchantUserInfo", JSON.stringify(person), {"Content-Type": "application/json;charset=utf-8"}).then(function (response) {
                            //console.log(response.$state.value);
                            return response;
                        }, function (error) {
                            console.log(error)
                        });
                }
            }
        });


    function personInfo($scope, $filter, $state, personInfoFn, $stateParams, $ionicActionSheet, $ionicPopup, $rootScope, $timeout) {
        $scope.ages = "";
        $rootScope.Province = "";
        $rootScope.city = "";
        $scope.sex = "";


        $scope.saveUserInfo = function (person) {
            if ($rootScope.user == "undefined" || $rootScope.user == "") {
            } else {
                person.id = $rootScope.user.id;
                console.log(personInfoFn.saveUserInfo(person));
            }
        };


        $scope.show = function () {
            $ionicActionSheet.show({
                buttons: [
                    {text: '<p class="calm text-center"  >拍照</p>'},
                    {text: '<p class="calm text-center" >从相册中选取</p>'},
                ],
                cancelText: '<p  class="calm">取消</p>',
                buttonClicked: function (index) {

                    return true;
                }
            });


        };
        $scope.ages = "请选择";
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

        $scope.pId = $stateParams.pId;

        if ($scope.pId) {
            $scope.citys = $scope.Provinces[$scope.pId].citys;
        }

        $scope.Province_$index = function (Province) {
            $rootScope.Province = Province;
        };

        $scope.scity_$index = function (city) {
            $rootScope.city = city;
        };
        $rootScope.city = "请选择";
        $scope.city_$index = function (city) {
            $rootScope.Province = '';
            $rootScope.city = city;
        };
    }
})
();
