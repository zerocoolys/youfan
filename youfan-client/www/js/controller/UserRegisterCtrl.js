/**
 * Created by icepros on 15-8-19.
 */
ControllerModule.controller('UserRegisterCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $location, $http, $state, $interval){

    /**
     * 用户协议
     */
    $ionicModal.fromTemplateUrl('templates/user-agreement.html', {
        scope: $scope
    }).then(function(modal) {
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
     * 发送验证码
     */
    $scope.validCode = "获取验证码";
    $scope.isClick = false;
    $scope.Count = function () {
        if($scope.totalTime > 0){
            $scope.totalTime--;
            $scope.second = $scope.totalTime % 60;
            $scope.second = $scope.second < 10 ? "0" + $scope.second : $scope.second;
            $scope.validCode ="再次发送"+"(" +$scope.second + ")";
        }else{
            $scope.isClick = false;
            $scope.validCode = "获取验证码";
            $interval.cancel ( $scope.Countdown )
        }
    };
    $scope.sendMessage = function(){

        var tel = $scope.user.tel;
        var re= /(^1[3|5|8][0-9]{9}$)/;

        if(tel != ""){
            $scope.code = "";      //验证码
            var codeLength = 6; //验证码长度
            if(!re.test(tel.trim())){
                var myPopup = $ionicPopup.show({
                    title: '请输入正确的手机号',
                    scope: $scope
                });
                $timeout(function() {
                    myPopup.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            } else {
                /*倒计时效果初始化*/
                $scope.isClick = true;
                $scope.second = "60";
                $scope.totalTime = 60;
                $scope.Countdown = $interval($scope.Count,1000);

                //生成 6 位随机数验证码
                for ( var i = 0; i < codeLength; i++) {
                    $scope.code += parseInt(Math.random() * 9).toString();
                }
                var model = {
                    "captchaKey": "key" + tel,
                    "captcha": $scope.code
                }

                // 向后台发送处理数据
                $scope.url = "http://07zhywjh.6655.la:19982/platform/sendSMS/1/" + $scope.code + "/" + tel;
                $http.get($scope.url).success(function(data) {
                    console.log(data);
                    $http.post("http://localhost:8080/register/captcha",JSON.stringify(model));
                }).then(function(response){

                });
            }
        } else {
            var popupNull = $ionicPopup.show({
                title: '请输入手机号',
                scope: $scope
            });
            $timeout(function() {
                popupNull.close(); //由于某种原因2秒后关闭弹出
            }, 2000);
        }
    };

    /**
     * 短信验证码验证登陆
     */
    $scope.messageLogin = function(){

        var captcha = $scope.verify.captcha;
        var rePassword = $scope.verify.rePassword;

        var tel = $scope.user.tel;
        var password = $scope.user.password;

        if(tel == ""){
            var popupNull = $ionicPopup.show({
                title: '请输入手机号',
                scope: $scope
            });
            $timeout(function() {
                popupNull.close(); //由于某种原因2秒后关闭弹出
            }, 2000);
        }else{
            if(captcha == ""){
                var popupCodeNull = $ionicPopup.show({
                    title: '请输入验证码',
                    scope: $scope
                });
                $timeout(function() {
                    popupCodeNull.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            } else {

                /*$http.post("http://localhost:8080/client/register", JSON.stringify($scope.user))
                    .success(function (data) {
                        console.log(data);
                        if(data.code == 0){
                            $state.go('tab.chats');
                        }
                        if(data.code == 1){
                            var telReg = $ionicPopup.show({
                                title: '该手机号已注册',
                                scope: $scope
                            });
                            $timeout(function() {
                                telReg.close(); //由于某种原因2秒后关闭弹出
                            }, 2000);
                        }

                    }).error(function(data){
                        console.log(data);
                    });*/
                if(captcha != ""){
                    if($scope.code != undefined){
                        var code = $scope.url.split("/")[6];
                        if(captcha.trim() != code){
                            var popupCodeError = $ionicPopup.show({
                                title: '验证码错误',
                                scope: $scope
                            });
                            $timeout(function() {
                                popupCodeError.close(); //由于某种原因2秒后关闭弹出
                            }, 2000);
                        } else {
                            var model = {
                                "captchaKey": "client_captcha" + tel
                            };
                            if(password.trim() != ""){
                                if(rePassword.trim() != ""){
                                    if(password.trim() == rePassword.trim()){

                                        $http.post("http://localhost:8080/register/verify",JSON.stringify(model))
                                            .success(function(data){
                                                //console.log(data);
                                                if(data.payload == false){

                                                    $http.post("http://localhost:8080/client/register", JSON.stringify($scope.user))
                                                        .success(function (data) {

                                                            if(data.code == 0){
                                                                $state.go('tab.chats');
                                                            }
                                                            if(data.code == 1){
                                                                var telReg = $ionicPopup.show({
                                                                    title: '该手机号已注册',
                                                                    scope: $scope
                                                                });
                                                                $timeout(function() {
                                                                    telReg.close(); //由于某种原因2秒后关闭弹出
                                                                }, 2000);
                                                            }

                                                        }).error(function(data){
                                                            console.log(data);
                                                        });
                                                } else {
                                                    var captchaFailure = $ionicPopup.show({
                                                        title: '验证码超时',
                                                        scope: $scope
                                                    });
                                                    $timeout(function() {
                                                        captchaFailure.close(); //由于某种原因2秒后关闭弹出
                                                    }, 2000);
                                                }

                                            });
                                    } else {
                                        var passwordEquals = $ionicPopup.show({
                                            title: '请确保两次输入的密码一致i',
                                            scope: $scope
                                        });
                                        $timeout(function() {
                                            passwordEquals.close(); //由于某种原因2秒后关闭弹出
                                        }, 2000);
                                    }

                                } else {
                                    var passwordNull = $ionicPopup.show({
                                        title: '请确认密码',
                                        scope: $scope
                                    });
                                    $timeout(function() {
                                        passwordNull.close(); //由于某种原因2秒后关闭弹出
                                    }, 2000);
                                }
                            } else {
                                var passwordNull = $ionicPopup.show({
                                    title: '请输入密码',
                                    scope: $scope
                                });
                                $timeout(function() {
                                    passwordNull.close(); //由于某种原因2秒后关闭弹出
                                }, 2000);
                            }
                        }
                    } else {
                        var noPopupCode = $ionicPopup.show({
                            title: '请获取验证码',
                            scope: $scope
                        });
                        $timeout(function () {
                            noPopupCode.close(); //由于某种原因2秒后关闭弹出
                        }, 2000);
                    }
                }
            }
        }
    };
});
