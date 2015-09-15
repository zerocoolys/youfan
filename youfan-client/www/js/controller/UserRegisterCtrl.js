/**
 * Created by icepros on 15-8-19.
 */
ControllerModule.controller('UserRegisterCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout, User, AuthenticationService, localStorageService, $location, $state, SMSService, UserService, $interval) {

    /**
     * 用户协议
     */
    $ionicModal.fromTemplateUrl('templates/user-agreement.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.userAgreement = modal;
    });

    /**
     * 协助字段
     * @type {{captcha: string, rePassword: string}}
     */
    $scope.verify = {
        captcha: "",
        rePassword: ""
    };

    /**
     * 表单字段
     * @type {{tel: string, password: string}}
     */
    $scope.user = {
        tel: "",
        password: ""
    };

    /**
     * 短信验证码验证登陆
     */
    $scope.register = function (tel, password) {

        var captcha = $scope.verify.captcha;
        var rePassword = $scope.verify.rePassword;

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
                    if (password.trim() != "") {
                        if (rePassword.trim() != "") {
                            if (password.trim() == rePassword.trim()) {
                                /*SMSService.registerCaptchaVerify(tel).success(function (data) {
                                 if (data.payload != null && data.payload == captcha) {*/

                                UserService.register(tel, password).success(function (data) {
                                    if (data.code == 0) {
                                        UserService.signIn(tel, password).success(function (data) {
                                            if (data.code == 0) {
                                                //console.log(data.payload.token);
                                                if (data.payload.token != "") {

                                                    //angular 本地存储
                                                    $scope.$watch('token', function () {
                                                        localStorageService.set('token', data.payload.token);
                                                        $scope.tokenValue = localStorageService.get('token');
                                                    });

                                                    $scope.storageType = 'Local storage';

                                                    if (localStorageService.getStorageType().indexOf('session') >= 0) {
                                                        $scope.storageType = 'Session storage';
                                                    }

                                                    if (!localStorageService.isSupported) {
                                                        $scope.storageType = 'Cookie';
                                                    }

                                                    $scope.$watch(function () {
                                                        return localStorageService.get('token');
                                                    }, function () {
                                                        $scope.token = data.payload.token;
                                                    });


                                                    AuthenticationService.isLogged = true;

                                                    User.id = data.payload.clientUserVO.id;
                                                    User.name = data.payload.clientUserVO.name;
                                                    User.telNo = data.payload.clientUserVO.tel;
                                                    User.token = data.payload.token;

                                                    localStorageService.set("userid", data.payload.clientUserVO.id);
                                                    localStorageService.set("usertel", data.payload.clientUserVO.tel);

                                                    $state.go('tab.chats', {userobj: data.payload.clientUserVO});

                                                } else {
                                                    var loginDied = $ionicPopup.show({
                                                        title: '链接超时',
                                                        scope: $scope
                                                    });
                                                    $timeout(function () {
                                                        loginDied.close(); //由于某种原因2秒后关闭弹出
                                                    }, 2000);
                                                    $state.go('tab.dash');
                                                }
                                            } else {
                                                var dataNull = $ionicPopup.show({
                                                    title: '手机号和密码不对',
                                                    scope: $scope
                                                });
                                                $timeout(function () {
                                                    dataNull.close(); //由于某种原因2秒后关闭弹出
                                                }, 2000);
                                            }
                                        })
                                    }
                                    if (data.code == 1) {
                                        var telReg = $ionicPopup.show({
                                            title: '该手机号已注册',
                                            scope: $scope
                                        });
                                        $timeout(function () {
                                            telReg.close(); //由于某种原因2秒后关闭弹出
                                        }, 2000);
                                    }
                                }).error(function (data) {
                                    console.log(data);
                                });

                                /* } else if (data.payload != null && data.payload != captcha) {
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

                                 });*/
                            } else {
                                var passwordEquals = $ionicPopup.show({
                                    title: '请确保两次输入的密码一致i',
                                    scope: $scope
                                });
                                $timeout(function () {
                                    passwordEquals.close(); //由于某种原因2秒后关闭弹出
                                }, 2000);
                            }

                        } else {
                            var passwordNull = $ionicPopup.show({
                                title: '请确认密码',
                                scope: $scope
                            });
                            $timeout(function () {
                                passwordNull.close(); //由于某种原因2秒后关闭弹出
                            }, 2000);
                        }
                    } else {
                        var passwordNull = $ionicPopup.show({
                            title: '请输入密码',
                            scope: $scope
                        });
                        $timeout(function () {
                            passwordNull.close(); //由于某种原因2秒后关闭弹出
                        }, 2000);
                    }
                } else {
                    var popupCodeNull = $ionicPopup.show({
                        title: '请输入验证码',
                        scope: $scope
                    });
                    $timeout(function () {
                        popupCodeNull.close(); //由于某种原因2秒后关闭弹出
                    }, 2000);
                }
            }
        } else {
            var popupNull = $ionicPopup.show({
                title: '请输入手机号',
                scope: $scope
            });
            $timeout(function () {
                popupNull.close(); //由于某种原因2秒后关闭弹出
            }, 2000);
        }
    };
});
