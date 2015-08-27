/**
 * Created by perfection on 15-8-24.
 */
(function () {
    'use strict';

    angular.module('yf_merchant')
        .controller('register', register);

    function register($scope,$state) {
        $scope.register = function(user){
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
