/**
 * Created by ss on 2015/9/6.
 */
ControllerModule.controller('ResetPwdTwoCtrl', function ($scope, $ionicPopup, $interval, $ionicPopup, $timeout, $http,$state, $stateParams, $window, UserService) {


    $scope.telNo = $stateParams.telNo;

    $scope.user = {
        pwd: "",
        confirmPwd: ""
    };

    $scope.resetPwd = function (password, confirmPwd) {
        var re = /[0-9 | A-Z | a-z]{6,16}/;

        if (password.trim() != "") {
            if (re.test(password)) {
                if (confirmPwd.trim() != "") {
                    if (password.trim() == confirmPwd.trim()) {
                        UserService.resetPassword($scope.telNo, password).success(function (data) {
                            console.log(data);
                            if (data.code == 0) {
                                $state.go('tab.chats');
                            } else {
                                var updateErr = $ionicPopup.show({
                                    cssClass: 'zan_popup',
                                    template: '网络异常,请重设密码',
                                    scope: $scope
                                });
                                $timeout(function () {
                                    updateErr.close();
                                }, 2000);
                            }

                        })
                        .error(function (data) {
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
                    } else {
                        var pwdMatch = $ionicPopup.show({
                            cssClass: 'zan_popup',
                            template: '两次输入的密码不一致',
                            scope: $scope
                        });
                        $timeout(function () {
                            pwdMatch.close();
                        }, 2000);
                    }
                } else {
                    var confirmPwdNull = $ionicPopup.show({
                        cssClass: 'zan_popup',
                        template: '请确认密码',
                        scope: $scope
                    });
                    $timeout(function () {
                        confirmPwdNull.close();
                    }, 2000);
                }
            } else {
                var pwdFormat = $ionicPopup.show({
                    cssClass: 'zan_popup',
                    template: '请按格式输入密码',
                    scope: $scope
                });
                $timeout(function () {
                    pwdFormat.close();
                }, 2000);
            }
        } else {
            var pwdNull = $ionicPopup.show({
                cssClass: 'zan_popup',
                template: '请输入密码',
                scope: $scope
            });
            $timeout(function () {
                pwdNull.close();
            }, 2000);
        }
    }
});