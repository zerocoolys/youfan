/**
 * Created by ss on 2015/8/28.
 */
//密码登录
ControllerModule.controller('PwdLoginCtrl', function ($scope, $rootScope, $ionicModal, $ionicPopup, $timeout, $location, $http, $state, $window, AuthenticationService, UserService, localStorageService, User, ResponseUser) {
    /**
     * 密码验证登陆
     */
    $scope.user = {};

    /**
     * 登陆
     */
    $scope.signIn = function (tel, password) {
        if (tel == "") {
            var popupNull = $ionicPopup.show({
                cssClass: 'zan_popup',
                template: '请输入手机号',
                scope: $scope
            });
            $timeout(function () {
                popupNull.close(); //由于某种原因2秒后关闭弹出
            }, 2000);
        } else {
            if (password == "") {
                var popupCodeNull = $ionicPopup.show({
                    cssClass: 'zan_popup',
                    template: '请输入密码',
                    scope: $scope
                });
                $timeout(function () {
                    popupCodeNull.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            } else {
                UserService.signIn(tel, password).success(function (data) {
                    if (data.code == 0) {
                        //angular 本地存储
                        //$scope.$watch('token', function () {
                        //    localStorageService.set('token', data.payload.token);
                        //    $scope.tokenValue = localStorageService.get('token');
                        //});
                        //
                        //$scope.storageType = 'Local storage';
                        //
                        //if (localStorageService.getStorageType().indexOf('session') >= 0) {
                        //    $scope.storageType = 'Session storage';
                        //}
                        //
                        //if (!localStorageService.isSupported) {
                        //    $scope.storageType = 'Cookie';
                        //}
                        //
                        //$scope.$watch(function () {
                        //    return localStorageService.get('token');
                        //}, function () {
                        //    $scope.token = data.payload.token;
                        //});


                        AuthenticationService.isLogged = true;

                        User.id = data.payload.clientUserVO.id;
                        User.name = data.payload.clientUserVO.name;
                        User.telNo = data.payload.clientUserVO.tel;
                        User.token = data.payload.token;

                        ResponseUser.id = data.payload.clientUserVO.id;

                        localStorageService.set('token', data.payload.token);
                        localStorageService.set("userid", data.payload.clientUserVO.id);
                        localStorageService.set("usertel", data.payload.clientUserVO.tel);

                        $state.go('tab.chats', {userobj: data.payload.clientUserVO});

                    } else {
                        var dataNull = $ionicPopup.show({
                            cssClass: 'zan_popup',
                            template: '手机号和密码不对',
                            scope: $scope
                        });
                        $timeout(function () {
                            dataNull.close(); //由于某种原因2秒后关闭弹出
                        }, 2000);
                    }
                }).error(function (status, data) {
                    console.log(status);
                    console.log(data);

                    var serverError = $ionicPopup.show({
                        cssClass: 'zan_popup',
                        template: '网络连接失败',
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

        //$scope.clearAll = localStorageService.clearAll;

        if (AuthenticationService.isLogged) {
            UserService.signOut().success(function (data) {
                AuthenticationService.isLogged = false;
                localStorageService.remove("token");
                localStorageService.remove("userid");
                localStorageService.remove("usertel");
                $state.go('tab.chats');
            }).error(function (status, data) {
                console.log(status);
                console.log(data);
            });
        } else {
            $location.path("tab.pwd-login");
        }
    };
})