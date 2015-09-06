/**
 * Created by ss on 2015/9/1.
 */
ControllerModule.controller('SetPwdCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $location, $http, $state){

    $scope.formValue = {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
    };

    /**
     * 重置密码
     */
    $scope.setPassword = function(){

    };
});