/**
 * Created by ss on 2015/8/28.
 */
//密码登录
ControllerModule.controller('PwdLoginCtrl', function ($scope, $rootScope, $location, $http, $state, AuthenticationService, UserService, localStorageService, PopupService, User, ResponseUser) {
    /**
     * 密码验证登陆
     */
    $scope.user = {};

    /**
     * 登陆
     */
    $scope.login = function (tel, password) {
        if (tel == "") {
            PopupService.showAlert($scope, '请输入手机号');
        } else {
            if (password == "") {
                PopupService.showAlert($scope, '请输入密码');
            } else {
                UserService.signIn(tel, password).success(function (data) {
                    console.log(data)
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
                        PopupService.showAlert($scope, '手机号和密码不对');
                    }
                }).error(function (status, data) {
                    console.log(status);
                    console.log(data);
                    PopupService.showAlert($scope, '网络链接失败');
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