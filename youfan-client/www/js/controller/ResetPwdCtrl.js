/**
 * Created by ss on 2015/8/28.
 */
ControllerModule.controller('ResetPwdCtrl', function($scope, $ionicPopup, $interval, $location, $http, $state){
    $scope.validCode = "获取验证码";
    $scope.isClick = false;
    $scope.Count = function () {
        if($scope.totalTime > 0){
            $scope.totalTime--;
            $scope.second = $scope.totalTime % 60;
            $scope.second = $scope.second < 10 ? "0" + $scope.second : $scope.second;
            $scope.validCode ="验证码"+ $scope.second + "秒";
        }else{
            $scope.isClick = false;
            $scope.validCode = "获取验证码";
            $interval.cancel ( $scope.Countdown )
        }
    }
    $scope.getValidCode = function () {
        $scope.isClick = true;
        $scope.second = "60";
        $scope.totalTime = 60;
        $scope.Countdown = $interval($scope.Count,1000)
    }
});