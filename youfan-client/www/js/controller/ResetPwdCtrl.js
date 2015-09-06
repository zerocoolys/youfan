/**
 * Created by ss on 2015/8/28.
 */
ControllerModule.controller('ResetPwdCtrl', function($scope,$rootScope, $ionicPopup, $interval,$ionicPopup,$timeout, $location, $http, $state){


    $scope.user = {
        tel: "",
        captcha: "",
        pwd: ""
    };

    /**
     * 重置密码
     */
    $scope.resetPwd = function(){
        var tel = $scope.user.tel;
        var captcha = $scope.user.captcha;
        var pwd = $scope.user.pwd;
        var re= /(^1[3|5|8][0-9]{9}$)/;

        var keyObj = {
            captchaKey: "client_resetpwd" + tel
        }
        var clientResetPwdModel = {
            tel: tel,
            password: pwd
        };

        if(tel.trim() != ""){
            if(!re.test(tel.trim())){
                var telVerify = $ionicPopup.show({
                    title: '请输入正确的手机号',
                    scope: $scope
                });
                $timeout(function() {
                    telVerify.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            } else {
                if(captcha.trim() != ""){
                    if(pwd.trim() != ""){
                        $http.post("http://localhost:8080/captcha/verify",JSON.stringify(keyObj))
                            .success(function(data){
                                console.log(data);
                                if(data.payload != null && data.payload == captcha){
                                    $http.post("http://localhost:8080/captcha/verify",JSON.stringify(clientResetPwdModel))
                                        .success(function(){

                                        })
                                        .error(function(){

                                        });
                                } else {
                                    var captchaDied = $ionicPopup.show({
                                        title: '验证码失效',
                                        scope: $scope
                                    });
                                    $timeout(function() {
                                        captchaDied.close(); //由于某种原因2秒后关闭弹出
                                    }, 2000);
                                }
                            })
                            .error(function(){

                            });
                    } else {
                        var pwdNull = $ionicPopup.show({
                            title: '请输入密码',
                            scope: $scope
                        });
                        $timeout(function() {
                            pwdNull.close(); //由于某种原因2秒后关闭弹出
                        }, 2000);
                    }
                } else {
                    var captchaNull = $ionicPopup.show({
                        title: '请输入验证码',
                        scope: $scope
                    });
                    $timeout(function() {
                        captchaNull.close(); //由于某种原因2秒后关闭弹出
                    }, 2000);
                }
            }
        }else{
            var telNull = $ionicPopup.show({
                title: '请输入手机号',
                scope: $scope
            });
            $timeout(function() {
                telNull.close(); //由于某种原因2秒后关闭弹出
            }, 2000);
        }
    };
});