/**
 * Created by hydm on 2015/8/17.
 */
angular.module('yf_merchant.manage_dishes_service', [])

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
            $http.post("http://localhost:8080/menu", dishes).success(function (data, status, headers, config) {
                $rootScope.$broadcast("yf-merchant-save-dishes-success");
            }).error(function (data, status, headers, config) {
                alert("error");
                $rootScope.$broadcast("yf-merchant-save-dishes-error");
            })
        }

        function allDishes(merchantId, dishesType) {
            $http.get("http://localhost:8080/menu/list/" + merchantId + "/" + dishesType).success(function (data, status, headers, config) {
                $rootScope.$broadcast("yf-merchant-load-dishes-success", data.menus);
            }).error(function (data, status, headers, config) {
                $rootScope.$broadcast("yf-merchant-load-dishes-error");
            })
        }

        function allSaleDishes(merchantId) {
            $http.get("http://localhost:8080/menu/list/" + merchantId).success(function (data, status, headers, config) {
                $rootScope.$broadcast("yf-merchant-load-dishes-success", data.menus);
            }).error(function (data, status, headers, config) {
                $rootScope.$broadcast("yf-merchant-load-dishes-error");
            })
        }

        function conversionSale(dishes) {
            $http.post("http://localhost:8080/menu/conversion/sale", dishes).success(function (data, status, headers, config) {
                $rootScope.$broadcast("yf-merchant-dishes-reload");
            }).error(function (data, status, headers, config) {
                alert("系统错误");
                $ionicLoading.hide();
            })
        }

        function changeDishesStock(changeDishes) {
            $http.post("http://localhost:8080/menu/conversion/stock", changeDishes).success(function (data, status, headers, config) {
                $rootScope.$broadcast("yf-merchant-dishes-reload");
            }).error(function (data, status, headers, config) {
                alert("系统错误");
                $ionicLoading.hide();
            })
        }

        function changeDishesRestNum(changeDishes) {
            $http.post("http://localhost:8080/menu/conversion/restNum", changeDishes).success(function (data, status, headers, config) {
                $rootScope.$broadcast("yf-merchant-dishes-reload");
            }).error(function (data, status, headers, config) {
                alert("系统错误");
                $ionicLoading.hide();
            })
        }

        function findOneDishes(menuId) {
            $http.get("http://localhost:8080/menu/lists/" + menuId).success(function (data, status, headers, config) {
                $rootScope.$broadcast("yf-merchant-load-dishes-success", data["menu"]);
            }).error(function (data, status, headers, config) {
                alert("系统错误");
                $rootScope.$broadcast("yf-merchant-error");
                $ionicLoading.hide();
            })
        }

        function updateDishes(dishes) {
            $http.post("http://localhost:8080/menu/renewal/" + dishes.menuId, dishes).success(function (data, status, headers, config) {
                console.log(data);
                $rootScope.$broadcast("yf-merchant-renewal-dishes-success");
            }).error(function (data, status, headers, config) {
                alert("error");
                $rootScope.$broadcast("yf-merchant-save-dishes-error");
            })
        }

        function removeDishes(menuId) {
            $http.delete("http://localhost:8080/menu/menus/" + menuId).success(function (data, status, headers, config) {
                $rootScope.$broadcast("yf-merchant-delete-dishes-success");
            }).error(function (data, status, headers, config) {
                alert("error");
                $rootScope.$broadcast("yf-merchant-save-dishes-error");
            })
        }

        return {
            findOneDishes: findOneDishes,
            saveDishes: saveDishes,
            updateDishes: updateDishes,
            removeDishes: removeDishes,
            allDishes: allDishes,
            allSaleDishes: allSaleDishes,
            conversionSale: conversionSale,
            changeDishesStock: changeDishesStock,
            changeDishesRestNum: changeDishesRestNum
        };

    })

;