/**
 * Created by icepros on 15-8-19.
 */
ControllerModule.controller('LoginCtrl', function($scope, $ionicModal){

    /**
     * 验证码登陆
     */
    $ionicModal.fromTemplateUrl('templates/tab-verifylogin.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.verifyLogin = modal;
    });

    /**
     * 密码登陆
     */
    $ionicModal.fromTemplateUrl('templates/tab-pwdlogin.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.pwdLogin = modal;
    });

    /**
     * 用户协议
     */
    $ionicModal.fromTemplateUrl('templates/user-agreement.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.userAgreement = modal;
    });
});
