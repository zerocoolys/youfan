/**
 * Created by icepros on 15-8-19.
 */
ControllerModule.controller('LoginCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $location, $http, $state){
    /**
     * 验证码登陆
     */
    $ionicModal.fromTemplateUrl('templates/tab-verifylogin.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.verifyLogin = modal;
    });

    /**
     * 密码登陆
     */
    $ionicModal.fromTemplateUrl('templates/tab-pwdlogin.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.pwdLogin = modal;
    });

    /**
     * 用户协议
     */
    $ionicModal.fromTemplateUrl('templates/user-agreement.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.userAgreement = modal;
    });

    /**
     * DI
     * @type {{tel: string, password: string, verificationCode: string}}
     */
    $scope.user = {
        verificationCode: "",
    };

    $scope.userClient = {
        tel: "",
        loginPwd: "",
        name: "",
        sex: "",
        age: "",
        jobs: ""
    };

    /**
     * 密码验证登陆
     */
    $scope.signPwd = function(){
        var tel = $scope.userClient.tel;
        var password = $scope.userClient.loginPwd;
        if(tel == ""){
            var popupNull = $ionicPopup.show({
                title: '请输入手机号',
                scope: $scope
            });
            $timeout(function() {
                popupNull.close(); //由于某种原因2秒后关闭弹出
            }, 2000);
        }else{
            if(password == ""){
                var popupCodeNull = $ionicPopup.show({
                    title: '请输入密码',
                    scope: $scope
                });
                $timeout(function() {
                    popupCodeNull.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            } else {
                $http.post("http://localhost:8080/client/login/" + $scope.userClient.tel + "/"+$scope.userClient.loginPwd)
                    .success(function (data) {

                        console.log(data)

                        if(data.result.tel != null){
                            $scope.pwdLogin.hide()
                            $state.go('tab.chats');
                        } else {
                            var dataNull = $ionicPopup.show({
                                title: '手机号和密码不对',
                                scope: $scope
                            });
                            $timeout(function() {
                                dataNull.close(); //由于某种原因2秒后关闭弹出
                            }, 2000);
                        }

                    }).error(function(data){
                        if(data.tel == null){
                            var telNull = $ionicPopup.show({
                                title: '手机号和密码不对',
                                scope: $scope
                            });
                            $timeout(function() {
                                telNull.close(); //由于某种原因2秒后关闭弹出
                            }, 2000);
                        }
                        if(data.password == null){
                            var pwdNull = $ionicPopup.show({
                                title: '手机号和密码不对',
                                scope: $scope
                            });
                            $timeout(function() {
                                pwdNull.close(); //由于某种原因2秒后关闭弹出
                            }, 2000);
                        }

                    });

            }

        }
    };

    /**
     * 发送验证码
     */
    $scope.sendMessage = function(){

        var tel = $scope.userClient.tel;
        var re= /(^1[3|5|8][0-9]{9}$)/;
        if(tel != ""){
            $scope.code = "";      //验证码
            var codeLength = 6; //验证码长度
            if(!re.test(tel)){
                var myPopup = $ionicPopup.show({
                    title: '请输入正确的手机号',
                    scope: $scope
                });
                $timeout(function() {
                    myPopup.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            } else {
                //生成 6 位随机数验证码
                for ( var i = 0; i < codeLength; i++) {
                    $scope.code += parseInt(Math.random() * 9).toString();
                }
                // 向后台发送处理数据
                $scope.url = "http://07zhywjh.6655.la:19982/platform/sendSMS/1/" + $scope.code + "/" + tel;
                $http.get($scope.url).success(function(data) {
                    //console.log(data);
                    /*if(data.statusCode == "000000"){
                        return data;
                     }else{
                        return "";
                     }*/
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

        var tel = $scope.userClient.tel;
        var verificationCode = $scope.user.verificationCode;
        if(tel == ""){
            var popupNull = $ionicPopup.show({
                title: '请输入手机号',
                scope: $scope
            });
            $timeout(function() {
                popupNull.close(); //由于某种原因2秒后关闭弹出
            }, 2000);
        }else{
            if(verificationCode == ""){
                var popupCodeNull = $ionicPopup.show({
                    title: '请输入验证码',
                    scope: $scope
                });
                $timeout(function() {
                    popupCodeNull.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            } else {

                /*$http.post("http://localhost:8080/client/register", JSON.stringify($scope.userClient))
                    .success(function (data) {
                        if(data != null){
                            $scope.verifyLogin.hide()
                            $state.go('tab.chats');
                        }


                    }).error(function(data){
                        console.log(data);
                    });*/

                if($scope.verificationCode != ""){
                    if($scope.code != undefined){
                        var code = $scope.url.split("/")[6];
                        if(verificationCode != code){
                            var popupCodeError = $ionicPopup.show({
                                title: '验证码错误',
                                scope: $scope
                            });
                            $timeout(function() {
                                popupCodeError.close(); //由于某种原因2秒后关闭弹出
                            }, 2000);
                        } else {
                            $http.post("http://localhost:8080/client/register", JSON.stringify($scope.userClient))
                                .success(function (data) {
                                    //console.log(data.result);
                                    $scope.verifyLogin.hide()
                                    $state.go('tab.chats');

                                }).error(function(data){
                                    console.log(data);
                                });
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
