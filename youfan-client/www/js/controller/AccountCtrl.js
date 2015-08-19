ControllerModule.controller('AccountCtrl', function ($scope, $cordovaCamera, CameraService) {

    $scope.settings = {
        enableFriends: true
    };
    CameraService.initCameraService($scope, $cordovaCamera);
});