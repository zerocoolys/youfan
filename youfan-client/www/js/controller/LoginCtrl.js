/**
 * Created by icepros on 15-8-19.
 */
ControllerModule.controller('LoginCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $location){
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
        tel: "",
        password: "",
        verificationCode: ""
    };

    /**
     * 密码验证登陆
     */
    $scope.checkPwd = function(){

        var tel = $scope.user.tel;
        var password = $scope.user.password;

    };

    /**
     * 发送验证码
     */
    $scope.sendMessage = function(){
        var tel = $scope.user.tel;
        var re= /(^1[3|5|8][0-9]{9}$)/;
        if(tel != ""){
            var code = "";      //验证码
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
                    code += parseInt(Math.random() * 9).toString();
                }
                // 向后台发送处理数据
                $scope.codeUrl = "http://07zhywjh.6655.la:19982/platform/sendSMS/1/" + code + "/" + tel;
                $location.path($scope.codeUrl);

                function Ctr($scope) {
                    $scope.isActive = true;
                }

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

        var tel = $scope.user.tel;
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
            }else{
                var code = $scope.codeUrl.split("/")[6];
                if(verificationCode != code){
                    var popupCodeError = $ionicPopup.show({
                        title: '验证码错误',
                        scope: $scope
                    });
                    $timeout(function() {
                        popupCodeError.close(); //由于某种原因2秒后关闭弹出
                    }, 2000);
                }
            }
        }

    };
});
