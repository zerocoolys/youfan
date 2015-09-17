/**
 * Created by icepros on 15-8-19.
 */
ControllerModule.controller('UserRegisterCtrl', function ($scope, $ionicModal, PopupService, User, AuthenticationService, localStorageService, $state, SMSService, UserService) {

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

        if (tel != "") {
            if (!re.test(tel)) {
                PopupService.showAlert($scope, '请输入正确的手机号');
            } else {
                if (password != "") {
                    if (rePassword != "") {
                        if (password == rePassword.trim()) {
                            if (captcha != "") {
                                /*SMSService.registerCaptchaVerify(tel).success(function (data) {
                                 if (data.payload != null && data.payload == captcha) {*/

                                UserService.register(tel, password).success(function (data) {
                                    console.log(data);
                                    if (data.code == 0) {
                                        UserService.signIn(tel, password).success(function (data) {
                                            if (data.code == 0) {
                                                //console.log(data.payload.token);
                                                if (data.payload.token != "") {

                                                    //angular 本地存储
                                                    /* $scope.$watch('token', function () {
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
                                                     });*/


                                                    AuthenticationService.isLogged = true;

                                                    User.id = data.payload.clientUserVO.id;
                                                    User.name = data.payload.clientUserVO.name;
                                                    User.telNo = data.payload.clientUserVO.tel;
                                                    User.token = data.payload.token;

                                                    localStorageService.set("userid", data.payload.clientUserVO.id);
                                                    localStorageService.set("usertel", data.payload.clientUserVO.tel);

                                                    $state.go('tab.chats', {userobj: data.payload.clientUserVO});

                                                } else {
                                                    PopupService.showAlert($scope, '链接超时');
                                                    $state.go('tab.dash');
                                                }
                                            } else {
                                                PopupService.showAlert($scope, '手机号和密码不对');
                                            }
                                        })
                                    }
                                    if (data.code == 1) {
                                        PopupService.showAlert($scope, '该手机号已注册');
                                    }
                                }).error(function (data) {
                                    console.log(data);
                                });

                                /*} else if (data.payload != null && data.payload != captcha) {
                                 PopupService.showAlert($scope, '验证码错误');
                                 } else {
                                 PopupService.showAlert($scope, '验证码失效');
                                 }
                                 })
                                 .error(function () {

                                 });*/
                            } else {
                                PopupService.showAlert($scope, '请输入验证码');
                            }
                        } else {
                            PopupService.showAlert($scope, '请保证两次输入的密码一致');
                        }

                    } else {
                        PopupService.showAlert($scope, '请确认密码');
                    }
                } else {
                    PopupService.showAlert($scope, '请输入密码');
                }
            }
        } else {
            PopupService.showAlert($scope, '请输入手机号');
        }
    };
});
