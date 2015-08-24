/**
 * Created by hydm on 2015/8/17.
 */
angular.module('yf_merchant.manage-dishes_service', [])

    .factory('KwService', function () {
        // Some fake testing data
        var kws = [{kw: "0", text: "不辣"}, {kw: "1", text: "微辣"}, {kw: "2", text: "辣"}, {kw: "3", text: "特辣"}];

        return {
            all: function () {
                return kws;
            }
        };

    })

    .factory('ManageDishesService', function ($http, $rootScope, $ionicLoading) {
        function saveDishes(dishes) {
            console.log(dishes);
            $http.post("http://192.168.1.110:8080/user/saveMerchantUserInfo", dishes).success(function (data, status, headers, config) {
                console.log(status);
                $rootScope.$broadcast("yf-merchant-save-dishes-success");
            }).error(function (data, status, headers, config) {
                alert("error");
                $rootScope.$broadcast("yf-merchant-save-dishes-error");
            })
        }

        return {
            saveDishes: saveDishes
        };

    })

;