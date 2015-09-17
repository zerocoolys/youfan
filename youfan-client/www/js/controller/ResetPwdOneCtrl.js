/**
 * Created by ss on 2015/8/28.
 */
ControllerModule.controller('ResetPwdOneCtrl', function ($scope, $rootScope, PopupService, $location, $state, SMSService) {

    $scope.user = {
        tel: "",
        captcha: "",
        pwd: ""
    };

    /**
     * 重置密码
     */
    $scope.verifyCaptcha = function (tel, captcha) {
        var re = /(^1[3|5|8][0-9]{9}$)/;

        if (tel != "") {
            if (!re.test(tel)) {
                PopupService.showAlert($scope, '请输入正确的手机号');
            } else {
                if (captcha != "") {
                    SMSService.forgetPasswordCaptchaVerify(tel).success(function (data) {
                        if (data.payload != null && data.payload == captcha) {
                            $state.go('tab.reset-pwd-two', {telNo: tel});
                        } else if (data.payload != null && data.payload != captcha) {
                            PopupService.showAlert($scope, '验证码错误');
                        } else {
                            PopupService.showAlert($scope, '验证码失效');
                        }
                    })
                        .error(function () {

                        });
                } else {
                    PopupService.showAlert($scope, '请输入验证码');
                }
            }
        } else {
            PopupService.showAlert($scope, '请输入手机号');
        }
    };
});