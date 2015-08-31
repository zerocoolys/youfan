/**
 * Created by ss on 2015/8/28.
 */
//密码登录
ControllerModule.controller('PwdLoginCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $location, $http, $state){
    /**
     * 密码验证登陆
     */
    $scope.userClient = {
        tel: "",
        loginPwd: "",
        name: "",
        sex: "",
        age: "",
        jobs: ""
    };
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
})