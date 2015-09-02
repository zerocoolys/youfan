/**
 * Created by ss on 2015/8/28.
 */
//密码登录
ControllerModule.controller('PwdLoginCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $location, $http, $state){
    /**
     * 密码验证登陆
     */
    $scope.user = {
        tel: "",
        password: ""
    };

    $scope.signPwd = function(){
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
            if(password == ""){
                var popupCodeNull = $ionicPopup.show({
                    title: '请输入密码',
                    scope: $scope
                });
                $timeout(function() {
                    popupCodeNull.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            } else {
                $http.post("http://localhost:8080/client/login/", JSON.stringify($scope.user))
                    .success(function (data) {
                        //console.log(data);

                        if(data.code == 0){
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

                        var serverError = $ionicPopup.show({
                            title: '网络连接失败',
                            scope: $scope
                        });
                        $timeout(function() {
                            serverError.close(); //由于某种原因2秒后关闭弹出
                        }, 2000);
                    });

            }

        }
    };
})