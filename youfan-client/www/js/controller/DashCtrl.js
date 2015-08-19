ControllerModule.controller('DashCtrl', function ($scope,$ionicModal) {
    $ionicModal.fromTemplateUrl('templates/tab-verifylogin.html', {
        scope: $scope
    }).then(function(modal) {

        $scope.modal = modal;
    });

//    $scope.loginWay = {
//        verificationCodeLogin:"验证码登录",
//        passwordLogin:"密码登录"
//    }
});
