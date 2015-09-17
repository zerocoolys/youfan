/**
 * Created by ss on 2015/9/1.
 */
ControllerModule.controller('SetPwdCtrl', function ($scope, PopupService, AuthenticationService, $location, $http, UserService, $state, localStorageService) {

    $scope.formValue = {};

    if (AuthenticationService.isLogged) {
        $scope.telNo = localStorageService.get("usertel");
    }

    $scope.setPwd = function (oldPwd, newPwd, confirmPwd) {

        var re = /[0-9 | A-Z | a-z]{6,16}/;
        if (oldPwd != "") {
            if (newPwd != "") {
                if (re.test(newPwd)) {
                    if (confirmPwd != "") {
                        if (newPwd == confirmPwd) {
                            UserService.signIn($scope.telNo, oldPwd).success(function (data) {
                                if (data.code == 0) {
                                    UserService.resetPassword($scope.telNo, newPwd).success(function (data) {
                                        if (data.code == 0) {
                                            $state.go('tab.chats');
                                        } else {
                                            PopupService.showAlert($scope, '网络异常,请重置密码');
                                        }

                                    }).error(function (data) {
                                        console.log(status);
                                        console.log(data);

                                        PopupService.showAlert($scope, '网络链接失败');
                                    });
                                } else {
                                    PopupService.showAlert($scope, '旧密码不对');
                                }
                            }).error(function (data) {
                                PopupService.showAlert($scope, '网络链接失败');
                            });
                        } else {
                            PopupService.showAlert($scope, '两次输入的密码不一致');
                        }
                    } else {
                        PopupService.showAlert($scope, '请确认密码');
                    }
                } else {
                    PopupService.showAlert($scope, '请按格式输入密码');
                }
            } else {
                PopupService.showAlert($scope, '请输入密码');
            }
        } else {
            PopupService.showAlert($scope, '请输入旧密码');
        }
    }
});