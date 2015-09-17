/**
 * Created by ss on 2015/9/6.
 */
ControllerModule.controller('ResetPwdTwoCtrl', function ($scope, PopupService, $http, $state, $stateParams, UserService) {


    $scope.telNo = $stateParams.telNo;

    $scope.user = {
        pwd: "",
        confirmPwd: ""
    };

    $scope.resetPwd = function (password, confirmPwd) {
        var re = /[0-9 | A-Z | a-z]{6,16}/;

        if (password != "") {
            if (re.test(password)) {
                if (confirmPwd != "") {
                    if (password == confirmPwd) {
                        UserService.resetPassword($scope.telNo, password).success(function (data) {
                            console.log(data);
                            if (data.code == 0) {
                                $state.go('tab.chats');
                            } else {
                                PopupService.showAlert($scope, '网络异常,请重置密码');
                            }
                        })
                            .error(function (data) {
                                console.log(status);
                                console.log(data);
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
    }
});