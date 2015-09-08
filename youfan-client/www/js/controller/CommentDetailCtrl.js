ControllerModule.controller('CommentDetailCtrl', function ($scope, $http, REST_URL, Order, Merchant, $location, $stateParams, $ionicSlideBoxDelegate, $ionicPopup, $timeout, $ionicBackdrop, $ionicActionSheet, $ionicModal, CameraService) {
    $scope.cImg = "";
    CameraService.createCameraPath($scope, function (result) {
        if (result) {
            if (!result.getType) {
                $scope.cImg = result.pathData;
            } else {
                $scope.cImg = result.pathData[0];
            }
        }
    });
    $scope.upCommentImg = function () {
        CameraService.upImg($scope.cImg, function (result) {
            alert(JSON.stringify(result));
        });
    }
    $scope.formData = {
        star: 1,
        comment_user: '用户1',
        order_id: Order.id,
        pid: 0,
        is_hide_name: false,
        img_url: ["8e6a57b84b087c0e5fe754c0192a3910.jpg"]
    };
    $scope.comment = function () {
        console.log($scope.formData);
        $http.post(REST_URL + "/cm/save", $scope.formData).success(function (result) {
            if (result.code === 0) {
                var myPopup = $ionicPopup.show({
                    cssClass: 'zan_popup',
                    template: '评论成功',
                    scope: $scope
                });
                $ionicBackdrop.release();
                $timeout(function () {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 1000);
                $location.path('/order')
            }
        });
    };
    $scope.textAreaChange = function () {
        if ($scope.formData.content.length > 500) {
            $scope.formData.content = $scope.formData.content.substring(0, 500);
        }
    }

    $scope.commentDataList = [];
});