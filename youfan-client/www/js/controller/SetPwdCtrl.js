/**
 * Created by ss on 2015/9/1.
 */
ControllerModule.controller('SetPwdCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout,AuthenticationService, $location, $http, UserService, $state, localStorageService) {

    $scope.formValue = {};

    if (AuthenticationService.isLogged) {
        $scope.telNo = localStorageService.get("usertel");
    }

    $scope.setPwd = function (oldPwd, newPwd, confirmPwd) {

        var re = /[0-9 | A-Z | a-z]{6,16}/;
        if (oldPwd != "") {
            if (newPwd.trim() != "") {
                if (re.test(newPwd)) {
                    if (confirmPwd.trim() != "") {
                        if (newPwd.trim() == confirmPwd.trim()) {
                            UserService.signIn($scope.telNo, oldPwd).success(function (data) {
                                if (data.code == 0) {
                                    UserService.resetPassword($scope.telNo, newPwd).success(function (data) {
                                        if (data.code == 0) {
                                            $state.go('tab.chats');
                                        } else {
                                            var updateErr = $ionicPopup.show({
                                                title: '网络异常,请重设密码',
                                                scope: $scope
                                            });
                                            $timeout(function () {
                                                updateErr.close();
                                            }, 2000);
                                        }

                                    }).error(function (data) {
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
                                } else {
                                    var protoPwd = $ionicPopup.show({
                                        title: '旧密码不对',
                                        scope: $scope
                                    });
                                    $timeout(function () {
                                        protoPwd.close(); //由于某种原因2秒后关闭弹出
                                    }, 2000);
                                }
                            }).error(function (data) {
                                var oldErr = $ionicPopup.show({
                                    title: '网络连接失败',
                                    scope: $scope
                                });
                                $timeout(function () {
                                    oldErr.close(); //由于某种原因2秒后关闭弹出
                                }, 2000);
                            });
                        } else {
                            var pwdMatch = $ionicPopup.show({
                                title: '两次输入的密码不一致',
                                scope: $scope
                            });
                            $timeout(function () {
                                pwdMatch.close();
                            }, 2000);
                        }
                    } else {
                        var confirmPwdNull = $ionicPopup.show({
                            title: '请确认密码',
                            scope: $scope
                        });
                        $timeout(function () {
                            confirmPwdNull.close();
                        }, 2000);
                    }
                } else {
                    var pwdFormat = $ionicPopup.show({
                        title: '请按格式输入密码',
                        scope: $scope
                    });
                    $timeout(function () {
                        pwdFormat.close();
                    }, 2000);
                }
            } else {
                var pwdNull = $ionicPopup.show({
                    title: '请输入密码',
                    scope: $scope
                });
                $timeout(function () {
                    pwdNull.close();
                }, 2000);
            }
        } else {
            var oldPwdNull = $ionicPopup.show({
                title: '请输入旧密码',
                scope: $scope
            });
            $timeout(function () {
                oldPwdNull.close();
            }, 2000);
        }
    }
});