/**
 * Created by ss on 2015/8/28.
 */
ControllerModule.controller('ResetPwdOneCtrl', function ($scope, $rootScope, $ionicPopup, $interval, $timeout, $location, $state, SMSService) {

    $scope.user = {
        tel: "",
        captcha: "",
        pwd: ""
    };

    /**
     * 重置密码
     */
    $scope.verifyCaptcha = function (tel) {
        var captcha = $scope.user.captcha;
        var re = /(^1[3|5|8][0-9]{9}$)/;

        if (tel.trim() != "") {
            if (!re.test(tel.trim())) {
                var telVerify = $ionicPopup.show({
                    title: '请输入正确的手机号',
                    scope: $scope
                });
                $timeout(function () {
                    telVerify.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            } else {
                if (captcha.trim() != "") {
                    SMSService.forgetPasswordCaptchaVerify(tel).success(function (data) {
                        if (data.payload != null && data.payload == captcha) {
                            $state.go('tab.reset-pwd-two');
                        } else if (data.payload != null && data.payload != captcha) {
                            var captchaError = $ionicPopup.show({
                                title: '验证码错误',
                                scope: $scope
                            });
                            $timeout(function () {
                                captchaError.close(); //由于某种原因2秒后关闭弹出
                            }, 2000);
                        } else {
                            var captchaDied = $ionicPopup.show({
                                title: '验证码失效',
                                scope: $scope
                            });
                            $timeout(function () {
                                captchaDied.close(); //由于某种原因2秒后关闭弹出
                            }, 2000);
                        }
                    })
                        .error(function () {

                        });
                } else {
                    var captchaNull = $ionicPopup.show({
                        title: '请输入验证码',
                        scope: $scope
                    });
                    $timeout(function () {
                        captchaNull.close(); //由于某种原因2秒后关闭弹出
                    }, 2000);
                }
            }
        } else {
            var telNull = $ionicPopup.show({
                title: '请输入手机号',
                scope: $scope
            });
            $timeout(function () {
                telNull.close(); //由于某种原因2秒后关闭弹出
            }, 2000);
        }
    };
});