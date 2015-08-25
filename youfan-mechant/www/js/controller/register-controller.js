/**
 * Created by perfection on 15-8-24.
 */
(function () {
    'use strict';

    angular.module('yf_merchant')
        .controller('register', register)
        .factory("registerFn",function($http){
            return {
                register:function(user){
                    return $http.post(
                        "http://127.0.0.1:8080/user/register", JSON.stringify(user),{"Content-Type": "application/json;charset=utf-8"}).then(function (response) {
                            if(response.status==200){
                                return response.data;
                            }else{
                                return "";
                            }

                        }, function (error) {
                            console.log(error)
                        });
                },
                login:function(user){
                    return $http.post(
                        "http://127.0.0.1:8080/user/login", JSON.stringify(user),{"Content-Type": "application/json;charset=utf-8"}).then(function (response) {
                            if(response.status==200){
                                return response.data;
                            }else{
                                return "";
                            }

                        }, function (error) {
                            console.log(error)
                        });
                }
            }
        });

    function register($scope,registerFn,$state) {
        $scope.register = function(user){
            if(registerFn.register(user)!=null){
                if(registerFn.login(user)!=null){
                     $state.go("#/overview")
                }
            }
        };
        //$scope.messageLogin = function (user) {
        //
        //    var tel = user.tel;
        //    var verificationCode = user.verificationCode;
        //    if (tel == "") {
        //        var popupNull = $ionicPopup.show({
        //            title: '请输入手机号',
        //            scope: $scope
        //        });
        //        $timeout(function () {
        //            popupNull.close(); //由于某种原因2秒后关闭弹出
        //        }, 2000);
        //    } else {
        //        if (verificationCode == "") {
        //            var popupCodeNull = $ionicPopup.show({
        //                title: '请输入验证码',
        //                scope: $scope
        //            });
        //            $timeout(function () {
        //                popupCodeNull.close(); //由于某种原因2秒后关闭弹出
        //            }, 2000);
        //        } else {
        //            var code = $scope.codeUrl.split("/")[6];
        //            if (verificationCode != code) {
        //                var popupCodeError = $ionicPopup.show({
        //                    title: '验证码错误',
        //                    scope: $scope
        //                });
        //                $timeout(function () {
        //                    popupCodeError.close(); //由于某种原因2秒后关闭弹出
        //                }, 2000);
        //            }
        //        }
        //    }
        //
        //};
    }
})();
