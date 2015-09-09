/**
 * Created by ss on 2015/8/28.
 */
//密码登录
ControllerModule.controller('PwdLoginCtrl', function ($scope, $rootScope, $ionicModal, $ionicPopup, $timeout, $location, $http, $state, $window,AuthenticationService, UserService, localStorageService) {
    /**
     * 密码验证登陆
     */
    $scope.user = {
        tel: "",
        password: ""
    };

    $scope.isShow = false;
    /**
     * 登陆
     */
    $scope.signIn = function (tel, password) {
        if (tel == "") {
            var popupNull = $ionicPopup.show({
                title: '请输入手机号',
                scope: $scope
            });
            $timeout(function () {
                popupNull.close(); //由于某种原因2秒后关闭弹出
            }, 2000);
        } else {
            if (password == "") {
                var popupCodeNull = $ionicPopup.show({
                    title: '请输入密码',
                    scope: $scope
                });
                $timeout(function () {
                    popupCodeNull.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            } else {
                UserService.signIn(tel, password).success(function(data){
                    console.log(data);
                    if (data.code == 0) {
                        //console.log(data.payload.token);
                        if (data.payload.token != "") {
                            //angular 本地存储
                            localStorageService.set(data.payload.token, data.payload.uid);
                            localStorageService.set(data.payload.uid, data.payload.token);
                            $rootScope.token = localStorageService.get(data.payload.uid)
                            $rootScope.uid = localStorageService.get(data.payload.token)

                            //$rootScope共享
                            $rootScope.user = {
                                token: data.payload.token
                            };

                            //session 存储
                            AuthenticationService.isLogged = true;
                            $window.sessionStorage.token = data.payload.token;
                            $window.sessionStorage.uid = data.payload.uid;

                            $state.go('tab.chats');
                            $scope.isShowxxxxx = true;

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
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);

                    var serverError = $ionicPopup.show({
                        title: '网络连接失败',
                        scope: $scope
                    });
                    $timeout(function () {
                        serverError.close(); //由于某种原因2秒后关闭弹出
                    }, 2000);
                });
            }
        }
    };

    /**
     * 注销
     */
    $scope.signOut = function () {

        localStorageService.remove($rootScope.token);
        localStorageService.remove($rootScope.uid);

        if (AuthenticationService.isLogged) {
            UserService.signOut().success(function(data) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.uid;
                $state.go('tab.dash');
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        } else {
            $location.path("tab.pwd-login");
        }
    };
})