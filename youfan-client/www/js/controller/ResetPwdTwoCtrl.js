/**
 * Created by ss on 2015/9/6.
 */
ControllerModule.controller('ResetPwdTwoCtrl', function ($scope, $ionicPopup, $interval, $ionicPopup, $timeout, $http, $state, $window) {

    $scope.user = {
        pwd: "",
        confirmPwd: ""
    }

    $scope.resetPwd = function () {
        var pwd = $scope.user.pwd;
        var confirmPwd = $scope.user.confirmPwd;
        var re = /[0-9 | A-Z | a-z]{6,16}/;

        var urlStr = "http://localhost:8080/cuser/pinfo";

        var updateModel = {
            token: $window.sessionStorage.token,
            password: pwd
        };

        if (pwd.trim() != "") {
            if (re.test(pwd)) {
                if (confirmPwd.trim() != "") {
                    if (pwd.trim() == confirmPwd.trim()) {
                        $http.post(urlStr, JSON.stringify(updateModel))
                            .success(function (data) {
                                console.log(data);
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

                            })
                            .error(function (data) {

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
    }
});