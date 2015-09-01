ControllerModule.controller('CommentDetailCtrl', function ($scope, $http, REST_URL, $stateParams, $ionicSlideBoxDelegate, $ionicPopup, $timeout, $ionicBackdrop, $ionicModal) {
    $scope.formData = {
        star: 1,
        commitUser: '张三',
        orderId: 1234567,
        pid: 0
    };
    $scope.comment = function () {
        console.log($scope.formData);
        $http.post(REST_URL + "/cm/save", $scope.formData).success(function (result) {
            console.log(result.code);
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

    $scope.initComment = function () {
        $http.get(REST_URL + "/cm/getComment?id=55e543e3e4b04a8ed7405aa8").success(function (result) {
        });
    }
    $scope.initComment();
    //$scope.rating_full = {
    //    value: 5
    //};
});